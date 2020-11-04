import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class UiStore {
  settingsRef = null;
  addNavigationRef = null;
  addRef = null;
  showAddSheet = false;
  showChooseSheet = false;
  currentNote = 0;

  setSettingsRef(value) {
    this.settingsRef = value;
  }

  setAddRef(value) {
    this.addRef = value;
  }

  setShowAddSheet(value) {
    this.showAddSheet = value;
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
