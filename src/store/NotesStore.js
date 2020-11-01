import { makeObservable, observable, action, flow } from "mobx";
import { createContext } from "react";
import request from "../functions/request";

class NotesStore {
  highlights = [];
  amount = 3;

  constructor() {
    makeObservable(this, {
      highlights: observable,
      amount: observable,
      fetchHighlights: flow,
      init: flow,
    });
  }

  *fetchHighlights() {
    try {
      const amount = 3;
      const notes = yield request(
        `http://192.168.1.70:3000/api/getDailyNotes?amount=${amount}`
      );
      this.highlights = [...notes];
    } catch (e) {
      console.log("error", e);
    }
  }

  *init(email) {
    try {
      console.log(email);
    } catch (error) {
      console.log(error);
    }
  }
}

export const NotesStoreContext = createContext(new NotesStore());
