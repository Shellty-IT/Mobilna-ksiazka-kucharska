# Architektura aplikacji

## Stos

- React 19 i React Router 7 — interfejs i routing;
- Vite 8 — środowisko deweloperskie i build;
- Firebase Realtime Database — zdalny katalog;
- Vitest — testy jednostkowe;
- `vite-plugin-pwa` i Workbox — manifest, service worker oraz cache offline.

## Warstwy

```text
pages / components → hooks → services → Firebase
                          ↘ local JSON fallback
pages → lib/search → indeks i ranking w pamięci
```

- `src/pages/` zawiera ekrany tras ładowane leniwie.
- `src/components/` zawiera wspólny layout, stany i kontrolki PWA.
- `src/hooks/useCatalog.js` zarządza stanem asynchronicznego pobierania.
- `src/services/catalog.js` normalizuje kolekcje, scala rozszerzenia i cache’uje żądania.
- `src/lib/search.js` odpowiada za normalizację, katalog filtrów, indeks i ranking.
- `src/example.json` jest lokalnym fallbackiem, a `src/data/recipeExtensions.js` rozszerza katalog niezależnie od źródła.

## Przepływ wyszukiwania

1. `getRecipes()` pobiera Firebase lub lokalny fallback i dodaje rozszerzenia.
2. `buildIngredientCatalog()` tworzy unikalne filtry ze wszystkich receptur.
3. `createRecipeSearchIndex()` kanonizuje składniki i zapisuje je w zbiorach.
4. Wybrane identyfikatory są kanonizowane, oceniane i filtrowane według liczby braków.
5. Wyniki są sortowane po wyniku, brakach, liczbie trafień i nazwie.

Pełna receptura otrzymuje 100%. Dla niepełnych wynik składa się w 72% z pokrycia receptury, w 20% z liczby różnych trafień (do trzech) i w 8% z pokrycia wyboru użytkownika.

## Offline

Shell aplikacji jest precache’owany. Dane Firebase używają `NetworkFirst` z limitem czasu i tygodniowym cache’em. Przy błędzie pobierania warstwa usług korzysta z danych lokalnych. Minutnik zapisuje czas końca w `localStorage`.
