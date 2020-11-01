import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class UiStore {
  settingsRef = null;
  addNavigationRef = null;
  addRef = null;
  showAddSheet = false;
  currentNote = null;

  setSettingsRef(value) {
    this.settingsRef = value;
  }

  setAddRef(value) {
    this.addRef = value;
  }

  setShowAddSheet(value) {
    this.showAddSheet = value;
  }

  setCurrentNote(value) {
    this.currentNote = value;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const UiStoreContext = createContext(new UiStore());
