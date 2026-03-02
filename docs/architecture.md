# Architektura aplikacji

Aplikacja jest zbudowana w oparciu o bibliotekę **React** i wykorzystuje **Firebase** jako backend (Realtime Database oraz Authentication).

## Główne komponenty architektury

### 1. Frontend (React)
- **Routing**: Zarządzany przez `react-router-dom` (v5). Definiuje ścieżki dla poszczególnych kategorii produktów (warzywa, kasze, makarony) oraz przepisów.
- **Komponenty**: Podzielone tematycznie w folderze `src/components/`. Wykorzystują CSS Modules (choć wiele plików jest importowanych globalnie lub per komponent).
- **Zarządzanie stanem**: Wykorzystuje Context API (`authProvider`) do zarządzania stanem autoryzacji użytkownika.

### 2. Backend (Firebase)
- **Authentication**: Obsługuje rejestrację i logowanie użytkowników.
- **Realtime Database**: Przechowuje dane o produktach (warzywa, kasze, makarony, inne) oraz przepisy kulinarne.

### 3. Komunikacja z danymi
- Wszystkie zapytania do bazy danych znajdują się w pliku `src/Api.js`.
- Wykorzystywany jest oficjalny SDK Firebase.

## Przepływ danych
1. Użytkownik wchodzi na stronę kategorii (np. `/funkcje/jak/warzywa`).
2. Komponent (np. `Vegetables`) wywołuje funkcję z `Api.js` (np. `getVegetables`).
3. Dane są pobierane z Firebase Realtime Database.
4. Dane są renderowane w formie listy.
5. Po kliknięciu w element, użytkownik jest przenoszony do szczegółów (np. `SingleVege`), gdzie dane są przekazywane przez routing lub pobierane ponownie.

## Schemat struktury
```
src/
├── Api.js (Warstwa danych)
├── App.js (Główny router)
├── components/ (Warstwa prezentacji)
├── firebase/ (Konfiguracja Firebase)
├── provider/ (Context Providers)
└── utils/ (Narzędzia pomocnicze)
```
