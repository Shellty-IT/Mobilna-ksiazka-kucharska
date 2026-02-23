import { auth } from "../firebase/firebaseIndex";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
} from "firebase/auth";

// Nie potrzeba initialize() - app inicjalizuje się przy imporcie

export function attachAuthListener(handler) {
    return onAuthStateChanged(auth, (user) => {
        handler(user);
    });
}

export async function createNewUser(email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
}

export async function signIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
}

export async function signOut() {
    await firebaseSignOut(auth);
}