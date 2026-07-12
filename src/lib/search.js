const ingredientDefinitions = [
  ["baklazan", "Bakłażan", "warzywa"],
  ["brokul", "Brokuł", "warzywa"],
  ["cebula", "Cebula", "warzywa"],
  ["cukinia", "Cukinia", "warzywa"],
  ["czosnek", "Czosnek", "warzywa"],
  ["fasola", "Fasola", "strączki"],
  ["fasola czerwona", "Fasola czerwona", "strączki"],
  ["groszek zielony", "Groszek zielony", "warzywa"],
  ["kalafior", "Kalafior", "warzywa"],
  ["koperek", "Koperek", "zioła i dodatki"],
  ["kukurydza", "Kukurydza", "warzywa"],
  ["marchew", "Marchew", "warzywa", ["marchewka"]],
  ["natka pietruszki", "Natka pietruszki", "zioła i dodatki"],
  ["ogorek", "Ogórek", "warzywa"],
  ["ogorek kiszony", "Ogórek kiszony", "warzywa"],
  ["oliwki", "Oliwki", "warzywa"],
  ["papryka", "Papryka", "warzywa"],
  ["pieczarki", "Pieczarki", "warzywa"],
  ["pieczarki marynowane", "Pieczarki marynowane", "warzywa"],
  ["pomidor", "Pomidor", "warzywa", ["pomidory"]],
  ["pomidorki", "Pomidorki koktajlowe", "warzywa"],
  ["pomidory z puszki", "Pomidory z puszki", "warzywa"],
  ["rukola", "Rukola", "warzywa"],
  ["salata", "Sałata", "warzywa"],
  ["szpinak", "Szpinak", "warzywa"],
  ["ziemniaki", "Ziemniaki", "warzywa"],
  ["ciecierzyca", "Ciecierzyca", "strączki"],
  ["soczewica", "Soczewica", "strączki"],
  ["tofu", "Tofu", "strączki"],
  ["boczek", "Boczek", "mięso i ryby"],
  ["kurczak", "Pierś z kurczaka", "mięso i ryby"],
  ["losos", "Łosoś", "mięso i ryby"],
  ["mielone", "Mięso mielone", "mięso i ryby"],
  ["parowki", "Parówki", "mięso i ryby"],
  ["szynka", "Szynka", "mięso i ryby"],
  ["wieprzowina", "Wieprzowina", "mięso i ryby"],
  ["wolowina", "Wołowina", "mięso i ryby"],
  ["jajka", "Jajka", "nabiał"],
  ["jogurt naturalny", "Jogurt naturalny", "nabiał"],
  ["maslo", "Masło", "nabiał"],
  ["mleko", "Mleko", "nabiał"],
  ["mozzarella", "Mozzarella", "nabiał"],
  ["ser feta", "Ser feta", "nabiał"],
  ["ser parmezan", "Parmezan", "nabiał"],
  ["ser zolty", "Ser żółty", "nabiał"],
  ["smietana", "Śmietana", "nabiał", ["smietanka"]],
  ["twarog", "Twaróg", "nabiał"],
  ["bulka tarta", "Bułka tarta", "spiżarnia"],
  ["cukier", "Cukier", "spiżarnia"],
  ["drozdze", "Drożdże", "spiżarnia"],
  ["jablka", "Jabłka", "owoce"],
  ["kasza jaglana", "Kasza jaglana", "spiżarnia"],
  ["ketchup", "Ketchup", "sosy"],
  ["majonez", "Majonez", "sosy"],
  ["maka pszenna", "Mąka pszenna", "spiżarnia"],
  ["maka ziemniaczana", "Mąka ziemniaczana", "spiżarnia"],
  ["makaron", "Makaron", "spiżarnia"],
  ["miod", "Miód", "spiżarnia"],
  ["ocet balsamiczny", "Ocet balsamiczny", "spiżarnia"],
  ["oliwa", "Oliwa", "spiżarnia", ["oliwa z oliwek"]],
  ["ryz", "Ryż", "spiżarnia"],
  ["sok z cytryny", "Sok z cytryny", "owoce"],
  ["sos czosnkowy", "Sos czosnkowy", "sosy"],
  ["sos pomidorowy", "Sos pomidorowy", "sosy"],
  ["sos serowy", "Sos serowy", "sosy"],
  ["sos sojowy", "Sos sojowy", "sosy"],
  ["sos tzaziki", "Sos tzatziki", "sosy", ["sos tzatziki"]],
  ["sos winegret", "Sos winegret", "sosy"],
];

export function normalizeText(value = "") {
  return String(value)
    .toLocaleLowerCase("pl-PL")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function splitIdentifier(value) {
  return String(value)
    .trim()
    .replace(/([a-ząćęłńóśźż])([A-ZĄĆĘŁŃÓŚŹŻ])/g, "$1 $2")
    .replace(/([A-ZĄĆĘŁŃÓŚŹŻ])([A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż])/g, "$1 $2");
}

const definitions = ingredientDefinitions.map(([id, label, category, aliases = []]) => ({
  id: normalizeText(id),
  label,
  category,
  aliases,
}));
const definitionById = new Map(definitions.map((ingredient) => [ingredient.id, ingredient]));
const canonicalAliases = new Map();

definitions.forEach((ingredient) => {
  [ingredient.id, ingredient.label, ...ingredient.aliases].forEach((alias) => {
    canonicalAliases.set(normalizeText(splitIdentifier(alias)), ingredient.id);
  });
});

export function canonicalIngredient(value) {
  const normalized = normalizeText(splitIdentifier(value));
  return canonicalAliases.get(normalized) || normalized;
}

export function formatIngredient(value) {
  const key = canonicalIngredient(value);
  const known = definitionById.get(key);
  if (known) return known.label;
  const readable = splitIdentifier(value).trim();
  return readable ? `${readable.charAt(0).toLocaleUpperCase("pl-PL")}${readable.slice(1)}` : "";
}

function inferCategory(key) {
  if (/sos|majonez|ketchup/.test(key)) return "sosy";
  return "pozostałe";
}

export function buildIngredientCatalog(recipes = []) {
  const rawByKey = new Map();
  recipes.forEach((recipe) => {
    (recipe.ingredients || []).forEach((ingredient) => {
      const key = canonicalIngredient(ingredient);
      if (key && !rawByKey.has(key)) rawByKey.set(key, ingredient);
    });
  });

  return [...rawByKey.entries()]
    .map(([id, raw]) => {
      const known = definitionById.get(id);
      const label = known?.label || formatIngredient(raw);
      const aliases = known?.aliases || [];
      return {
        id,
        label,
        category: known?.category || inferCategory(id),
        searchable: normalizeText([label, id, ...aliases].join(" ")),
      };
    })
    .sort((left, right) => left.label.localeCompare(right.label, "pl"));
}

export const ingredientCatalog = definitions.map((ingredient) => ({
  ...ingredient,
  searchable: normalizeText([ingredient.label, ingredient.id, ...ingredient.aliases].join(" ")),
}));

export function filterIngredients(ingredients, query) {
  const terms = normalizeText(query).split(" ").filter(Boolean);
  if (!terms.length) return ingredients;
  return ingredients.filter((ingredient) => terms.every((term) => ingredient.searchable.includes(term)));
}

function createIndexedRecipe(recipe) {
  const entries = [];
  const known = new Set();
  (recipe.ingredients || []).forEach((ingredient) => {
    const key = canonicalIngredient(ingredient);
    if (!key || known.has(key)) return;
    known.add(key);
    entries.push({ key, label: formatIngredient(ingredient) });
  });
  return {
    recipe,
    entries,
    ingredientKeys: known,
    searchableName: normalizeText(recipe.name),
  };
}

export function createRecipeSearchIndex(recipes = []) {
  return recipes.map(createIndexedRecipe);
}

function scoreRecipe(indexedRecipe, selectedKeys) {
  const matchedEntries = indexedRecipe.entries.filter(({ key }) => selectedKeys.has(key));
  const missingEntries = indexedRecipe.entries.filter(({ key }) => !selectedKeys.has(key));
  const availableRatio = indexedRecipe.entries.length ? matchedEntries.length / indexedRecipe.entries.length : 0;
  const selectedRatio = selectedKeys.size ? matchedEntries.length / selectedKeys.size : 0;
  const breadth = Math.min(matchedEntries.length / 3, 1);
  const score = missingEntries.length === 0
    ? 100
    : Math.round((availableRatio * 0.72 + breadth * 0.2 + selectedRatio * 0.08) * 100);

  return {
    recipe: indexedRecipe.recipe,
    score,
    status: missingEntries.length === 0 ? "ready" : missingEntries.length <= 2 ? "close" : "ideas",
    matchedIngredients: matchedEntries.map(({ label }) => label),
    missingIngredients: missingEntries.map(({ label }) => label),
  };
}

export function findRecipesByIngredients(recipesOrIndex, selectedIngredients, { maxMissing = Infinity } = {}) {
  const selectedKeys = new Set(selectedIngredients.map(canonicalIngredient).filter(Boolean));
  if (!selectedKeys.size) return [];
  const index = recipesOrIndex.map((item) => item?.ingredientKeys instanceof Set ? item : createIndexedRecipe(item));

  return index
    .map((recipe) => scoreRecipe(recipe, selectedKeys))
    .filter((result) => result.matchedIngredients.length > 0 && result.missingIngredients.length <= maxMissing)
    .sort((left, right) =>
      right.score - left.score
      || left.missingIngredients.length - right.missingIngredients.length
      || right.matchedIngredients.length - left.matchedIngredients.length
      || left.recipe.name.localeCompare(right.recipe.name, "pl"),
    );
}

function isNearMatch(word, query) {
  if (word.includes(query)) return true;
  if (query.length < 4 || Math.abs(word.length - query.length) > 1) return false;
  if (word.length === query.length) {
    const differences = [...word].map((character, index) => character === query[index] ? -1 : index).filter((index) => index >= 0);
    if (differences.length === 2) {
      const [first, second] = differences;
      if (second === first + 1 && word[first] === query[second] && word[second] === query[first]) return true;
    }
  }
  let edits = 0;
  let wordIndex = 0;
  let queryIndex = 0;
  while (wordIndex < word.length && queryIndex < query.length) {
    if (word[wordIndex] === query[queryIndex]) {
      wordIndex += 1;
      queryIndex += 1;
    } else if (++edits > 1) {
      return false;
    } else if (word.length > query.length) {
      wordIndex += 1;
    } else if (query.length > word.length) {
      queryIndex += 1;
    } else {
      wordIndex += 1;
      queryIndex += 1;
    }
  }
  return edits + (wordIndex < word.length || queryIndex < query.length ? 1 : 0) <= 1;
}

export function filterRecipesByName(recipes, query) {
  const terms = normalizeText(query).split(" ").filter(Boolean);
  if (!terms.length) return recipes;
  return recipes.filter((recipe) => {
    const name = normalizeText(recipe.name);
    const words = name.split(" ");
    return terms.every((term) => name.includes(term) || words.some((word) => isNearMatch(word, term)));
  });
}
