import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class UiStore {
  settingsRef = null;
  addNavigationRef = null;
  addRef = null;
  editRef = null;
  showAddSheet = false;
  showChooseSheet = false;
  currentNote = 0;
  showEditTagSheet = false;

  setSettingsRef(value) {
    this.settingsRef = value;
  }

  setAddRef(value) {
    this.addRef = value;
  }

  setEditRef(value) {
    this.editRef = value;
  }

  setShowAddSheet(value) {
    this.showAddSheet = value;
  }

  setShowEditSheet(value) {
    this.showEditTagSheet = value;
    if (value) {
      this.editRef.current.snapTo(0);
    } else {
      this.editRef.current.snapTo(1);
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
