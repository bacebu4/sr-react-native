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
  hue: Scalars['String'];
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
  note?: Maybe<Note>;
  initInfo?: Maybe<InitInfo>;
  books?: Maybe<Array<Maybe<Book>>>;
};


export type QueryNoteArgs = {
  id?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewTag?: Maybe<Scalars['Boolean']>;
};


export type MutationAddNewTagArgs = {
  name?: Maybe<Scalars['String']>;
  hue?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  noteId?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type BooksQueryVariables = Exact<{ [key: string]: never; }>;


export type BooksQuery = (
  { __typename?: 'Query' }
  & { books?: Maybe<Array<Maybe<(
    { __typename?: 'Book' }
    & Pick<Book, 'title' | 'author' | 'id'>
  )>>> }
);


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