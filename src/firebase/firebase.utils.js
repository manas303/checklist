// firebase.utils.js
import firebase from 'firebase/app';
import 'firebase/auth';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyBGa7M5eZUII5MjLfh7hYaVLwAfKcr4s1w",
  authDomain: "checklist-e85cb.firebaseapp.com",
  projectId: "checklist-e85cb",
  storageBucket: "checklist-e85cb.appspot.com",
  messagingSenderId: "678034943622",
  appId: "1:678034943622:web:82d0bd27a9c8965701ab07",
  measurementId: "G-4RPXGSFQGH"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

