import { Navigate, Route, Routes } from "react-router-dom";

const Placeholder = ({ title }) => (
  <main className="app-shell">
    <section className="status-card">
      <p className="eyebrow">Mobilna Książka Kucharska</p>
      <h1>{title}</h1>
      <p>Trwa przygotowywanie nowej wersji tego widoku.</p>
    </section>
  </main>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Placeholder title="Gotuj prościej" />} />
      <Route path="/szukaj" element={<Placeholder title="Znajdź przepis" />} />
      <Route path="/produkty" element={<Placeholder title="Jak przygotować" />} />
      <Route path="/minutnik" element={<Placeholder title="Minutnik" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
