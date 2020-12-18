type BookType = {
  title: string;
  author: string;
  id: string;
};

type TagType = {
  id: string;
  name: string;
  hue: number;
}

type CommentType = {
  id: string;
  text: string;
  createdAt: string;
}

type NoteType = {
  text: string;
    id: string;
    title: string;
    author: string;
    tags: Array<TagType>;
    deleted: boolean;
    comments: Array<CommentType> 
  }
}



export { BookType, NoteType, TagType, CommentType };
