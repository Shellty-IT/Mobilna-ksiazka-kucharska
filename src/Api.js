import { database } from "./firebase/firebaseIndex";
import { ref, get } from "firebase/database";

export async function getVegetables() {
    const snapshot = await get(ref(database, "vegetables"));
    let vegetables = [];
    snapshot.forEach((veg) => {
        vegetables.push(veg.val());
    });
    return vegetables;
}

export async function getPasta() {
    const snapshot = await get(ref(database, "pasta"));
    let pasta = [];
    snapshot.forEach((pas) => {
        pasta.push(pas.val());
    });
    return pasta;
}

export async function getVarious() {
    const snapshot = await get(ref(database, "other"));
    let various = [];
    snapshot.forEach((vario) => {
        various.push(vario.val());
    });
    return various;
}

export async function getRecipes() {
    const snapshot = await get(ref(database, "recipes"));
    let recipes = [];
    snapshot.forEach((recipe) => {
        recipes.push(recipe.val());
    });
    return recipes;
}

export async function getGroats() {
    const snapshot = await get(ref(database, "groats"));
    let groats = [];
    snapshot.forEach((groat) => {
        groats.push(groat.val());
    });
    return groats;
}