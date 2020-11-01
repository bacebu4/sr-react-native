import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class UiStore {
  settingsRef = null;
  addNavigationRef = null;
  addRef = null;
  showAddSheet = false;

  setSettingsRef(value) {
    this.settingsRef = value;
  }

  setAddRef(value) {
    this.addRef = value;
  }

  setShowAddSheet(value) {
    this.showAddSheet = value;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const UiStoreContext = createContext(new UiStore());
