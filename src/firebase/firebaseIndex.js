import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBtwnJGffDi1J-YBrPWlU0aMjknVQpIVuc",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "pomocnik-cc6da.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "pomocnik-cc6da",
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://pomocnik-cc6da-default-rtdb.firebaseio.com",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "pomocnik-cc6da.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "379679255811",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:379679255811:web:530dc719262d7e7f8d8d36",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
