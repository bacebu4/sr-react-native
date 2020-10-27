import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class UiStore {
  count = 0;
  showSettingsSheet = false;

  setShowSettingsSheet(value) {
    this.showSettingsSheet = value;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const UiStoreContext = createContext(new UiStore());
