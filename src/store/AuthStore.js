import { makeObservable, observable, action, flow } from "mobx";
import { createContext } from "react";
import { FIREBASE_API } from "@env";
import firebase from "firebase";

class AuthStore {
  isLoading = true;
  isLoginLoading = false;
  isLogged = false;
  firebaseAuth = null;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      isLogged: observable,
      isLoginLoading: observable,
      firebaseAuth: observable,
      setLoading: action,
      setLogged: action,
      initFirebase: action,
      handleAuthStateChange: action,
      loginUser: flow,
      setLoginLoading: action,
      logoutUser: flow,
    });
  }

  setLoading(value) {
    this.isLoading = value;
  }

  setLoginLoading(value) {
    this.isLoginLoading = value;
  }

  setLogged(value) {
    this.isLogged = value;
  }

  initFirebase() {
    this.setLoading(true);
    if (!firebase.apps.length) {
      const apiKey = FIREBASE_API;
      const firebaseConfig = {
        apiKey,
        authDomain: "saferead-48509.firebaseapp.com",
        databaseURL: "https://saferead-48509.firebaseio.com",
        projectId: "saferead-48509",
        storageBucket: "saferead-48509.appspot.com",
        messagingSenderId: "573287991778",
        appId: "1:573287991778:web:639f72a2184fd0013c51bb",
      };

      const firebaseApp = firebase.initializeApp(firebaseConfig);
      this.firebaseAuth = firebaseApp.auth();
      this.handleAuthStateChange();
    } else {
      this.setLoading(false);
    }
  }

  handleAuthStateChange() {
    this.firebaseAuth.onAuthStateChanged((user) => {
      this.setLoading(true);
      if (user) {
        this.setLogged(true);
      } else {
        this.setLogged(false);
      }
      this.setLoading(false);
    });
  }

  *loginUser(payload) {
    try {
      this.setLoginLoading(true);
      yield this.firebaseAuth.signInWithEmailAndPassword(
        payload.email,
        payload.password
      );
    } catch (error) {
      console.log("error", error.message);
    } finally {
      this.setLoginLoading(false);
    }
  }

  *logoutUser() {
    try {
      this.setLoginLoading(true);
      yield firebase.auth().signOut();
    } catch (error) {
      console.log("error", error.message);
    } finally {
      this.setLoginLoading(false);
    }
  }
}

export const AuthStoreContext = createContext(new AuthStore());
