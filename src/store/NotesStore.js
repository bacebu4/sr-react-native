import {
  makeAutoObservable,
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from "mobx";
import { createContext } from "react";
import request from "../functions/request";

class NotesStore {
  highlights = [];

  constructor() {
    // makeAutoObservable(this);
    makeObservable(this, {
      highlights: observable,
      fetchHighlights: action,
    });
  }

  async fetchHighlights() {
    try {
      const amount = 3;
      const notes = await request(
        `http://192.168.1.70:3000/api/getDailyNotes?amount=${amount}`
      );
      this.highlights = [...notes];
    } catch (e) {
      console.log("error", e);
    }
  }
}

export const NotesStoreContext = createContext(new NotesStore());
