import { makeObservable, observable, action, flow } from "mobx";
import { createContext } from "react";
import request from "../functions/request";

class NotesStore {
  highlights = [];
  tags = [];
  latestBooks = [];
  amount = 3;
  email = null;

  constructor() {
    makeObservable(this, {
      highlights: observable,
      tags: observable,
      latestBooks: observable,
      amount: observable,
      fetchHighlights: flow,
      init: flow,
      setEmail: action,
      setTags: action,
      setLatestBooks: action,
      setAmount: action,
    });
  }

  *fetchHighlights() {
    try {
      const notes = yield request(
        `http://192.168.1.70:3000/api/getDailyNotes?id=1`
      );
      this.highlights = [...notes];
    } catch (e) {
      console.log("error", e);
    }
  }

  *init(email) {
    try {
      this.setEmail(email);
      const initInfo = yield request(
        `http://192.168.1.70:3000/api/getInitInfo?id=1`
      );
      this.setTags(initInfo.tags);
      this.setLatestBooks(initInfo.latestBooks);
      this.setAmount(initInfo.accountInfo.review_amount);
    } catch (error) {
      console.log(error);
    }
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
