import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NotesStoreContext } from "./src/store/NotesStore";
import { observer } from "mobx-react-lite";
import { HomeStackScreen } from "./src/stacks/HomeStackScreen";
import { AuthStackScreen } from "./src/stacks/AuthStackScreen";
import { LoadingScreen } from "./src/pages/LoadingScreen";
import { SearchStackScreen } from "./src/stacks/SearchStackScreen";
import { createClient, Provider, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import * as SecureStore from "expo-secure-store";
import { BACKEND_URL } from "./src/variables";
import i18n from "./src/i18n";
import { useTranslation } from "react-i18next";
import { NoteDocument, TagsDocument } from "./src/generated/graphql";
const initI18n = i18n;

let TOKEN;

const getToken = async () => {
  try {
    const available = await SecureStore.isAvailableAsync();
    if (!available) {
      throw new Error();
    }
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      throw new Error();
    }
    return token;
  } catch (error) {
    return "";
  }
};

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
        },
      },
    }),
    fetchExchange,
  ],
});

const Tab = createBottomTabNavigator();

// configuring icons here
const screenOptions = ({ route }) => ({
  tabBarIcon: ({ _, color, size }) => {
    let iconName;
    const { t } = useTranslation();

    if (route.name === t("Home")) {
      iconName = "ios-home";
    } else if (route.name === t("Search")) {
      iconName = "ios-search";
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

export default observer(function App() {
  const NotesStore = useContext(NotesStoreContext);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchToken() {
      TOKEN = await getToken();
    }
    fetchToken();
    NotesStore.init();
  }, []);

  return (
    <Provider value={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={screenOptions}
          tabBarOptions={{
            activeTintColor: "#CCA9F9",
            inactiveTintColor: "#B0AFAF",
          }}
          navigationOptions={{
            header: null,
          }}
        >
          {NotesStore.isLoading ? (
            <Tab.Screen
              name="Add"
              component={LoadingScreen}
              options={{
                tabBarVisible: false,
              }}
            />
          ) : (
            <>
              {!NotesStore.isLogged ? (
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
