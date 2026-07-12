const polishCharacters = {
  ą: "a", ć: "c", ę: "e", ł: "l", ń: "n", ó: "o", ś: "s", ź: "z", ż: "z",
};

export function normalizeText(value = "") {
  return String(value)
    .toLocaleLowerCase("pl-PL")
    .replace(/[ąćęłńóśźż]/g, (character) => polishCharacters[character])
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export const ingredientCatalog = [
  ["Brokul", "Brokuł", "warzywa"], ["Papryka", "Papryka", "warzywa"], ["Czosnek", "Czosnek", "warzywa"],
  ["Cebula", "Cebula", "warzywa"], ["PomidoryZpuszki", "Pomidory z puszki", "warzywa"], ["Cukinia", "Cukinia", "warzywa"],
  ["Marchew", "Marchew", "warzywa"], ["Ziemniaki", "Ziemniaki", "warzywa"], ["Kukurydza", "Kukurydza", "warzywa"],
  ["FasolaCzerwona", "Fasola czerwona", "warzywa"], ["Kurczak", "Pierś z kurczaka", "mięso"],
  ["Wolowina", "Wołowina", "mięso"], ["Wieprzowina", "Wieprzowina", "mięso"], ["Mielone", "Mięso mielone", "mięso"],
  ["Jajka", "Jajka", "nabiał i dodatki"], ["SerZolty", "Ser żółty", "nabiał i dodatki"],
  ["MakaPszenna", "Mąka pszenna", "nabiał i dodatki"], ["MakaZiemniaczana", "Mąka ziemniaczana", "nabiał i dodatki"],
  ["Twarog", "Twaróg", "nabiał i dodatki"], ["SerFeta", "Ser feta", "nabiał i dodatki"],
  ["Smietanka", "Śmietanka", "nabiał i dodatki"], ["SosSerowy", "Sos serowy", "nabiał i dodatki"],
  ["Mozzarella", "Mozzarella", "nabiał i dodatki"], ["SerParmezan", "Parmezan", "nabiał i dodatki"],
  ["Makaron", "Makaron", "spiżarnia"], ["Ryż", "Ryż", "spiżarnia"], ["Ciecierzyca", "Ciecierzyca", "spiżarnia"],
  ["Soczewica", "Soczewica", "spiżarnia"], ["Pieczarki", "Pieczarki", "warzywa"], ["Szpinak", "Szpinak", "warzywa"],
  ["Pomidorki", "Pomidorki", "warzywa"], ["Ogorek", "Ogórek", "warzywa"], ["Rukola", "Rukola", "warzywa"],
  ["Bazylia", "Bazylia", "warzywa"], ["Oliwa", "Oliwa", "spiżarnia"], ["Tofu", "Tofu", "roślinne"],
].map(([id, label, category]) => ({ id, label, category, normalized: normalizeText(id) }));

const ingredientLabels = new Map(ingredientCatalog.map((ingredient) => [ingredient.id, ingredient.label]));
const ingredientAliases = new Map([
  ["SosSerowy", "Sos serowy"],
  ["Smietanka", "Śmietanka"],
]);

function formatIngredient(ingredient) {
  return ingredientLabels.get(ingredient)
    || ingredientAliases.get(ingredient)
    || String(ingredient).replace(/([a-ząćęłńóśźż])([A-Z])/g, "$1 $2");
}

function scoreRecipe(recipe, selected) {
  const recipeIngredients = new Set((recipe.ingredients || []).map(normalizeText));
  const matched = selected.filter((ingredient) => recipeIngredients.has(normalizeText(ingredient)));
  const missing = (recipe.ingredients || []).filter((ingredient) => !selected.some((selectedIngredient) => normalizeText(selectedIngredient) === normalizeText(ingredient)));
  const coverage = selected.length ? matched.length / selected.length : 0;
  const recipeCoverage = recipeIngredients.size ? matched.length / recipeIngredients.size : 0;
  const score = Math.round((coverage * 0.7 + recipeCoverage * 0.3) * 100);

  return {
    recipe,
    score,
    matchedIngredients: matched.map(formatIngredient),
    missingIngredients: missing.map(formatIngredient),
  };
}

export function findRecipesByIngredients(recipes, selectedIngredients, { maxMissing = Infinity } = {}) {
  const selected = [...new Set(selectedIngredients)];
  if (!selected.length) return [];

  return recipes
    .map((recipe) => scoreRecipe(recipe, selected))
    .filter((result) => result.matchedIngredients.length > 0 && result.missingIngredients.length <= maxMissing)
    .sort((left, right) =>
      right.score - left.score ||
      right.matchedIngredients.length - left.matchedIngredients.length ||
      left.missingIngredients.length - right.missingIngredients.length ||
      left.recipe.name.localeCompare(right.recipe.name, "pl"),
    );
}

export function filterRecipesByName(recipes, query) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return recipes;
  return recipes.filter((recipe) => normalizeText(recipe.name).includes(normalizedQuery));
}
