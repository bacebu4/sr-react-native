import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import request from "../functions/request";
import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { differenceInCalendarDays } from "date-fns/esm";
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

  *init() {
    this.setLoading(true);
    console.log(BACKEND_URL, "hey");
    try {
      const available = yield SecureStore.isAvailableAsync();
      if (available) {
        const token = yield SecureStore.getItemAsync("token");
        if (token) {
          console.log("avail token");

          this.setToken(token);
          this.setLogged(true);
          yield this.fetchInitInfo();
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      this.setLogged(false);
      this.setLoading(false);
      console.log("token was not foundd");
    }
  }

  *login(email, password) {
    try {
      console.log(BACKEND_URL);
      this.setLoginLoading(true);
      this.setEmail(email);
      const token = yield request(`${BACKEND_URL}/api/login`, "POST", "", {
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
      console.log(BACKEND_URL);
      this.setLoginLoading(true);
      const token = yield request(`${BACKEND_URL}/api/register`, "POST", "", {
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
        `${BACKEND_URL}/api/getInitInfo?id=1`,
        "GET",
        this.token
      );
      console.log("latestReviewDate", initInfo.latestReviewDate);

      const daysPast = differenceInCalendarDays(
        Date.now(),
        new Date(initInfo.latestReviewDate).getTime()
      );

      const streak = differenceInCalendarDays(
        new Date(initInfo.latestReviewDate).getTime(),
        new Date(initInfo.streakBeginningDate).getTime()
      );

      initInfo.accountInfo.missed = 0;
      initInfo.accountInfo.current = 0;
      initInfo.accountInfo.streak = streak;
      console.log("daysPast", daysPast);
      console.log("streak", streak);

      switch (daysPast) {
        case 0:
          initInfo.accountInfo.reviewed = true;
          break;

        case 1:
          initInfo.accountInfo.reviewed = false;
          break;

        default:
          initInfo.accountInfo.reviewed = false;
          initInfo.accountInfo.missed = daysPast - 1;
          break;
      }
      this.setTags(initInfo.tags);
      this.setLatestBooks(initInfo.latestBooks);
      this.setAmount(initInfo.accountInfo.review_amount);
      this.info = initInfo.accountInfo;
    } catch (error) {
      console.log("error fetching init", error);
    } finally {
      this.setLoading(false);
    }
  }

  *logout() {
    this.setLogged(false);
    this.setToken(null);
    yield SecureStore.deleteItemAsync("token");
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
