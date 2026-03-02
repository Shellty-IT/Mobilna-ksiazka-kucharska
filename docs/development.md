# Przewodnik dla Deweloperów

## Standardy kodowania
- Komponenty funkcjonalne z użyciem Hooków (useEffect, useState).
- Stylizacja przy użyciu plików `.css` importowanych bezpośrednio do komponentów.
- Asynchroniczne pobieranie danych przy użyciu `async/await`.

## Przepływ pracy (Workflow)
1. **Dodawanie nowego typu produktu**:
   - Dodaj nową ścieżkę w `src/App.js`.
   - Stwórz funkcję pobierającą w `src/Api.js`.
   - Stwórz komponent listy w `src/components/howlist/`.
   - Stwórz komponent szczegółów w `src/components/ingredients/`.

2. **Modyfikacja stylów**:
   - Style znajdują się w tych samych folderach co komponenty.
   - Globalne style są w `src/global.css` oraz `src/components/All.css`.

3. **Zarządzanie autoryzacją**:
   - Korzystaj z `useAuth` (z `src/provider/AuthProvider.js`) aby uzyskać dostęp do aktualnie zalogowanego użytkownika lub funkcji logowania/wylogowania.

## Testowanie
- Do testów jednostkowych wykorzystywany jest `Jest` oraz `@testing-library/react`.
- Testy znajdują się w plikach `.test.js`.
- Uruchamianie testów: `npm test`.

## Dobre praktyki
- Staraj się wydzielać powtarzalną logikę do folderu `src/utils/`.
- Komponenty UI powinny być możliwie małe i reużywalne.
- Pamiętaj o obsłudze stanów ładowania (`Loader`) oraz błędów przy pobieraniu danych.
