import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ErrorState, Loading } from "../components/Feedback";
import { ingredientCatalog, findRecipesByIngredients } from "../lib/search";
import { getRecipes } from "../services/catalog";
import { useCatalog } from "../hooks/useCatalog";

export function SearchPage() {
  const { data: recipes, error, loading } = useCatalog(getRecipes, []);
  const [selected, setSelected] = useState([]);
  const [limitMissing, setLimitMissing] = useState(false);
  const results = useMemo(() => findRecipesByIngredients(recipes || [], selected, { maxMissing: limitMissing ? 3 : Infinity }), [recipes, selected, limitMissing]);
  const categories = [...new Set(ingredientCatalog.map((ingredient) => ingredient.category))];
  const toggle = (id) => setSelected((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);

  return <main className="page section-wrap">
    <header className="page-heading"><p className="eyebrow">Wyszukiwarka składników</p><h1>Co jest dziś<br /><i>w Twojej kuchni?</i></h1><p>Wyniki są sortowane według stopnia dopasowania do wybranych składników.</p></header>
    <section className="ingredient-panel" aria-label="Wybierz składniki">
      <div className="selection-summary"><span>Wybrane: <strong>{selected.length}</strong></span>{selected.length > 0 && <button type="button" className="text-button" onClick={() => setSelected([])}>Wyczyść</button>}</div>
      {categories.map((category) => <fieldset className="ingredient-group" key={category}><legend>{category}</legend><div className="chip-grid">{ingredientCatalog.filter((ingredient) => ingredient.category === category).map((ingredient) => <label className={selected.includes(ingredient.id) ? "ingredient-chip is-selected" : "ingredient-chip"} key={ingredient.id}><input type="checkbox" checked={selected.includes(ingredient.id)} onChange={() => toggle(ingredient.id)} /><span>{ingredient.label}</span></label>)}</div></fieldset>)}
      <label className="filter-control"><input type="checkbox" checked={limitMissing} onChange={(event) => setLimitMissing(event.target.checked)} /> Pokaż tylko przepisy, którym brakuje maksymalnie 3 składników</label>
    </section>
    <section className="results" aria-live="polite"><div className="result-heading"><div><p className="eyebrow">Propozycje</p><h2>{selected.length ? `${results.length} ${results.length === 1 ? "wynik" : "wyników"}` : "Wybierz składniki"}</h2></div></div>
      {loading && <Loading />}{error && <ErrorState />}
      {!loading && !error && selected.length === 0 && <div className="empty-state"><span>✦</span><p>Zacznij od wybrania przynajmniej jednego składnika.</p></div>}
      {!loading && !error && selected.length > 0 && results.length === 0 && <div className="empty-state"><span>⌕</span><p>Brak pasujących przepisów. Spróbuj zmienić zestaw składników.</p></div>}
      <div className="recipe-grid">{results.map(({ recipe, score, matchedIngredients, missingIngredients }) => <article className="recipe-card" key={recipe.id}><div className="recipe-card-top"><span className="score">{score}% dopasowania</span><span className="recipe-index">{String(recipe.number).padStart(2, "0")}</span></div><h3>{recipe.name}</h3><p className="match-line"><b>Masz:</b> {matchedIngredients.join(", ")}</p>{missingIngredients.length > 0 && <p className="missing-line"><b>Brakuje:</b> {missingIngredients.slice(0, 3).join(", ")}{missingIngredients.length > 3 ? "…" : ""}</p>}<Link to={`/przepisy/${recipe.id}`}>Zobacz przepis <span>→</span></Link></article>)}</div>
    </section>
  </main>;
}
