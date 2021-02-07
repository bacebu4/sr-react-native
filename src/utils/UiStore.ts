import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import * as SecureStore from "expo-secure-store";

class UiStore {
  currentTagId: string | null = null;
  token: string | null = null;
  currentReviewIndex: number = 0;
  isLoading = false;
  isLogged: boolean | null = false;

  setCurrentTagId(value: string) {
    this.currentTagId = value;
  }

  *setToken(value: string | null) {
    const available = yield SecureStore.isAvailableAsync();
    if (available && value) {
      this.token = value;
      yield SecureStore.setItemAsync("token", value);
    }
  }

  setCurrentReviewIndex(value: number) {
    this.currentReviewIndex = value;
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  setLogged(value: boolean) {
    this.isLogged = value;
  }

  *init() {
    this.setLoading(true);
    try {
      const available = yield SecureStore.isAvailableAsync();
      if (available) {
        const token = yield SecureStore.getItemAsync("token");
        if (token) {
          this.setLogged(true);
          this.setToken(token);
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      this.setLogged(false);
      console.log("Token was not found");
    } finally {
      this.setLoading(false);
    }
  }

  *logout() {
    this.setToken(null);
    yield SecureStore.deleteItemAsync("token");
    this.setLogged(false);
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const UiStoreContext = createContext(new UiStore());
