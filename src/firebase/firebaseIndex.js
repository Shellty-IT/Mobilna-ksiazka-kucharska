import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBtwnJGffDi1J-YBrPWlU0aMjknVQpIVuc",
    authDomain: "pomocnik-cc6da.firebaseapp.com",
    projectId: "pomocnik-cc6da",
    storageBucket: "pomocnik-cc6da.appspot.com",
    messagingSenderId: "379679255811",
    appId: "1:379679255811:web:530dc719262d7e7f8d8d36"
};

console.log("=== Inicjalizuję Firebase ==="); // DODAJ

let app;
let auth;
let database;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    database = getDatabase(app);
    console.log("=== Firebase zainicjalizowany POMYŚLNIE ==="); // DODAJ
    console.log("Auth:", auth); // DODAJ
} catch (error) {
    console.error("=== BŁĄD INICJALIZACJI FIREBASE ===", error); // DODAJ
}

export { auth, database };