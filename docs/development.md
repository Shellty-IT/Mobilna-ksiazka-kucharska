# Rozwój i testowanie

## Zasady

- widoki tras trafiają do `src/pages/`, elementy współdzielone do `src/components/`;
- logika domenowa pozostaje w czystych funkcjach w `src/lib/`;
- dostęp do danych przechodzi przez `src/services/catalog.js`;
- nowe identyfikatory składników należy dodać do definicji w `src/lib/search.js`, jeśli wymagają własnej etykiety, kategorii lub aliasu;
- interaktywne elementy muszą mieć widoczny fokus i działać przy szerokości 320 px;
- zmiany użytkowe należy opisać w `CHANGELOG.md`.

## Kontrola jakości

```bash
npm test
npm run build
```

Testy obejmują normalizację, aliasy, ranking, limit braków, status kompletnego dania, wyszukiwanie nazw i literówki. Build jest obowiązkowy, ponieważ weryfikuje również generowanie manifestu oraz service workera.

## Dodawanie przepisu

Dodaj rekord w Firebase lub lokalnie w `src/data/recipeExtensions.js`. `ingredients` zawiera stabilne identyfikatory używane przez wyszukiwarkę, a `composition` — tekst wyświetlany użytkownikowi. `prepTime` jest opcjonalną liczbą minut.
