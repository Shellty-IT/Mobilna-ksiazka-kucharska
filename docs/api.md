# Dane i Firebase

Aplikacja nie udostępnia REST API. Odczytuje kolekcje bezpośrednio z Firebase Realtime Database przez moduł `src/services/catalog.js`.

## Kolekcje

| Ścieżka | Zawartość |
| --- | --- |
| `/recipes` | `name`, `number`, `ingredients[]`, `composition[]`, `description`, opcjonalnie `prepTime` |
| `/vegetables` | instrukcje przygotowania warzyw |
| `/pasta` | instrukcje przygotowania makaronów |
| `/groats` | instrukcje przygotowania kasz |
| `/other` | instrukcje pozostałych produktów |

Każdy rekord jest normalizowany do postaci z tekstowym `id`. Kolekcja może być tablicą albo obiektem Firebase.

## Publiczne funkcje warstwy danych

- `getRecipes()` — wszystkie przepisy z rozszerzeniami;
- `getRecipe(id)` — pojedynczy przepis;
- `getProducts(category)` — jedna kategoria produktów;
- `getAllProducts()` — wszystkie kategorie produktów;
- `getProduct(category, id)` — pojedyncza instrukcja produktu.

Pierwsze żądanie danej kolekcji jest cache’owane w pamięci. Błąd sieci powoduje odczyt odpowiedniej kolekcji z `src/example.json`.
