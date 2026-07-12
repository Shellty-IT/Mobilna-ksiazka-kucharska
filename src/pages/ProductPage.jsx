import { Link, useParams } from "react-router-dom";
import { ErrorState, Loading } from "../components/Feedback";
import { getProduct } from "../services/catalog";
import { useCatalog } from "../hooks/useCatalog";

export function ProductPage() {
  const { category, productId } = useParams();
  const { data: product, error, loading } = useCatalog(() => getProduct(category, productId), [category, productId]);
  if (loading) return <Loading label="Ładowanie produktu" />;
  if (error || !product) return <main className="page section-wrap"><ErrorState message="Nie znaleziono produktu." /></main>;
  return <main className="page section-wrap product-view"><Link className="back-link" to="/produkty">← Wszystkie produkty</Link><article className="product-detail"><div className="product-image">{product.image && <img src={product.image} alt={product.name} decoding="async" />}</div><div className="product-content"><p className="eyebrow">Instrukcja przygotowania</p><h1>{product.name}</h1><p className="lead">{product.description}</p>{product.values && <section><h2>Warto wiedzieć</h2><p>{product.values}</p></section>}{product.values2 && <section><h2>Dodatkowa wskazówka</h2><p>{product.values2}</p></section>}<Link className="button button-primary" to="/minutnik">Ustaw minutnik <span>→</span></Link></div></article></main>;
}
