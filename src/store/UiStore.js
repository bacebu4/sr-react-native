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

  setEditTagSheet(value) {
    this.editTagSheet = value;
    this.edit;
  }

  setAddRef(value) {
    this.addRef = value;
  }

  setEditRef(value) {
    this.editRef = value;
  }

  setShowEditSheet(value) {
    this.showAddSheet = value;
    if (value) {
      this.editRef.current.snapTo(0);
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
