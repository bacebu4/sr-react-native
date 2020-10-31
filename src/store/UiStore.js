import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class UiStore {
  showSettingsSheet = false;
  settingsRef = null;

  setShowSettingsSheet(value) {
    this.showSettingsSheet = value;
  }

  setSettingsRef(value) {
    this.settingsRef = value;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const UiStoreContext = createContext(new UiStore());
