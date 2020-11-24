import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class UiStore {
  currentNote = 0;
  currentTag = null;

  setCurrentNote(value) {
    this.currentNote = value;
  }

  setCurrentTag(value) {
    this.currentTag = value;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const UiStoreContext = createContext(new UiStore());
