import { auth } from "./firebaseIndex";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
} from "firebase/auth";

export const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = () => {
    return firebaseSignOut(auth);
};

export const attachAuthListener = (callback) => {
    return onAuthStateChanged(auth, callback);
};