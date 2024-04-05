// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbdtyvYpmXZGHXpWnVQ763wZGsOJY9tos",
  authDomain: "auth-email-password-ec680.firebaseapp.com",
  projectId: "auth-email-password-ec680",
  storageBucket: "auth-email-password-ec680.appspot.com",
  messagingSenderId: "334270430695",
  appId: "1:334270430695:web:d038551bf7b114022ed142"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;