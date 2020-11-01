import { makeObservable, observable, action, flow } from "mobx";
import { createContext } from "react";
import request from "../functions/request";

class NotesStore {
  highlights = [];
  amount = 3;
  email = null;

  constructor() {
    makeObservable(this, {
      highlights: observable,
      amount: observable,
      fetchHighlights: flow,
      init: flow,
      setEmail: action,
    });
  }

  *fetchHighlights() {
    try {
      console.log(this.email);
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
    } catch (error) {
      console.log(error);
    }
  }

  setEmail(value) {
    this.email = value;
  }
}

export const NotesStoreContext = createContext(new NotesStore());
