import { makeObservable, observable, action, flow } from "mobx";
import { createContext } from "react";
import request from "../functions/request";
import * as SecureStore from "expo-secure-store";

class NotesStore {
  highlights = [];
  tags = [];
  latestBooks = [];
  amount = 3;
  email = null;
  uid = null;
  token = null;

  isLoginLoading = false;
  isLoading = false;
  isLogged = false;

  constructor() {
    makeObservable(this, {
      highlights: observable,
      tags: observable,
      email: observable,
      uid: observable,
      token: observable,
      latestBooks: observable,
      isLoginLoading: observable,
      isLoading: observable,
      isLogged: observable,
      amount: observable,
      fetchHighlights: flow,
      fetchInitInfo: flow,
      init: flow,
      login: flow,
      register: flow,
      setEmail: action,
      setToken: action,
      setUid: action,
      setTags: action,
      setLatestBooks: action,
      setAmount: action,
      setLoginLoading: action,
      setLoading: action,
      setLogged: action,
      logout: flow,
      addExistingTag: flow,
      addNewTag: action,
      setTag: action,
    });
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

  addNewTag(noteIndex, tagName, hue) {
    const noteId = this.highlights[noteIndex].note_id;
    console.log(noteId, tagName, hue);
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

  setTag(noteIndex, tag) {
    this.highlights[noteIndex].tags.push(tag);
  }
}

export const NotesStoreContext = createContext(new NotesStore());
