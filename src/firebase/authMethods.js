import { auth } from "./firebaseIndex";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";

export const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const authMethods = {
    signup: async (email, password, setToken, setErrors) => {
        alert("Funkcja signup wywołana dla: " + email);

        try {
            console.log("Próba rejestracji:", email);
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const token = await res.user.getIdToken();
            setToken(token);
            alert("Sukces! Konto utworzone"); // DODAJ
            console.log("Konto utworzone:", res.user.email);
        } catch (err) {
            alert("BŁĄD: " + err.code + " - " + err.message); // DODAJ
            console.error("Kod błędu:", err.code);
            console.error("Treść błędu:", err.message);
            setErrors((prev) => [...prev, err.message]);
        }
    },

    signin: async (email, password, setToken, setErrors) => {
        try {
            console.log("Próba logowania:", email);
            const res = await signInWithEmailAndPassword(auth, email, password);
            const token = await res.user.getIdToken();
            setToken(token);
            console.log("Zalogowano:", res.user.email);
        } catch (err) {
            console.error("Kod błędu:", err.code);
            console.error("Treść błędu:", err.message);
            setErrors((prev) => [...prev, err.message]);
        }
    },
};