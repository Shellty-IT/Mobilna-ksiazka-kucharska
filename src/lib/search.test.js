import { describe, expect, it } from "vitest";
import { filterRecipesByName, findRecipesByIngredients, normalizeText } from "./search";

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
});
