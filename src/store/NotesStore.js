import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import request from "../functions/request";
import "react-native-get-random-values";
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
