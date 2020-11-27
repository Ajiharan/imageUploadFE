import firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAeh5qhOVPvTB9aKuljuUcKcGJqGVpnSpY",
  authDomain: "image-upload-project-37372.firebaseapp.com",
  databaseURL: "https://image-upload-project-37372.firebaseio.com",
  projectId: "image-upload-project-37372",
  storageBucket: "image-upload-project-37372.appspot.com",
  messagingSenderId: "177290148903",
  appId: "1:177290148903:web:5e023b28849005d5af6202",
  measurementId: "G-MGZQTTLHTH",
});

const db = firebaseConfig.firestore();
const auth = firebaseConfig.auth();
const storage = firebaseConfig.storage();
export { db, auth, storage };
