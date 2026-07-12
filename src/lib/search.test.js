import { describe, expect, it } from "vitest";
import sampleData from "../example.json";
import { extraRecipes } from "../data/recipeExtensions";
import {
  buildIngredientCatalog,
  canonicalIngredient,
  createRecipeSearchIndex,
  filterRecipesByName,
  findRecipesByIngredients,
  normalizeText,
} from "./search";

const recipes = [
  { id: "1", name: "Makaron z brokułem", ingredients: ["Brokul", "Czosnek", "MakaPszenna"] },
  { id: "2", name: "Omlet warzywny", ingredients: ["Jajka", "Papryka"] },
];

describe("ingredient search", () => {
  it("normalizes Polish characters", () => {
    expect(normalizeText("Mąka  pszenna!")).toBe("maka pszenna");
  });

  it("ranks recipes by ingredient coverage", () => {
    const results = findRecipesByIngredients(recipes, ["Brokul", "Czosnek"]);
    expect(results[0].recipe.id).toBe("1");
    expect(results[0].score).toBeGreaterThan(0);
  });

  it("reports missing ingredients and supports a missing-item limit", () => {
    const [result] = findRecipesByIngredients(recipes, ["Brokul"], { maxMissing: 2 });
    expect(result.missingIngredients).toContain("Czosnek");
    expect(findRecipesByIngredients(recipes, ["Brokul"], { maxMissing: 1 })).toHaveLength(0);
  });

  it("formats compact ingredient identifiers for display", () => {
    const [{ missingIngredients }] = findRecipesByIngredients(
      [{ id: "3", name: "Makaron", ingredients: ["Brokul", "SosSerowy"] }],
      ["Brokul"],
    );
    expect(missingIngredients).toContain("Sos serowy");
  });

  it("filters recipes by normalized name", () => {
    expect(filterRecipesByName(recipes, "BROKUL")).toHaveLength(1);
  });

  it("merges spelling variants into one canonical ingredient", () => {
    expect(canonicalIngredient("Ryż")).toBe(canonicalIngredient("Ryz"));
    expect(canonicalIngredient("Sos serowy")).toBe(canonicalIngredient("SosSerowy"));
    const catalog = buildIngredientCatalog([{ ingredients: ["Ryż", "Ryz", "SosSerowy"] }]);
    expect(catalog.filter(({ label }) => label === "Ryż")).toHaveLength(1);
  });

  it("gives a complete recipe a ready status and perfect score", () => {
    const index = createRecipeSearchIndex(recipes);
    const [result] = findRecipesByIngredients(index, ["Jajka", "Papryka"]);
    expect(result.recipe.id).toBe("2");
    expect(result.status).toBe("ready");
    expect(result.score).toBe(100);
  });

  it("tolerates a single typo in a recipe-name query", () => {
    expect(filterRecipesByName(recipes, "omelt")).toHaveLength(1);
  });

  it("builds a unique filter catalogue for every local recipe ingredient", () => {
    const localRecipes = [...sampleData.recipes, ...extraRecipes];
    const catalog = buildIngredientCatalog(localRecipes);
    expect(localRecipes).toHaveLength(71);
    expect(new Set(catalog.map(({ id }) => id)).size).toBe(catalog.length);
    localRecipes.flatMap(({ ingredients }) => ingredients).forEach((ingredient) => {
      expect(catalog.some(({ id }) => id === canonicalIngredient(ingredient))).toBe(true);
    });
  });
});
