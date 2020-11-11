import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class UiStore {
  addNavigationRef = null;
  addRef = null;
  editRef = null;
  showAddSheet = false;
  showChooseSheet = false;
  currentNote = 0;
  currentTag = null;
  showEditTagSheet = false;

  setAddRef(value) {
    this.addRef = value;
  }

  setEditRef(value) {
    this.editRef = value;
  }

  setShowAddSheet(value) {
    this.showAddSheet = value;
  }

  setShowEditSheet(value, tagId = null) {
    this.showEditTagSheet = value;
    if (this.editRef) {
      if (value) {
        this.editRef.current.snapTo(0);
        this.currentTag = tagId;
      } else {
        this.editRef.current.snapTo(1);
      }
    }
  }

  setShowChooseSheet(value) {
    this.showChooseSheet = value;
  }

  setCurrentNote(value) {
    this.currentNote = value;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const UiStoreContext = createContext(new UiStore());
