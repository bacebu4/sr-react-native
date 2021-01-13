import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class UiStore {
  currentNote: string | null = null;
  currentTag: string | null = null;
  currentReviewIndex: number = 0;

  setCurrentNoteId(value: string) {
    this.currentNote = value;
  }

  setCurrentTagId(value: string) {
    this.currentTag = value;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const UiStoreContext = createContext(new UiStore());
