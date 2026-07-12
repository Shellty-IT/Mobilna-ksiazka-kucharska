import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { ProductsPage } from "./pages/ProductsPage";
import { RecipePage } from "./pages/RecipePage";
import { SearchPage } from "./pages/SearchPage";
import { TimerPage } from "./pages/TimerPage";

export default function App() {
  return <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/szukaj" element={<SearchPage />} />
      <Route path="/przepisy/:recipeId" element={<RecipePage />} />
      <Route path="/produkty" element={<ProductsPage />} />
      <Route path="/produkty/:category/:productId" element={<ProductPage />} />
      <Route path="/minutnik" element={<TimerPage />} />
      <Route path="/funkcje/znajdz" element={<Navigate to="/szukaj" replace />} />
      <Route path="/funkcje/znajdz/przepisy/:recipeId" element={<Navigate to="/przepisy/:recipeId" replace />} />
      <Route path="/funkcje/jak" element={<Navigate to="/produkty" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>;
}
