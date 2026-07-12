import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loading } from "./components/Feedback";
import { Layout } from "./components/Layout";

const HomePage = lazy(() => import("./pages/HomePage").then(({ HomePage }) => ({ default: HomePage })));
const SearchPage = lazy(() => import("./pages/SearchPage").then(({ SearchPage }) => ({ default: SearchPage })));
const RecipePage = lazy(() => import("./pages/RecipePage").then(({ RecipePage }) => ({ default: RecipePage })));
const ProductsPage = lazy(() => import("./pages/ProductsPage").then(({ ProductsPage }) => ({ default: ProductsPage })));
const ProductPage = lazy(() => import("./pages/ProductPage").then(({ ProductPage }) => ({ default: ProductPage })));
const TimerPage = lazy(() => import("./pages/TimerPage").then(({ TimerPage }) => ({ default: TimerPage })));

export default function App() {
  return <Suspense fallback={<Loading label="Ładowanie widoku" />}><Routes>
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
  </Routes></Suspense>;
}
