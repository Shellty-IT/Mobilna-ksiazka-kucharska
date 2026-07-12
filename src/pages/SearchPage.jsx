import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ErrorState, Loading } from "../components/Feedback";
import { filterRecipesByName, ingredientCatalog, findRecipesByIngredients, normalizeText } from "../lib/search";
import { getRecipes } from "../services/catalog";
import { useCatalog } from "../hooks/useCatalog";

export function SearchPage() {
  const { data: recipes, error, loading } = useCatalog(getRecipes, []);
  const [selected, setSelected] = useState([]);
  const [limitMissing, setLimitMissing] = useState(false);
  const [ingredientQuery, setIngredientQuery] = useState("");
  const [recipeQuery, setRecipeQuery] = useState("");
  const results = useMemo(() => {
    const catalog = recipes || [];
    if (selected.length) {
      return findRecipesByIngredients(catalog, selected, { maxMissing: limitMissing ? 3 : Infinity })
        .filter(({ recipe }) => filterRecipesByName([recipe], recipeQuery).length);
    }
    return filterRecipesByName(catalog, recipeQuery).map((recipe) => ({ recipe, score: null, matchedIngredients: [], missingIngredients: [] }));
  }, [recipes, selected, limitMissing, recipeQuery]);
  const categories = [...new Set(ingredientCatalog.map((ingredient) => ingredient.category))];
  const normalizedIngredientQuery = normalizeText(ingredientQuery);
  const toggle = (id) => setSelected((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);

  return <main className="page section-wrap">
    <header className="page-heading"><p className="eyebrow">Wyszukiwarka składników</p><h1>Co jest dziś<br /><i>w Twojej kuchni?</i></h1><p>Wyniki są sortowane według stopnia dopasowania do wybranych składników.</p></header>
    <section className="ingredient-panel" aria-label="Wybierz składniki">
      <div className="search-fields"><label><span>Znajdź składnik</span><input value={ingredientQuery} onChange={(event) => setIngredientQuery(event.target.value)} placeholder="np. ciecierzyca, ryż, feta" /></label><label><span>Znajdź po nazwie przepisu</span><input value={recipeQuery} onChange={(event) => setRecipeQuery(event.target.value)} placeholder="np. makaron, curry" /></label></div>
      <div className="selection-summary"><span>Wybrane: <strong>{selected.length}</strong></span>{selected.length > 0 && <button type="button" className="text-button" onClick={() => setSelected([])}>Wyczyść</button>}</div>
      {categories.map((category) => { const ingredients = ingredientCatalog.filter((ingredient) => ingredient.category === category && ingredient.normalized.includes(normalizedIngredientQuery)); return ingredients.length ? <fieldset className="ingredient-group" key={category}><legend>{category}</legend><div className="chip-grid">{ingredients.map((ingredient) => <label className={selected.includes(ingredient.id) ? "ingredient-chip is-selected" : "ingredient-chip"} key={ingredient.id}><input type="checkbox" checked={selected.includes(ingredient.id)} onChange={() => toggle(ingredient.id)} /><span>{ingredient.label}</span></label>)}</div></fieldset> : null; })}
      <label className="filter-control"><input type="checkbox" checked={limitMissing} onChange={(event) => setLimitMissing(event.target.checked)} /> Pokaż tylko przepisy, którym brakuje maksymalnie 3 składników</label>
    </section>
    <section className="results" aria-live="polite"><div className="result-heading"><div><p className="eyebrow">Propozycje</p><h2>{selected.length || recipeQuery ? `${results.length} ${results.length === 1 ? "wynik" : "wyników"}` : "Wybierz składniki"}</h2></div></div>
      {loading && <Loading />}{error && <ErrorState />}
      {!loading && !error && selected.length === 0 && !recipeQuery && <div className="empty-state"><span>✦</span><p>Wybierz składniki albo wpisz nazwę dania, którego szukasz.</p></div>}
      {!loading && !error && (selected.length > 0 || recipeQuery) && results.length === 0 && <div className="empty-state"><span>⌕</span><p>Brak pasujących przepisów. Spróbuj zmienić zestaw składników lub nazwę.</p></div>}
      <div className="recipe-grid">{results.map(({ recipe, score, matchedIngredients, missingIngredients }) => <article className="recipe-card" key={recipe.id}><div className="recipe-card-top">{score === null ? <span className="score">Wynik po nazwie</span> : <span className="score">{score}% dopasowania</span>}<span className="recipe-index">{String(recipe.number).padStart(2, "0")}</span></div><h3>{recipe.name}</h3>{matchedIngredients.length > 0 && <p className="match-line"><b>Masz:</b> {matchedIngredients.join(", ")}</p>}{missingIngredients.length > 0 && <p className="missing-line"><b>Brakuje:</b> {missingIngredients.slice(0, 3).join(", ")}{missingIngredients.length > 3 ? "…" : ""}</p>}<Link to={`/przepisy/${recipe.id}`}>Zobacz przepis <span>→</span></Link></article>)}</div>
    </section>
  </main>;
}
