import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Note = {
  __typename?: 'Note';
  id: Scalars['ID'];
  text: Scalars['String'];
  title: Scalars['String'];
  author: Scalars['String'];
  tags?: Maybe<Array<Maybe<Tag>>>;
  deleted?: Maybe<Scalars['Boolean']>;
  comments: Array<Maybe<Comment>>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  name: Scalars['String'];
  hue: Scalars['Int'];
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  text: Scalars['String'];
  createdAt: Scalars['String'];
  noteId: Scalars['String'];
};

export type Book = {
  __typename?: 'Book';
  id: Scalars['ID'];
  title: Scalars['String'];
  author: Scalars['String'];
};

export type Info = {
  __typename?: 'Info';
  reviewAmount: Scalars['Int'];
  latestReviewDate: Scalars['String'];
  streakBeginningDate: Scalars['String'];
  streak: Scalars['Int'];
  missed: Scalars['Int'];
  reviewed: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  dailyNotesIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  notesBy?: Maybe<Array<Maybe<Note>>>;
  note?: Maybe<Note>;
  info?: Maybe<Info>;
  books?: Maybe<Array<Maybe<Book>>>;
  latestBooks?: Maybe<Array<Maybe<Book>>>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  latestTags?: Maybe<Array<Maybe<Tag>>>;
};


export type QueryNotesByArgs = {
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<Scalars['String']>;
};


export type QueryNoteArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type UpdatedNote = {
  __typename?: 'UpdatedNote';
  id: Scalars['ID'];
  text: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment?: Maybe<Note>;
  addExistingTag?: Maybe<Note>;
  addNewTag?: Maybe<Note>;
  updateTag?: Maybe<Scalars['Boolean']>;
  deleteTag?: Maybe<Scalars['Boolean']>;
  deleteTagFromNote?: Maybe<Note>;
  deleteComment?: Maybe<Note>;
  updateReviewHistory?: Maybe<Scalars['Boolean']>;
  deleteNote?: Maybe<Scalars['Boolean']>;
  updateNote?: Maybe<Note>;
  updateComment?: Maybe<Comment>;
};


export type MutationAddCommentArgs = {
  noteId?: Maybe<Scalars['ID']>;
  commentId?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
};


export type MutationAddExistingTagArgs = {
  noteId?: Maybe<Scalars['ID']>;
  tagId?: Maybe<Scalars['ID']>;
};


export type MutationAddNewTagArgs = {
  noteId?: Maybe<Scalars['ID']>;
  tagId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  hue?: Maybe<Scalars['Int']>;
};


export type MutationUpdateTagArgs = {
  tagId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  hue?: Maybe<Scalars['Int']>;
};


export type MutationDeleteTagArgs = {
  tagId?: Maybe<Scalars['ID']>;
};


export type MutationDeleteTagFromNoteArgs = {
  noteId?: Maybe<Scalars['ID']>;
  tagId?: Maybe<Scalars['ID']>;
};


export type MutationDeleteCommentArgs = {
  commentId?: Maybe<Scalars['ID']>;
  noteId?: Maybe<Scalars['ID']>;
};


export type MutationUpdateReviewHistoryArgs = {
  date?: Maybe<Scalars['String']>;
};


export type MutationDeleteNoteArgs = {
  noteId?: Maybe<Scalars['String']>;
};


export type MutationUpdateNoteArgs = {
  noteId?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};


export type MutationUpdateCommentArgs = {
  commentId?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type AddCommentMutationVariables = Exact<{
  noteId: Scalars['ID'];
  commentId: Scalars['ID'];
  text: Scalars['String'];
}>;


export type AddCommentMutation = (
  { __typename?: 'Mutation' }
  & { addComment?: Maybe<(
    { __typename?: 'Note' }
    & Pick<Note, 'id'>
    & { comments: Array<Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'text' | 'createdAt' | 'noteId'>
    )>> }
  )> }
);

export type AddExistingTagMutationVariables = Exact<{
  noteId: Scalars['ID'];
  tagId: Scalars['ID'];
}>;


export type AddExistingTagMutation = (
  { __typename?: 'Mutation' }
  & { addExistingTag?: Maybe<(
    { __typename?: 'Note' }
    & Pick<Note, 'id'>
    & { tags?: Maybe<Array<Maybe<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'name' | 'hue'>
    )>>> }
  )> }
);

export type AddNewTagMutationVariables = Exact<{
  noteId: Scalars['ID'];
  tagId: Scalars['ID'];
  name: Scalars['String'];
  hue: Scalars['Int'];
}>;


export type AddNewTagMutation = (
  { __typename?: 'Mutation' }
  & { addNewTag?: Maybe<(
    { __typename?: 'Note' }
    & Pick<Note, 'id'>
    & { tags?: Maybe<Array<Maybe<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'name' | 'hue'>
    )>>> }
  )> }
);

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['ID'];
  noteId: Scalars['ID'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & { deleteComment?: Maybe<(
    { __typename?: 'Note' }
    & Pick<Note, 'id'>
    & { comments: Array<Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'text' | 'createdAt' | 'noteId'>
    )>> }
  )> }
);

export type DeleteNoteMutationVariables = Exact<{
  noteId: Scalars['String'];
}>;


export type DeleteNoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteNote'>
);

export type DeleteTagMutationVariables = Exact<{
  tagId: Scalars['ID'];
}>;


export type DeleteTagMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTag'>
);

export type DeleteTagFromNoteMutationVariables = Exact<{
  noteId: Scalars['ID'];
  tagId: Scalars['ID'];
}>;


export type DeleteTagFromNoteMutation = (
  { __typename?: 'Mutation' }
  & { deleteTagFromNote?: Maybe<(
    { __typename?: 'Note' }
    & Pick<Note, 'id'>
    & { tags?: Maybe<Array<Maybe<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'name' | 'hue'>
    )>>> }
  )> }
);

export type UpdateCommentMutationVariables = Exact<{
  commentId: Scalars['ID'];
  text: Scalars['String'];
}>;


export type UpdateCommentMutation = (
  { __typename?: 'Mutation' }
  & { updateComment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'text'>
  )> }
);

export type UpdateNoteMutationVariables = Exact<{
  noteId: Scalars['String'];
  text: Scalars['String'];
}>;


export type UpdateNoteMutation = (
  { __typename?: 'Mutation' }
  & { updateNote?: Maybe<(
    { __typename?: 'Note' }
    & Pick<Note, 'id' | 'text'>
  )> }
);

export type UpdateReviewHistoryMutationVariables = Exact<{
  date: Scalars['String'];
}>;


export type UpdateReviewHistoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateReviewHistory'>
);

export type UpdateTagMutationVariables = Exact<{
  tagId: Scalars['ID'];
  name: Scalars['String'];
  hue: Scalars['Int'];
}>;


export type UpdateTagMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateTag'>
);

export type BooksQueryVariables = Exact<{ [key: string]: never; }>;


export type BooksQuery = (
  { __typename?: 'Query' }
  & { books?: Maybe<Array<Maybe<(
    { __typename?: 'Book' }
    & Pick<Book, 'title' | 'author' | 'id'>
  )>>> }
);

export type DailyNotesIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type DailyNotesIdsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'dailyNotesIds'>
);

export type InfoQueryVariables = Exact<{ [key: string]: never; }>;


export type InfoQuery = (
  { __typename?: 'Query' }
  & { info?: Maybe<(
    { __typename?: 'Info' }
    & Pick<Info, 'reviewAmount' | 'latestReviewDate' | 'streakBeginningDate' | 'missed' | 'reviewed' | 'streak'>
  )> }
);

export type LatestBooksQueryVariables = Exact<{ [key: string]: never; }>;


export type LatestBooksQuery = (
  { __typename?: 'Query' }
  & { latestBooks?: Maybe<Array<Maybe<(
    { __typename?: 'Book' }
    & Pick<Book, 'id' | 'title' | 'author'>
  )>>> }
);

export type LatestTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type LatestTagsQuery = (
  { __typename?: 'Query' }
  & { latestTags?: Maybe<Array<Maybe<(
    { __typename?: 'Tag' }
    & Pick<Tag, 'id' | 'name' | 'hue'>
  )>>> }
);

export type NoteQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NoteQuery = (
  { __typename?: 'Query' }
  & { note?: Maybe<(
    { __typename?: 'Note' }
    & Pick<Note, 'text' | 'id' | 'title' | 'author' | 'deleted'>
    & { tags?: Maybe<Array<Maybe<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'name' | 'hue'>
    )>>>, comments: Array<Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'text' | 'createdAt' | 'noteId'>
    )>> }
  )> }
);

export type NotesByQueryVariables = Exact<{
  type: Scalars['String'];
  id: Scalars['ID'];
}>;


export type NotesByQuery = (
  { __typename?: 'Query' }
  & { notesBy?: Maybe<Array<Maybe<(
    { __typename?: 'Note' }
    & Pick<Note, 'text' | 'id' | 'title' | 'author'>
  )>>> }
);

export type NotesByBookQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NotesByBookQuery = (
  { __typename?: 'Query' }
  & { notesBy?: Maybe<Array<Maybe<(
    { __typename?: 'Note' }
    & Pick<Note, 'text' | 'id'>
  )>>> }
);

export type NotesByTagQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NotesByTagQuery = (
  { __typename?: 'Query' }
  & { notesBy?: Maybe<Array<Maybe<(
    { __typename?: 'Note' }
    & Pick<Note, 'text' | 'id' | 'title' | 'author'>
  )>>> }
);

export type TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsQuery = (
  { __typename?: 'Query' }
  & { tags?: Maybe<Array<Maybe<(
    { __typename?: 'Tag' }
    & Pick<Tag, 'id' | 'name' | 'hue'>
  )>>> }
);


export const AddCommentDocument = gql`
    mutation AddComment($noteId: ID!, $commentId: ID!, $text: String!) {
  addComment(noteId: $noteId, commentId: $commentId, text: $text) {
    id
    comments {
      id
      text
      createdAt
      noteId
    }
  }
}
    `;

export function useAddCommentMutation() {
  return Urql.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument);
};
export const AddExistingTagDocument = gql`
    mutation AddExistingTag($noteId: ID!, $tagId: ID!) {
  addExistingTag(noteId: $noteId, tagId: $tagId) {
    id
    tags {
      id
      name
      hue
    }
  }
}
    `;

export function useAddExistingTagMutation() {
  return Urql.useMutation<AddExistingTagMutation, AddExistingTagMutationVariables>(AddExistingTagDocument);
};
export const AddNewTagDocument = gql`
    mutation AddNewTag($noteId: ID!, $tagId: ID!, $name: String!, $hue: Int!) {
  addNewTag(noteId: $noteId, tagId: $tagId, name: $name, hue: $hue) {
    id
    tags {
      id
      name
      hue
    }
  }
}
    `;

export function useAddNewTagMutation() {
  return Urql.useMutation<AddNewTagMutation, AddNewTagMutationVariables>(AddNewTagDocument);
};
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: ID!, $noteId: ID!) {
  deleteComment(commentId: $commentId, noteId: $noteId) {
    id
    comments {
      id
      text
      createdAt
      noteId
    }
  }
}
    `;

export function useDeleteCommentMutation() {
  return Urql.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument);
};
export const DeleteNoteDocument = gql`
    mutation DeleteNote($noteId: String!) {
  deleteNote(noteId: $noteId)
}
    `;

export function useDeleteNoteMutation() {
  return Urql.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNoteDocument);
};
export const DeleteTagDocument = gql`
    mutation DeleteTag($tagId: ID!) {
  deleteTag(tagId: $tagId)
}
    `;

export function useDeleteTagMutation() {
  return Urql.useMutation<DeleteTagMutation, DeleteTagMutationVariables>(DeleteTagDocument);
};
export const DeleteTagFromNoteDocument = gql`
    mutation DeleteTagFromNote($noteId: ID!, $tagId: ID!) {
  deleteTagFromNote(noteId: $noteId, tagId: $tagId) {
    id
    tags {
      id
      name
      hue
    }
  }
}
    `;

export function useDeleteTagFromNoteMutation() {
  return Urql.useMutation<DeleteTagFromNoteMutation, DeleteTagFromNoteMutationVariables>(DeleteTagFromNoteDocument);
};
export const UpdateCommentDocument = gql`
    mutation UpdateComment($commentId: ID!, $text: String!) {
  updateComment(commentId: $commentId, text: $text) {
    id
    text
  }
}
    `;

export function useUpdateCommentMutation() {
  return Urql.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument);
};
export const UpdateNoteDocument = gql`
    mutation UpdateNote($noteId: String!, $text: String!) {
  updateNote(noteId: $noteId, text: $text) {
    id
    text
  }
}
    `;

export function useUpdateNoteMutation() {
  return Urql.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(UpdateNoteDocument);
};
export const UpdateReviewHistoryDocument = gql`
    mutation UpdateReviewHistory($date: String!) {
  updateReviewHistory(date: $date)
}
    `;

export function useUpdateReviewHistoryMutation() {
  return Urql.useMutation<UpdateReviewHistoryMutation, UpdateReviewHistoryMutationVariables>(UpdateReviewHistoryDocument);
};
export const UpdateTagDocument = gql`
    mutation UpdateTag($tagId: ID!, $name: String!, $hue: Int!) {
  updateTag(tagId: $tagId, name: $name, hue: $hue)
}
    `;

export function useUpdateTagMutation() {
  return Urql.useMutation<UpdateTagMutation, UpdateTagMutationVariables>(UpdateTagDocument);
};
export const BooksDocument = gql`
    query Books {
  books {
    title
    author
    id
  }
}
    `;

export function useBooksQuery(options: Omit<Urql.UseQueryArgs<BooksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BooksQuery>({ query: BooksDocument, ...options });
};
export const DailyNotesIdsDocument = gql`
    query DailyNotesIds {
  dailyNotesIds
}
    `;

export function useDailyNotesIdsQuery(options: Omit<Urql.UseQueryArgs<DailyNotesIdsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DailyNotesIdsQuery>({ query: DailyNotesIdsDocument, ...options });
};
export const InfoDocument = gql`
    query Info {
  info {
    reviewAmount
    latestReviewDate
    streakBeginningDate
    missed
    reviewed
    streak
  }
}
    `;

export function useInfoQuery(options: Omit<Urql.UseQueryArgs<InfoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<InfoQuery>({ query: InfoDocument, ...options });
};
export const LatestBooksDocument = gql`
    query LatestBooks {
  latestBooks {
    id
    title
    author
  }
}
    `;

export function useLatestBooksQuery(options: Omit<Urql.UseQueryArgs<LatestBooksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<LatestBooksQuery>({ query: LatestBooksDocument, ...options });
};
export const LatestTagsDocument = gql`
    query LatestTags {
  latestTags {
    id
    name
    hue
  }
}
    `;

export function useLatestTagsQuery(options: Omit<Urql.UseQueryArgs<LatestTagsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<LatestTagsQuery>({ query: LatestTagsDocument, ...options });
};
export const NoteDocument = gql`
    query Note($id: ID!) {
  note(id: $id) {
    text
    id
    title
    author
    tags {
      id
      name
      hue
    }
    deleted
    comments {
      id
      text
      createdAt
      noteId
    }
  }
}
    `;

export function useNoteQuery(options: Omit<Urql.UseQueryArgs<NoteQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<NoteQuery>({ query: NoteDocument, ...options });
};
export const NotesByDocument = gql`
    query NotesBy($type: String!, $id: ID!) {
  notesBy(type: $type, id: $id) {
    text
    id
    title
    author
  }
}
    `;

export function useNotesByQuery(options: Omit<Urql.UseQueryArgs<NotesByQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<NotesByQuery>({ query: NotesByDocument, ...options });
};
export const NotesByBookDocument = gql`
    query NotesByBook($id: ID!) {
  notesBy(type: "book", id: $id) {
    text
    id
  }
}
    `;

export function useNotesByBookQuery(options: Omit<Urql.UseQueryArgs<NotesByBookQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<NotesByBookQuery>({ query: NotesByBookDocument, ...options });
};
export const NotesByTagDocument = gql`
    query NotesByTag($id: ID!) {
  notesBy(type: "tag", id: $id) {
    text
    id
    title
    author
  }
}
    `;

export function useNotesByTagQuery(options: Omit<Urql.UseQueryArgs<NotesByTagQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<NotesByTagQuery>({ query: NotesByTagDocument, ...options });
};
export const TagsDocument = gql`
    query Tags {
  tags {
    id
    name
    hue
  }
}
    `;

export function useTagsQuery(options: Omit<Urql.UseQueryArgs<TagsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TagsQuery>({ query: TagsDocument, ...options });
};