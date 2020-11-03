import { makeObservable, observable, action, flow } from "mobx";
import { createContext } from "react";
import request from "../functions/request";

class NotesStore {
  highlights = [];
  tags = [];
  latestBooks = [];
  amount = 3;
  email = null;
  uid = null;
  token = null;

  constructor() {
    makeObservable(this, {
      highlights: observable,
      tags: observable,
      email: observable,
      uid: observable,
      token: observable,
      latestBooks: observable,
      amount: observable,
      fetchHighlights: flow,
      fetchInitInfo: flow,
      init: flow,
      register: flow,
      setEmail: action,
      setToken: action,
      setUid: action,
      setTags: action,
      setLatestBooks: action,
      setAmount: action,
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

  *init(email, uid) {
    try {
      this.setEmail(email);
      this.setUid(uid);
      const token = yield request(
        "http://192.168.1.70:3000/api/login",
        "POST",
        "",
        { email, uid }
      );
      console.log("success login ", token);
      this.setToken(token);
      yield this.fetchInitInfo();
    } catch (error) {
      console.log("error login ", error);
      yield this.register();
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

  setToken(value) {
    this.token = value;
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
}

export const NotesStoreContext = createContext(new NotesStore());
