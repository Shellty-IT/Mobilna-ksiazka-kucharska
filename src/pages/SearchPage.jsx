import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ErrorState, Loading } from "../components/Feedback";
import {
  buildIngredientCatalog,
  createRecipeSearchIndex,
  filterIngredients,
  filterRecipesByName,
  findRecipesByIngredients,
} from "../lib/search";
import { getRecipes } from "../services/catalog";
import { useCatalog } from "../hooks/useCatalog";

const categoryOrder = ["warzywa", "strączki", "mięso i ryby", "nabiał", "spiżarnia", "sosy", "zioła i dodatki", "owoce", "pozostałe"];
const matchModes = {
  ready: { label: "Mogę ugotować teraz", maxMissing: 0 },
  close: { label: "Brakuje maks. 3", maxMissing: 3 },
  ideas: { label: "Pokaż wszystkie pomysły", maxMissing: Infinity },
};
const statusLabels = {
  ready: "Masz wszystko",
  close: "Prawie gotowe",
  ideas: "Pomysł do uzupełnienia",
};

function RecipeCard({ result }) {
  const { recipe, score, status, matchedIngredients, missingIngredients } = result;
  return (
    <article className="recipe-card">
      <div className="recipe-card-top">
        <span className={`score score-${status || "name"}`}>
          {score === null ? "Dopasowanie nazwy" : statusLabels[status]}
        </span>
        <span className="recipe-index" aria-label={`Numer przepisu ${recipe.number}`}>
          {String(recipe.number ?? recipe.id).padStart(2, "0")}
        </span>
      </div>
      <h3>{recipe.name}</h3>
      {score !== null && <div className="match-meter" aria-label={`${score}% dopasowania`}><span style={{ width: `${score}%` }} /></div>}
      {matchedIngredients.length > 0 && <p className="match-line"><b>Masz:</b> {matchedIngredients.join(", ")}</p>}
      {missingIngredients.length > 0 && (
        <p className="missing-line"><b>Do uzupełnienia:</b> {missingIngredients.slice(0, 3).join(", ")}{missingIngredients.length > 3 ? ` +${missingIngredients.length - 3}` : ""}</p>
      )}
      <Link to={`/przepisy/${recipe.id}`} aria-label={`Zobacz przepis: ${recipe.name}`}>Zobacz przepis <span aria-hidden="true">→</span></Link>
    </article>
  );
}

export function SearchPage() {
  const { data: recipes, error, loading } = useCatalog(getRecipes, []);
  const [selected, setSelected] = useState([]);
  const [matchMode, setMatchMode] = useState("ideas");
  const [ingredientQuery, setIngredientQuery] = useState("");
  const [recipeQuery, setRecipeQuery] = useState("");
  const catalog = useMemo(() => buildIngredientCatalog(recipes || []), [recipes]);
  const recipeIndex = useMemo(() => createRecipeSearchIndex(recipes || []), [recipes]);
  const visibleIngredients = useMemo(() => filterIngredients(catalog, ingredientQuery), [catalog, ingredientQuery]);
  const categories = useMemo(() => [...new Set(visibleIngredients.map(({ category }) => category))]
    .sort((left, right) => categoryOrder.indexOf(left) - categoryOrder.indexOf(right)), [visibleIngredients]);
  const selectedIngredients = useMemo(() => selected.map((id) => catalog.find((ingredient) => ingredient.id === id)).filter(Boolean), [catalog, selected]);
  const results = useMemo(() => {
    if (!recipes) return [];
    if (selected.length) {
      return findRecipesByIngredients(recipeIndex, selected, { maxMissing: matchModes[matchMode].maxMissing })
        .filter(({ recipe }) => filterRecipesByName([recipe], recipeQuery).length);
    }
    return filterRecipesByName(recipes, recipeQuery).map((recipe) => ({
      recipe,
      score: null,
      status: null,
      matchedIngredients: [],
      missingIngredients: [],
    }));
  }, [recipes, recipeIndex, selected, matchMode, recipeQuery]);
  const hasSearch = selected.length > 0 || recipeQuery.trim().length > 0;
  const toggle = (id) => setSelected((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);

  return (
    <main className="page section-wrap search-page">
      <header className="page-heading search-heading">
        <div>
          <p className="eyebrow">Wyszukiwarka składników</p>
          <h1>Twoja spiżarnia.<br /><i>Twój następny posiłek.</i></h1>
        </div>
        <p>Wybierz to, co masz. Algorytm najpierw pokaże dania możliwe do przygotowania, potem pomysły wymagające najmniejszych zakupów.</p>
      </header>

      <div className="search-workspace">
        <aside className="ingredient-panel" aria-label="Wybierz składniki">
          <div className="panel-heading">
            <div><span className="step-number">01</span><h2>Co masz pod ręką?</h2></div>
            {selected.length > 0 && <button type="button" className="text-button" onClick={() => setSelected([])}>Wyczyść</button>}
          </div>
          <label className="search-input">
            <span className="sr-only">Znajdź składnik</span>
            <span aria-hidden="true">⌕</span>
            <input type="search" value={ingredientQuery} onChange={(event) => setIngredientQuery(event.target.value)} placeholder="Szukaj składnika…" autoComplete="off" />
          </label>

          {selectedIngredients.length > 0 && (
            <div className="selected-ingredients" aria-label="Wybrane składniki">
              {selectedIngredients.map((ingredient) => (
                <button type="button" key={ingredient.id} onClick={() => toggle(ingredient.id)} aria-label={`Usuń składnik: ${ingredient.label}`}>
                  {ingredient.label}<span aria-hidden="true">×</span>
                </button>
              ))}
            </div>
          )}

          <div className="ingredient-scroll">
            {loading && <Loading label="Ładowanie składników" />}
            {categories.map((category) => (
              <fieldset className="ingredient-group" key={category}>
                <legend>{category}</legend>
                <div className="chip-grid">
                  {visibleIngredients.filter((ingredient) => ingredient.category === category).map((ingredient) => (
                    <label className={selected.includes(ingredient.id) ? "ingredient-chip is-selected" : "ingredient-chip"} key={ingredient.id}>
                      <input type="checkbox" checked={selected.includes(ingredient.id)} onChange={() => toggle(ingredient.id)} />
                      <span>{ingredient.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            {!loading && visibleIngredients.length === 0 && <p className="no-ingredients">Nie znaleźliśmy takiego składnika.</p>}
          </div>
        </aside>

        <section className="results" aria-live="polite" aria-busy={loading}>
          <div className="results-toolbar">
            <div><span className="step-number">02</span><h2>{hasSearch ? `${results.length} ${results.length === 1 ? "wynik" : "wyników"}` : "Najlepsze dopasowania"}</h2></div>
            <label className="recipe-name-search"><span>Filtruj nazwę</span><input type="search" value={recipeQuery} onChange={(event) => setRecipeQuery(event.target.value)} placeholder="np. curry" /></label>
          </div>
          <fieldset className="match-modes">
            <legend>Zakres wyników</legend>
            {Object.entries(matchModes).map(([id, mode]) => <label key={id}><input type="radio" name="match-mode" value={id} checked={matchMode === id} onChange={() => setMatchMode(id)} /><span>{mode.label}</span></label>)}
          </fieldset>

          {loading && <Loading label="Układamy propozycje" />}
          {error && <ErrorState />}
          {!loading && !error && !hasSearch && <div className="empty-state"><span aria-hidden="true">✦</span><p>Zaznacz pierwszy składnik, a tutaj pojawią się dopasowane dania.</p></div>}
          {!loading && !error && hasSearch && results.length === 0 && <div className="empty-state"><span aria-hidden="true">⌕</span><p>Brak wyników w tym zakresie. Dodaj składnik albo wybierz szerszy zakres.</p></div>}
          <div className="recipe-grid">{hasSearch && results.map((result) => <RecipeCard key={result.recipe.id} result={result} />)}</div>
        </section>
      </div>
    </main>
  );
}
