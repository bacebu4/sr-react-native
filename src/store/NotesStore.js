import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import request from "../functions/request";
import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
const { v4: uuidv4 } = require("uuid");

class NotesStore {
  highlights = [];
  searchResults = [];
  tags = [];
  latestBooks = [];
  amount = 3;
  email = null;
  uid = null;
  token = null;

  isLoginLoading = false;
  isLoading = false;
  isLogged = false;
  isSearching = false;

  constructor() {
    makeAutoObservable(this);
  }

  *fetchHighlights() {
    try {
      const notes = yield request(
        `http://192.168.1.70:3000/api/getDailyNotes`,
        "GET",
        this.token
      );
      this.highlights = [...notes];
    } catch (e) {
      console.log("error", e);
    }
  }

  *init() {
    this.setLoading(true);
    try {
      const available = yield SecureStore.isAvailableAsync();
      if (available) {
        const token = yield SecureStore.getItemAsync("token");
        if (token) {
          this.setToken(token);
          this.setLogged(true);
          yield this.fetchInitInfo();
          yield this.fetchHighlights();
        }
      }
    } catch (error) {
      console.log("token was not found");
    } finally {
      this.setLoading(false);
    }
  }

  *login(email, password) {
    try {
      this.setLoginLoading(true);
      this.setEmail(email);
      const token = yield request(
        "http://192.168.1.70:3000/api/login",
        "POST",
        "",
        { email, password }
      );

      console.log("success login ", token);
      this.setToken(token);
      const available = yield SecureStore.isAvailableAsync();
      if (available) {
        yield SecureStore.setItemAsync("token", token);
      }

      this.setLogged(true);
      this.setLoading(true);

      yield this.fetchInitInfo();
      yield this.fetchHighlights();
    } catch (error) {
      console.log("error login ", error);
    } finally {
      this.setLoginLoading(false);
      this.setLoading(false);
    }
  }

  *register() {
    try {
      const token = yield request(
        "http://192.168.1.70:3000/api/register",
        "POST",
        "",
        { email: this.email, uid: this.uid }
      );
      console.log("success register", token);
      this.setToken(token);
      yield this.fetchInitInfo();
    } catch (error) {
      console.log("error registering", error);
    }
  }

  *fetchInitInfo() {
    try {
      const initInfo = yield request(
        `http://192.168.1.70:3000/api/getInitInfo?id=1`,
        "GET",
        this.token
      );
      this.setTags(initInfo.tags);
      this.setLatestBooks(initInfo.latestBooks);
      this.setAmount(initInfo.accountInfo.review_amount);
    } catch (error) {
      console.log("error fetching init", error);
    }
  }

  *logout() {
    this.setLogged(false);
    this.setToken(null);
    yield SecureStore.deleteItemAsync("token");
  }

  *addExistingTag(noteIndex, tagId) {
    // FIXME here?
    const noteId = this.highlights[noteIndex].note_id;
    const { tag_id, hue, tag_name } = this.tags.find((t) => t.tag_id === tagId);
    this.setTag(noteIndex, { tag_id, hue, tag_name });
    try {
      yield request(
        `http://192.168.1.70:3000/api/addExistingTag`,
        "POST",
        this.token,
        { tag_id: tagId, note_id: noteId }
      );
    } catch (error) {}
  }

  *addNewTag(noteIndex, tagName, hue) {
    const noteId = this.highlights[noteIndex].note_id;
    const tagId = uuidv4();
    const newTag = { tag_id: tagId, hue, tag_name: tagName };
    this.setTag(noteIndex, newTag);
    this.setTags([...this.tags, newTag]);
    try {
      yield request(
        `http://192.168.1.70:3000/api/addNewTag`,
        "POST",
        this.token,
        { ...newTag, note_id: noteId }
      );
    } catch (error) {
      throw new Error("Unable to proceed the action");
    }
  }

  *deleteTagFromNote(noteIndex, tagId) {
    const noteId = this.highlights[noteIndex].note_id;
    this.highlights[noteIndex].tags = this.highlights[noteIndex].tags.filter(
      (t) => t.tag_id !== tagId
    );
    try {
      yield request(
        `http://192.168.1.70:3000/api/deleteTagFromNote`,
        "DELETE",
        this.token,
        { note_id: noteId, tag_id: tagId }
      );
    } catch (error) {
      throw new Error("Unable to proceed the action");
    }
  }

  *updateTag(tag_id, tag_name) {
    this.highlights.forEach((h) => {
      if (h.tags.length) {
        h.tags.forEach((t) => {
          if (t.tag_id === tag_id) {
            t.tag_name = tag_name;
          }
        });
      }
    });

    this.tags.forEach((t) => {
      if (t.tag_id === tag_id) {
        t.tag_name = tag_name;
      }
    });

    try {
      yield request(
        `http://192.168.1.70:3000/api/updateTag`,
        "PUT",
        this.token,
        { tag_name, tag_id }
      );
    } catch (error) {
      throw new Error("Unable to proceed the action");
    }
  }

  *searchNotes(substring) {
    this.setSearching(true);
    try {
      const results = yield request(
        `http://192.168.1.70:3000/api/searchNotes`,
        "POST",
        this.token,
        { substring }
      );
      this.setSearchResults(results);
      console.log(...results);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      this.setSearching(false);
    }
  }

  *deleteNote(noteId) {
    this.setDeleted(noteId);
    try {
      yield request(
        `http://192.168.1.70:3000/api/deleteNote`,
        "DELETE",
        this.token,
        { id: noteId }
      );
    } catch (error) {
      throw new Error(error.message);
    }
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

  setUid(value) {
    this.uid = value;
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

  setDeleted(noteId) {
    const noteIndexHighlights = this.highlights.findIndex(
      (h) => h.note_id === noteId
    );
    const noteIndexSearchResults = this.searchResults.findIndex(
      (h) => h.note_id === noteId
    );
    if (noteIndexHighlights > -1) {
      this.highlights[noteIndexHighlights].deleted = true;
    }
    if (noteIndexSearchResults > -1) {
      this.searchResults[noteIndexSearchResults].deleted = true;
    }
  }
}

export const NotesStoreContext = createContext(new NotesStore());
