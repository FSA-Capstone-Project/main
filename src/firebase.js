import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrm2kGPbSJTZHvojguqkPoOtd14le5fIQ",
  authDomain: "capstone-52b3b.firebaseapp.com",
  projectId: "capstone-52b3b",
  storageBucket: "capstone-52b3b.appspot.com",
  messagingSenderId: "265352253155",
  appId: "1:265352253155:web:bf87052c1ca9892c0cffd6"
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {app, db, auth };
