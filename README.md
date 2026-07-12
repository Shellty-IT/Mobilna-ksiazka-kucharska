# Mobilna Książka Kucharska

[English version](README.en.md)

Nowoczesna aplikacja PWA pomagająca znaleźć przepis na podstawie dostępnych składników, sprawdzić sposób przygotowania produktów i użyć kuchennego minutnika.

## Funkcje

- wyszukiwanie przepisów według składników z rankingiem dopasowania;
- informacja o pasujących i brakujących składnikach;
- katalog produktów z instrukcjami przygotowania;
- minutnik kuchenny;
- responsywny interfejs dla telefonów, tabletów i desktopów;
- instalacja jako PWA oraz cache aplikacji i danych przepisów.

## Wymagania

- Node.js 20.19 lub nowszy;
- npm 10 lub nowszy;
- projekt Firebase z Authentication oraz Realtime Database.

## Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja domyślnie działa pod adresem `http://localhost:3010`.

## Konfiguracja Firebase

Skopiuj `.env.example` do `.env` i uzupełnij wartości `VITE_FIREBASE_*`. Konfiguracja publicznego projektu jest dostępna jako wartość domyślna, natomiast zmienne środowiskowe pozwalają użyć własnego projektu Firebase.

## Polecenia

```bash
npm run dev      # serwer deweloperski
npm run build    # build produkcyjny
npm run preview  # lokalny podgląd builda
npm test         # testy algorytmu wyszukiwania
```

## Struktura

```text
src/
├── components/  # układ i stany interfejsu
├── hooks/       # hooki danych
├── lib/         # wyszukiwanie i normalizacja
├── pages/       # widoki aplikacji
├── services/    # dostęp do Firebase i cache
└── firebase/    # inicjalizacja usług Firebase
```

## PWA

Manifest oraz service worker są generowane podczas `npm run build`. Po wdrożeniu aplikacja może zostać zainstalowana z poziomu przeglądarki. Shell aplikacji jest cache’owany, a dane receptur mają strategię `NetworkFirst` z fallbackiem cache.

## Wdrożenie

Konfiguracja Netlify znajduje się w `netlify.toml`. Build produkcyjny jest publikowany z katalogu `dist`.
