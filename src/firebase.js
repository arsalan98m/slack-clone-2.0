import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBW83GLZWId5VhJdEUzc6Wa5Gjj-68aRf4",
  authDomain: "slack-clone-b7411.firebaseapp.com",
  projectId: "slack-clone-b7411",
  storageBucket: "slack-clone-b7411.appspot.com",
  messagingSenderId: "317684663308",
  appId: "1:317684663308:web:d6685ab47012606f575a29",
  measurementId: "G-6MLEEXEL93",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
