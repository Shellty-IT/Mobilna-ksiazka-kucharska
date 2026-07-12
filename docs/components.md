# Widoki i komponenty

- `Layout` — marka, responsywna nawigacja, link pomijający i stopka.
- `PwaControls` — stan offline i instalacja aplikacji.
- `Feedback` — dostępne stany ładowania i błędu.
- `HomePage` — landing page i wejścia do głównych funkcji.
- `SearchPage` — katalog składników, tryby dopasowania i karty wyników.
- `RecipePage` — składniki do odhaczania i kroki przygotowania.
- `ProductsPage` / `ProductPage` — katalog instrukcji gotowania.
- `TimerPage` — minutnik zapisujący czas końca w przeglądarce.

Trasy są ładowane przez `React.lazy`, a wspólny fallback renderuje komponent `Loading`.
