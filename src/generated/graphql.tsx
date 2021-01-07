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
};

export type Book = {
  __typename?: 'Book';
  id: Scalars['ID'];
  title: Scalars['String'];
  author: Scalars['String'];
};

export type AccountInfo = {
  __typename?: 'AccountInfo';
  reviewAmount: Scalars['Int'];
  streak: Scalars['Int'];
  missed: Scalars['Int'];
  current: Scalars['Int'];
  createdAt: Scalars['String'];
  reviewed: Scalars['Boolean'];
};

export type InitInfo = {
  __typename?: 'InitInfo';
  tags: Array<Maybe<Tag>>;
  latestBooks: Array<Maybe<Book>>;
  accountInfo?: Maybe<AccountInfo>;
};

export type Query = {
  __typename?: 'Query';
  dailyNotes?: Maybe<Array<Maybe<Note>>>;
  notesBy?: Maybe<Array<Maybe<Note>>>;
  note?: Maybe<Note>;
  initInfo?: Maybe<InitInfo>;
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
  addNewTag?: Maybe<Scalars['Boolean']>;
  addComment?: Maybe<Note>;
  updateReviewHistory?: Maybe<Scalars['Boolean']>;
  deleteNote?: Maybe<Scalars['Boolean']>;
  updateNote?: Maybe<Note>;
};


export type MutationAddNewTagArgs = {
  name?: Maybe<Scalars['String']>;
  hue?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  noteId?: Maybe<Scalars['String']>;
};


export type MutationAddCommentArgs = {
  noteId?: Maybe<Scalars['ID']>;
  commentId?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
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
      & Pick<Comment, 'id' | 'text' | 'createdAt'>
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

export type BooksQueryVariables = Exact<{ [key: string]: never; }>;


export type BooksQuery = (
  { __typename?: 'Query' }
  & { books?: Maybe<Array<Maybe<(
    { __typename?: 'Book' }
    & Pick<Book, 'title' | 'author' | 'id'>
  )>>> }
);

export type DailyNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type DailyNotesQuery = (
  { __typename?: 'Query' }
  & { dailyNotes?: Maybe<Array<Maybe<(
    { __typename?: 'Note' }
    & Pick<Note, 'text' | 'id' | 'title' | 'author' | 'deleted'>
    & { tags?: Maybe<Array<Maybe<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'name' | 'hue'>
    )>>>, comments: Array<Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'text' | 'createdAt'>
    )>> }
  )>>> }
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
      & Pick<Comment, 'id' | 'text' | 'createdAt'>
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
    }
  }
}
    `;

export function useAddCommentMutation() {
  return Urql.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument);
};
export const DeleteNoteDocument = gql`
    mutation DeleteNote($noteId: String!) {
  deleteNote(noteId: $noteId)
}
    `;

export function useDeleteNoteMutation() {
  return Urql.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNoteDocument);
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
export const DailyNotesDocument = gql`
    query DailyNotes {
  dailyNotes {
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
    }
  }
}
    `;

export function useDailyNotesQuery(options: Omit<Urql.UseQueryArgs<DailyNotesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DailyNotesQuery>({ query: DailyNotesDocument, ...options });
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