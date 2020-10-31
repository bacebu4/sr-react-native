import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class UiStore {
  settingsRef = null;
  addNavigationRef = null;
  addRef = null;

  setSettingsRef(value) {
    this.settingsRef = value;
  }

  setAddRef(value) {
    this.addRef = value;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const UiStoreContext = createContext(new UiStore());
