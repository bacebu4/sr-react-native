import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import * as SecureStore from "expo-secure-store";
import { TOKEN_STORAGE_NAME } from "../variables";

class UiStore {
  currentTagId: string | null = null;
  currentReviewIndex: number = 0;
  isLoading = false;
  isLogged: boolean | null = false;

  setCurrentTagId(value: string) {
    this.currentTagId = value;
  }

  *setToken(value: string | null) {
    const available = yield SecureStore.isAvailableAsync();
    if (available && value) {
      yield SecureStore.setItemAsync(TOKEN_STORAGE_NAME, value);
      this.setLogged(true);
    }
  }

  setCurrentReviewIndex(value: number) {
    this.currentReviewIndex = value;
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  setLogged(value: boolean) {
    console.log("fired", value);

    this.isLogged = value;
    console.log(this.isLogged);
  }

  *logout() {
    yield SecureStore.deleteItemAsync(TOKEN_STORAGE_NAME);
    this.setLogged(false);
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const UiStoreContext = createContext(new UiStore());
