import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import request from "../functions/request";
import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { differenceInCalendarDays } from "date-fns/esm";
import { BACKEND_URL } from "../variables";

class NotesStore {
  highlights = [];
  searchResults = [];
  tags = [];
  latestBooks = [];
  amount = 3;
  email = null;
  token = null;
  currentNote = null;
  info = {};

  isLoginLoading = false;
  isLoading = false;
  isLogged = false;
  isSearching = false;

  constructor() {
    makeAutoObservable(this);
  }

  *register(password) {
    try {
      console.log(BACKEND_URL);
      this.setLoginLoading(true);
      const token = yield request(`${BACKEND_URL}/api/register`, "POST", "", {
        email: this.email,
        password,
      });

      console.log("success register ", token);
      this.setToken(token);
      const available = yield SecureStore.isAvailableAsync();
      if (available) {
        yield SecureStore.setItemAsync("token", token);
      }

      this.setLogged(true);
      this.setLoading(true);

      yield this.fetchInitInfo();
    } catch (error) {
      throw new Error(error.message);
    } finally {
      this.setLoginLoading(false);
      this.setLoading(false);
    }
  }

  *searchNotes(substring) {
    this.setSearching(true);

    try {
      const results = yield request(
        `${BACKEND_URL}/api/searchNotes`,
        "POST",
        this.token,
        { substring }
      );
      this.setSearchResults(results);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      this.setSearching(false);
    }
  }

  setCurrentNote(value) {
    this.currentNote = value;
  }

  setCurrent(value) {
    this.info.current = value;
  }

  setToken(value) {
    this.token = value;
  }

  setLoginLoading(value) {
    this.isLoginLoading = value;
  }

  setLoading(value) {
    this.isLoading = value;
  }

  setLogged(value) {
    this.isLogged = value;
  }

  setEmail(value) {
    this.email = value;
  }

  setTags(value) {
    this.tags = value;
  }

  setLatestBooks(value) {
    this.latestBooks = value;
  }

  setAmount(value) {
    this.amount = value;
  }

  setSearching(value) {
    this.isSearching = value;
  }

  setTag(noteIndex, tag) {
    this.highlights[noteIndex].tags.push(tag);
  }

  setSearchResults(value) {
    this.searchResults = value;
  }
}

export const NotesStoreContext = createContext(new NotesStore());
