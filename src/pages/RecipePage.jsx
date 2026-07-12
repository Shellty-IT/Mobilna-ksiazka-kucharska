import { Link, useParams } from "react-router-dom";
import { ErrorState, Loading } from "../components/Feedback";
import { getRecipe } from "../services/catalog";
import { useCatalog } from "../hooks/useCatalog";

export function RecipePage() {
  const { recipeId } = useParams();
  const { data: recipe, error, loading } = useCatalog(() => getRecipe(recipeId), [recipeId]);
  if (loading) return <Loading label="Ładowanie przepisu" />;
  if (error || !recipe) return <main className="section-wrap page"><ErrorState message="Nie znaleziono przepisu." /><Link className="button button-quiet" to="/szukaj">Wróć do wyszukiwania</Link></main>;
  const steps = String(recipe.description || "").split(/\n|(?<=[.!?])\s+(?=[A-ZĄĆĘŁŃÓŚŹŻ])/).filter(Boolean);
  return <main className="page section-wrap recipe-view"><Link className="back-link" to="/szukaj">← Wróć do wyników</Link><header className="recipe-hero"><p className="eyebrow">Przepis {String(recipe.number).padStart(2, "0")}</p><h1>{recipe.name}</h1><p>Przygotuj danie krok po kroku. Zaznaczaj składniki, które masz już przygotowane.</p></header><div className="recipe-layout"><section className="ingredient-list"><h2>Składniki</h2><ul>{(recipe.composition || []).map((ingredient, index) => <li key={`${ingredient}-${index}`}><label><input type="checkbox" /><span>{ingredient}</span></label></li>)}</ul></section><section className="method"><h2>Przygotowanie</h2>{steps.map((step, index) => <article className="method-step" key={`${step}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></article>)}</section></div></main>;
}
