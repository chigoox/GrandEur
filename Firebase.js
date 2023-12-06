// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6o29YRPd_6GAVcilUrLcWty4jG3IWdrI",
  authDomain: "humaindeur.firebaseapp.com",
  projectId: "humaindeur",
  storageBucket: "humaindeur.appspot.com",
  messagingSenderId: "287267657085",
  appId: "1:287267657085:web:984a5dff49f9620137a814",
  measurementId: "G-V7CWDK0L07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const DATABASE = getFirestore(app);
const AUTH = getAuth(app)
const STORAGE = getStorage(app)


export default app
export { AUTH, DATABASE, STORAGE };

