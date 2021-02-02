import { createClient, dedupExchange, fetchExchange } from "urql";

import { BACKEND_URL } from "../variables";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  Comment,
  NoteDocument,
  NoteQuery,
  TagsQuery,
  TagsDocument,
  Tag,
  InfoQuery,
  InfoDocument,
} from "../generated/graphql";

export const createUrqlClient = (TOKEN: string) => {
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
            const cachedComments = cache.readQuery<NoteQuery>({
              query: NoteDocument,
              variables: { id: variables.noteId },
            })!.note!.comments;

            const addedComment: Comment = {
              id: variables.commentId as string,
              noteId: variables.noteId as string,
              text: variables.text as string,
              createdAt: String(Date.now()),
              __typename: "Comment",
            };

            return {
              __typename: "Note",
              id: variables.noteId,
              comments: [...cachedComments, addedComment],
            } as any;
          },
          addExistingTag: (variables, cache, _) => {
            const cachedTagsFromNote = cache.readQuery<NoteQuery>({
              query: NoteDocument,
              variables: { id: variables.noteId },
            })!.note!.tags;

            const allCachedTags = cache.readQuery<TagsQuery>({
              query: TagsDocument,
            })!.tags;

            const addedTag = allCachedTags?.find(
              (t) => t?.id === variables.tagId
            );

            return {
              __typename: "Note",
              id: variables.noteId,
              tags: [...cachedTagsFromNote!, addedTag],
            } as any;
          },
          updateTag: (variables, cache, _) => {
            const { name, hue, tagId } = variables;

            const allFields = cache.inspectFields("Query");
            const noteQueries = allFields.filter((x) => x.fieldName === "note");
            noteQueries.forEach((q) => {
              const noteId = q!.arguments!.id;
              cache.updateQuery<NoteQuery>(
                { query: NoteDocument, variables: { id: noteId } },
                (data) => {
                  data?.note?.tags?.forEach((t) => {
                    if (t?.id === tagId) {
                      t.name = name as string;
                      t.hue = hue as number;
                    }
                  });
                  return data;
                }
              );
            });

            return null;
          },
          deleteTag: (variables, cache, _) => {
            const { tagId } = variables;
            console.log("tagId", tagId);

            cache.updateQuery<TagsQuery>({ query: TagsDocument }, (data) => {
              if (data && data.tags) {
                data.tags = data.tags.filter((t) => t?.id !== tagId);
              }
              return data;
            });

            return null;
          },
          addNewTag: (variables, cache, _) => {
            const { name, hue, noteId, tagId } = variables;

            const cachedTagsFromNote = cache.readQuery<NoteQuery>({
              query: NoteDocument,
              variables: { id: noteId },
            })?.note?.tags;

            const addedTag: Tag = {
              __typename: "Tag",
              name: name as string,
              hue: hue as number,
              id: tagId as string,
            };

            return {
              __typename: "Note",
              id: variables.noteId,
              tags: [...cachedTagsFromNote!, addedTag],
            } as any;
          },
          deleteTagFromNote: (variables, cache, _) => {
            const cachedTagsFromNote = cache.readQuery<NoteQuery>({
              query: NoteDocument,
              variables: { id: variables.noteId },
            })?.note?.tags;

            return {
              __typename: "Note",
              id: variables.noteId,
              tags: cachedTagsFromNote?.filter(
                (t) => t?.id !== variables.tagId
              ),
            } as any;
          },
          deleteComment: (variables, cache, _) => {
            const cachedComments = cache.readQuery<NoteQuery>({
              query: NoteDocument,
              variables: { id: variables.noteId },
            })?.note?.comments;

            return {
              __typename: "Note",
              id: variables.noteId,
              comments: cachedComments?.filter(
                (c) => c?.id !== variables.commentId
              ),
            } as any;
          },
          updateNote: (variables, _, __) => ({
            __typename: "Note",
            id: variables.noteId as string,
            text: variables.text,
          }),
          updateComment: (variables, _, __) => ({
            __typename: "Comment",
            id: variables.commentId as string,
            text: variables.text,
          }),
          updateReviewAmount: (variables, cache, _) => {
            const { reviewAmount } = variables;

            cache.updateQuery<InfoQuery>({ query: InfoDocument }, (data) => {
              data!.info!.reviewAmount = reviewAmount as number;
              return data;
            });

            return null;
          },
          updateReviewHistory: (_, cache, __) => {
            cache.updateQuery<InfoQuery>({ query: InfoDocument }, (data) => {
              data!.info!.streak = data!.info!.streak + 1;
              data!.info!.reviewed = true;
              return data;
            });

            return null;
          },
        },
        updates: {
          Mutation: {
            addNewTag: (_, args, cache, __) => {
              const { name, hue, tagId } = args;

              const addedTag: Tag = {
                __typename: "Tag",
                name: name as string,
                hue: hue as number,
                id: tagId as string,
              };

              cache.updateQuery<TagsQuery>({ query: TagsDocument }, (data) => {
                data?.tags?.push(addedTag);
                return data;
              });
            },
            updateTag: (_, args, cache, __) => {
              const { name, hue, tagId } = args;

              const allFields = cache.inspectFields("Query");
              const noteQueries = allFields.filter(
                (x) => x.fieldName === "note"
              );
              noteQueries.forEach((q) => {
                const noteId = q!.arguments!.id;
                cache.updateQuery<NoteQuery>(
                  { query: NoteDocument, variables: { id: noteId } },
                  (data) => {
                    data?.note?.tags?.forEach((t) => {
                      if (t?.id === tagId) {
                        t.name = name as string;
                        t.hue = hue as number;
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

              const noteQueries = allFields.filter(
                (x) => x.fieldName === "note"
              );

              noteQueries.forEach((q) => {
                const noteId = q!.arguments!.id;
                cache.updateQuery<NoteQuery>(
                  { query: NoteDocument, variables: { id: noteId } },
                  (data) => {
                    data!.note!.tags = data?.note?.tags?.filter(
                      (t) => t?.id !== tagId
                    );
                    return data;
                  }
                );
              });

              cache.updateQuery<TagsQuery>({ query: TagsDocument }, (data) => {
                if (data && data.tags) {
                  data.tags = data.tags.filter((t) => t?.id !== tagId);
                }
                return data;
              });
            },
          },
        },
      }) as any,
      fetchExchange,
    ],
  });

  return client;
};
