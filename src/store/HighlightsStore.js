import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import request from "../functions/request";

class HighlightsStore {
  highlights = [];

  async fetchHighlights() {
    try {
      const amount = 3;
      const notes = await request(
        `http://192.168.1.70:3000/api/getDailyNotes?amount=${amount}`
      );
      this.highlights.push(...notes);
    } catch (e) {
      console.log("error", e);
    }
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const HighlightsStoreContext = createContext(new HighlightsStore());
