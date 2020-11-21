import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import request from "../functions/request";
import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
const { v4: uuidv4 } = require("uuid");
const dateFormat = require("dateformat");
import { BACK_URL } from "@env";

class NotesStore {
  highlights = [];
  searchResults = [];
  tags = [];
  latestBooks = [];
  amount = 3;
  email = null;
  uid = null;
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

  *fetchHighlights() {
    try {
      console.log(BACK_URL);
      const notes = yield request(
        `${BACK_URL}/api/getDailyNotes`,
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
      console.log(BACK_URL);
      this.setLoginLoading(true);
      this.setEmail(email);
      const token = yield request(`${BACK_URL}/api/login`, "POST", "", {
        email,
        password,
      });

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
      throw new Error(error.message);
    } finally {
      this.setLoginLoading(false);
      this.setLoading(false);
    }
  }

  *register(password) {
    try {
      console.log(BACK_URL);
      this.setLoginLoading(true);
      const token = yield request(`${BACK_URL}/api/register`, "POST", "", {
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
      yield this.fetchHighlights();
    } catch (error) {
      throw new Error(error.message);
    } finally {
      this.setLoginLoading(false);
      this.setLoading(false);
    }
  }

  *fetchInitInfo() {
    try {
      const initInfo = yield request(
        `${BACK_URL}/api/getInitInfo?id=1`,
        "GET",
        this.token
      );
      this.setTags(initInfo.tags);
      console.log(initInfo.tags.length);
      this.setLatestBooks(initInfo.latestBooks);
      this.setAmount(initInfo.accountInfo.review_amount);
      this.info = initInfo.accountInfo;
    } catch (error) {
      console.log("error fetching init", error);
    }
  }

  *logout() {
    this.setLogged(false);
    this.setToken(null);
    yield SecureStore.deleteItemAsync("token");
  }

  *addExistingTag(note_id, tagId) {
    const noteIndex = this.highlights.findIndex((h) => h.note_id === note_id);
    const { tag_id, hue, tag_name } = this.tags.find((t) => t.tag_id === tagId);
    if (noteIndex > -1) {
      this.setTag(noteIndex, { tag_id, hue, tag_name });
    }

    if (this.currentNote && this.currentNote.note_id === note_id) {
      this.currentNote.tags.push({ tag_id, hue, tag_name });
    }

    try {
      yield request(`${BACK_URL}/api/addExistingTag`, "POST", this.token, {
        tag_id: tagId,
        note_id,
      });
    } catch (error) {}
  }

  *addNewTag(note_id, tagName, hue) {
    const noteIndex = this.highlights.findIndex((h) => h.note_id === note_id);
    const tagId = uuidv4();
    const newTag = { tag_id: tagId, hue, tag_name: tagName };
    this.setTags([...this.tags, newTag]);
    if (noteIndex > -1) {
      this.setTag(noteIndex, newTag);
    }

    if (this.currentNote && this.currentNote.note_id === note_id) {
      this.currentNote.tags.push(newTag);
    }
    try {
      yield request(`${BACK_URL}/api/addNewTag`, "POST", this.token, {
        ...newTag,
        note_id,
      });
    } catch (error) {
      throw new Error("Unable to proceed the action");
    }
  }

  *deleteTagFromNote(note_id, tagId) {
    const noteIndex = this.highlights.findIndex((h) => h.note_id === note_id);
    if (noteIndex > -1) {
      this.highlights[noteIndex].tags = this.highlights[noteIndex].tags.filter(
        (t) => t.tag_id !== tagId
      );
    }

    if (this.currentNote && this.currentNote.note_id === note_id) {
      this.currentNote.tags = this.currentNote.tags.filter(
        (t) => t.tag_id !== tagId
      );
    }

    try {
      yield request(`${BACK_URL}/api/deleteTagFromNote`, "DELETE", this.token, {
        note_id,
        tag_id: tagId,
      });
    } catch (error) {
      throw new Error("Unable to proceed the action");
    }
  }

  *deleteTag(tag_id) {
    this.highlights.forEach((h) => {
      h.tags = h.tags.filter((t) => t.tag_id !== tag_id);
    });

    this.tags = this.tags.filter((t) => t.tag_id !== tag_id);

    try {
      yield request(`${BACK_URL}/api/deleteTag`, "DELETE", this.token, {
        tag_id,
      });
    } catch (error) {
      throw new Error("Unable to proceed the action");
    }
  }

  *updateTag(tag_id, tag_name, hue) {
    this.highlights.forEach((h) => {
      h.tags.forEach((t) => {
        if (t.tag_id === tag_id) {
          t.tag_name = tag_name;
          t.hue = hue;
        }
      });
    });

    if (this.currentNote) {
      this.currentNote.tags.forEach((t) => {
        if (t.tag_id === tag_id) {
          t.tag_name = tag_name;
          t.hue = hue;
        }
      });
    }

    this.tags.forEach((t) => {
      if (t.tag_id === tag_id) {
        t.tag_name = tag_name;
        t.hue = hue;
      }
    });

    try {
      yield request(`${BACK_URL}/api/updateTag`, "PUT", this.token, {
        tag_name,
        tag_id,
        hue,
      });
    } catch (error) {
      throw new Error("Unable to proceed the action");
    }
  }

  *updateNote(note_id, note_text) {
    const noteIndex = this.highlights.findIndex((h) => h.note_id === note_id);
    if (noteIndex > -1) {
      this.highlights[noteIndex].note_text = note_text;
    }

    if (this.currentNote && this.currentNote.note_id === note_id) {
      this.currentNote.note_text = note_text;
    }

    this.searchResults.forEach((h) => {
      if (h.note_id === note_id) {
        h.note_text = note_text;
      }
    });

    try {
      yield request(`${BACK_URL}/api/updateNote`, "PUT", this.token, {
        note_id,
        note_text,
      });
    } catch (error) {
      throw new Error("Unable to proceed the action");
    }
  }

  *updateComment(comment_id, comment_text) {
    this.highlights.forEach((h) => {
      h.comments.forEach((c) => {
        if (c.comment_id === comment_id) {
          c.comment_text = comment_text;
        }
      });
    });

    if (this.currentNote) {
      this.currentNote.comments.forEach((c) => {
        if (c.comment_id === comment_id) {
          c.comment_text = comment_text;
        }
      });
    }

    try {
      yield request(`${BACK_URL}/api/updateComment`, "PUT", this.token, {
        comment_id,
        comment_text,
      });
    } catch (error) {
      throw new Error("Unable to proceed the action");
    }
  }

  *searchNotes(substring) {
    this.setSearching(true);

    try {
      const results = yield request(
        `${BACK_URL}/api/searchNotes`,
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

  *deleteNote(noteId) {
    this.setDeleted(noteId);

    try {
      yield request(`${BACK_URL}/api/deleteNote`, "DELETE", this.token, {
        id: noteId,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  *addComment(note_id, comment_text) {
    const now = new Date();

    const newComment = {
      comment_text,
      comment_id: uuidv4(),
      note_id,
    };

    const noteIndex = this.highlights.findIndex((h) => h.note_id === note_id);
    if (noteIndex > -1) {
      this.highlights[noteIndex].comments.push({
        ...newComment,
        createdat: dateFormat(now, "yyyy-mm-dd"),
      });
    }

    if (this.currentNote && this.currentNote.note_id === note_id) {
      this.currentNote.comments.push({
        ...newComment,
        createdat: dateFormat(now, "yyyy-mm-dd"),
      });
    }

    try {
      yield request(`${BACK_URL}/api/addComment`, "POST", this.token, {
        ...newComment,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  *deleteComment(comment_id) {
    this.highlights.forEach((h) => {
      h.comments = h.comments.filter((c) => {
        return c.comment_id !== comment_id;
      });
    });

    if (this.currentNote) {
      this.currentNote.comments = this.currentNote.comments.filter((c) => {
        return c.comment_id !== comment_id;
      });
    }

    try {
      yield request(`${BACK_URL}/api/deleteComment`, "DELETE", this.token, {
        comment_id,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  setCurrentNote(value) {
    this.currentNote = value;
  }

  setCurrent(value) {
    this.info.current = value;
  }

  *setReviewed() {
    if (!this.info.reviewed) {
      this.info.reviewed = true;
      this.info.streak = this.info.streak + 1;

      try {
        yield request(`${BACK_URL}/api/setReviewed`, "POST", this.token);
      } catch (error) {
        throw new Error(error.message);
      }
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
    if (this.currentNote && this.currentNote.note_id === noteId) {
      this.currentNote.deleted = true;
    }
  }
}

export const NotesStoreContext = createContext(new NotesStore());
