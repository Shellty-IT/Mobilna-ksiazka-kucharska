import { Link } from "react-router-dom";
import { ErrorState, Loading } from "../components/Feedback";
import { getAllProducts } from "../services/catalog";
import { useCatalog } from "../hooks/useCatalog";

const categories = { vegetables: ["Warzywa", "Świeże i sezonowe"], pasta: ["Makarony", "Al dente bez zgadywania"], groats: ["Kasze", "Proporcje i czas"], other: ["Pozostałe", "Podstawy kuchni" ] };

export function ProductsPage() {
  const { data, error, loading } = useCatalog(getAllProducts, []);
  return <main className="page section-wrap"><header className="page-heading"><p className="eyebrow">Baza wiedzy</p><h1>Jak to<br /><i>przygotować?</i></h1><p>Praktyczne instrukcje gotowania najczęściej używanych produktów.</p></header>{loading && <Loading />}{error && <ErrorState />}{data && <div className="product-categories">{Object.entries(categories).map(([id, [title, description]]) => <section className="product-category" key={id}><div><p className="eyebrow">{description}</p><h2>{title}</h2></div><div className="product-links">{data[id].map((product) => <Link key={product.id} to={`/produkty/${id}/${product.id}`}><span>{product.name}</span><span>→</span></Link>)}</div></section>)}</div>}</main>;
}
