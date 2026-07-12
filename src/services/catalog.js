import { get, ref } from "firebase/database";
import sampleData from "../example.json";
import { database } from "../firebase/firebaseIndex";

const cache = new Map();

function toList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return Object.values(value || {});
}

function withId(item) {
  return { ...item, id: String(item.id ?? item.number ?? item.name) };
}

async function readCollection(path) {
  if (cache.has(path)) return cache.get(path);

  const request = get(ref(database, path))
    .then((snapshot) => snapshot.exists() ? toList(snapshot.val()).map(withId) : [])
    .catch(() => toList(sampleData[path]).map(withId));

  cache.set(path, request);
  return request;
}

export const getRecipes = () => readCollection("recipes");
export const getProducts = (category) => readCollection(category);
export const getAllProducts = async () => {
  const categories = ["vegetables", "pasta", "groats", "other"];
  const data = await Promise.all(categories.map(async (category) => [category, await getProducts(category)]));
  return Object.fromEntries(data);
};
export const getRecipe = async (id) => (await getRecipes()).find((recipe) => recipe.id === String(id));
export const getProduct = async (category, id) => (await getProducts(category)).find((product) => product.id === String(id));
