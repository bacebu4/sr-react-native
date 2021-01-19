import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { observer } from "mobx-react-lite";
import { HomeStackScreen } from "./src/stacks/HomeStackScreen";
import { AuthStackScreen } from "./src/stacks/AuthStackScreen";
import { LoadingScreen } from "./src/pages/LoadingScreen";
import { SearchStackScreen } from "./src/stacks/SearchStackScreen";
import { createClient, Provider, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { BACKEND_URL } from "./src/variables";
import i18n from "./src/i18n";
import { useTranslation } from "react-i18next";
import { UiStoreContext } from "./src/store/UiStore";
import { iconsConfig } from "./src/utils/iconsConfig";
import {
  LatestTagsDocument,
  NoteDocument,
  TagsDocument,
} from "./src/generated/graphql";
const initI18n = i18n;

let TOKEN;

const client = createClient({
  url: `${BACKEND_URL}/graphql`,
  fetchOptions: () => {
    return {
      headers: { authorization: TOKEN },
    };
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      optimistic: {
        addComment: (variables, cache, _) => {
          const cachedComments = cache.readQuery({
            query: NoteDocument,
            variables: { id: variables.noteId },
          }).note.comments;

          const addedComment = {
            id: variables.commentId,
            noteId: variables.noteId,
            text: variables.text,
            createdAt: Date.now(),
            __typename: "Comment",
          };

          return {
            __typename: "Note",
            id: variables.noteId,
            comments: [...cachedComments, addedComment],
          };
        },
        addExistingTag: (variables, cache, _) => {
          const cachedTagsFromNote = cache.readQuery({
            query: NoteDocument,
            variables: { id: variables.noteId },
          }).note.tags;

          const allCachedTags = cache.readQuery({
            query: TagsDocument,
          }).tags;

          const addedTag = allCachedTags.find((t) => t.id === variables.tagId);

          return {
            __typename: "Note",
            id: variables.noteId,
            tags: [...cachedTagsFromNote, addedTag],
          };
        },
        updateTag: (variables, cache, _) => {
          const { name, hue, tagId } = variables;

          const allFields = cache.inspectFields("Query");
          const noteQueries = allFields.filter((x) => x.fieldName === "note");
          noteQueries.forEach((q) => {
            const noteId = q.arguments.id;
            cache.updateQuery(
              { query: NoteDocument, variables: { id: noteId } },
              (data) => {
                data.note.tags.forEach((t) => {
                  if (t.id === tagId) {
                    t.name = name;
                    t.hue = hue;
                  }
                });
                return data;
              }
            );
          });
        },
        deleteTag: (variables, cache, _) => {
          const { tagId } = variables;
          console.log("tagId", tagId);

          cache.updateQuery({ query: LatestTagsDocument }, (data) => {
            console.log("data", data);
            data.latestTags = data.latestTags.filter((t) => t.id !== tagId);
            console.log("data", data);
            return data;
          });

          cache.updateQuery({ query: TagsDocument }, (data) => {
            if (data && data.tags) {
              data.tags = data.tags.filter((t) => t.id !== tagId);
            }
            return data;
          });
        },
        addNewTag: (variables, cache, _) => {
          const { name, hue, noteId, tagId } = variables;

          const cachedTagsFromNote = cache.readQuery({
            query: NoteDocument,
            variables: { id: noteId },
          }).note.tags;

          const addedTag = {
            __typename: "Tag",
            name,
            hue,
            id: tagId,
          };

          return {
            __typename: "Note",
            id: variables.noteId,
            tags: [...cachedTagsFromNote, addedTag],
          };
        },
        deleteTagFromNote: (variables, cache, _) => {
          const cachedTagsFromNote = cache.readQuery({
            query: NoteDocument,
            variables: { id: variables.noteId },
          }).note.tags;

          return {
            __typename: "Note",
            id: variables.noteId,
            tags: cachedTagsFromNote.filter((t) => t.id !== variables.tagId),
          };
        },
        deleteComment: (variables, cache, _) => {
          const cachedComments = cache.readQuery({
            query: NoteDocument,
            variables: { id: variables.noteId },
          }).note.comments;

          return {
            __typename: "Note",
            id: variables.noteId,
            comments: cachedComments.filter(
              (c) => c.id !== variables.commentId
            ),
          };
        },
        updateNote: (variables, _, __) => ({
          __typename: "Note",
          id: variables.noteId,
          text: variables.text,
        }),
        updateComment: (variables, _, __) => ({
          __typename: "Comment",
          id: variables.commentId,
          text: variables.text,
        }),
      },
      updates: {
        Mutation: {
          addNewTag: (_, args, cache, __) => {
            const { name, hue, tagId } = args;

            const addedTag = {
              __typename: "Tag",
              name,
              hue,
              id: tagId,
            };

            cache.updateQuery({ query: TagsDocument }, (data) => {
              data.tags.push(addedTag);
              return data;
            });
          },
          updateTag: (_, args, cache, __) => {
            const { name, hue, tagId } = args;

            const allFields = cache.inspectFields("Query");
            const noteQueries = allFields.filter((x) => x.fieldName === "note");
            noteQueries.forEach((q) => {
              const noteId = q.arguments.id;
              cache.updateQuery(
                { query: NoteDocument, variables: { id: noteId } },
                (data) => {
                  data.note.tags.forEach((t) => {
                    if (t.id === tagId) {
                      t.name = name;
                      t.hue = hue;
                    }
                  });
                  return data;
                }
              );
            });
          },
          deleteTag: (_, args, cache, __) => {
            const { tagId } = args;

            const allFields = cache.inspectFields("Query");

            const noteQueries = allFields.filter((x) => x.fieldName === "note");

            noteQueries.forEach((q) => {
              const noteId = q.arguments.id;
              cache.updateQuery(
                { query: NoteDocument, variables: { id: noteId } },
                (data) => {
                  data.note.tags = data.note.tags.filter((t) => t.id !== tagId);
                  return data;
                }
              );
            });

            cache.updateQuery({ query: LatestTagsDocument }, (data) => {
              data.latestTags = data.latestTags.filter((t) => t.id !== tagId);
              return data;
            });

            cache.updateQuery({ query: TagsDocument }, (data) => {
              if (data && data.tags) {
                data.tags = data.tags.filter((t) => t.id !== tagId);
              }
              return data;
            });
          },
        },
      },
    }),
    fetchExchange,
  ],
});

const Tab = createBottomTabNavigator();

export default observer(function App() {
  const UiStore = useContext(UiStoreContext);
  const { t } = useTranslation();

  async function initAsync() {
    await UiStore.init();
    TOKEN = UiStore.token;
  }

  useEffect(() => {
    initAsync();
  }, [UiStore.isLogged]);

  return (
    <Provider value={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={iconsConfig}
          tabBarOptions={{
            activeTintColor: "#CCA9F9",
            inactiveTintColor: "#B0AFAF",
          }}
          navigationOptions={{
            header: null,
          }}
        >
          {UiStore.isLoading ? (
            <Tab.Screen
              name="Add"
              component={LoadingScreen}
              options={{
                tabBarVisible: false,
              }}
            />
          ) : (
            <>
              {!UiStore.isLogged ? (
                <Tab.Screen
                  name="Add"
                  component={AuthStackScreen}
                  options={{
                    tabBarVisible: false,
                  }}
                />
              ) : (
                <>
                  <Tab.Screen name={t("Home")} component={HomeStackScreen} />
                  <Tab.Screen
                    name={t("Search")}
                    component={SearchStackScreen}
                  />
                </>
              )}
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
});
