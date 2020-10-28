import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class HighlightsStore {
  highlights = [];

  fetchHighlights() {
    this.highlights.push({
      note_text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit hic excepturi rerum modi similique odio totam beatae magni",
      note_title: "Anna Karenina",
      author_full_name: "Leo Tolstoy",
    });
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const HighlightsStoreContext = createContext(new HighlightsStore());
