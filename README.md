# Mobilna Książka Kucharska

[English version](README.en.md)

Responsywna aplikacja PWA, która podpowiada, co ugotować z produktów dostępnych w domu. Łączy wyszukiwarkę przepisów, katalog praktycznych instrukcji oraz minutnik kuchenny działający między widokami.

## Jak działa wyszukiwanie

1. Użytkownik wybiera składniki dostępne w kuchni.
2. Identyfikatory, polskie znaki i aliasy są sprowadzane do wspólnej postaci.
3. Indeks przepisów oblicza pokrycie receptury, liczbę trafień i brakujące produkty.
4. Kompletne dania otrzymują 100%, a pozostałe są sortowane według najmniejszej liczby potrzebnych zakupów.

Katalog filtrów powstaje automatycznie z danych, dlatego nowy składnik dodany do przepisu nie znika z wyszukiwarki.

## Najważniejsze funkcje

- dynamiczny katalog wszystkich składników obecnych w danych;
- ranking dań według tego, jak dużą część przepisu można przygotować od razu;
- tryby „mam wszystko”, „brakuje maksymalnie 3” i „wszystkie pomysły”;
- łączenie aliasów i wariantów pisowni, np. `Ryż`/`Ryz` i `SosSerowy`/`Sos serowy`;
- wyszukiwanie nazw bez polskich znaków i z tolerancją pojedynczej literówki;
- 71 przepisów w lokalnym katalogu (51 bazowych i 20 rozszerzeń);
- instrukcje przygotowania produktów i minutnik zachowujący odliczanie;
- obsługa klawiatury, czytników ekranu, małych ekranów i ograniczenia animacji;
- instalacja PWA, cache offline i lokalny fallback danych.

## Wymagania

- Node.js 20.19 lub nowszy;
- npm 10 lub nowszy;
- opcjonalnie własny projekt Firebase Realtime Database.

## Instalacja i uruchomienie

```bash
git clone <adres-repozytorium>
cd Mobilna-ksiazka-kucharska
npm install
npm run dev
```

Aplikacja będzie dostępna pod `http://localhost:3010`.

Dla powtarzalnej instalacji na CI lub serwerze użyj `npm ci` zamiast `npm install`.

## Konfiguracja Firebase

Skopiuj `.env.example` do `.env` i ustaw wartości `VITE_FIREBASE_*`. Bez własnej konfiguracji używany jest publiczny projekt zdefiniowany w aplikacji. Gdy odczyt z Firebase nie powiedzie się, aplikacja korzysta z `src/example.json` i zawsze dołącza `src/data/recipeExtensions.js`.

Pliki `.env` są ignorowane przez Git. Do repozytorium należy dodawać wyłącznie pozbawiony sekretów plik `.env.example`. Zmienne Vite są osadzane w kodzie przeglądarki, dlatego nie mogą zawierać prywatnych kluczy administracyjnych.

## Źródła danych

- Firebase Realtime Database — podstawowe źródło danych w trybie online;
- `src/example.json` — katalog awaryjny i dane startowe;
- `src/data/recipeExtensions.js` — dodatkowe przepisy scalane niezależnie od źródła.

Po 4,5 sekundy bez odpowiedzi Firebase aplikacja automatycznie przechodzi na dane lokalne.

## Polecenia

```bash
npm run dev      # serwer deweloperski
npm test         # testy algorytmu wyszukiwania
npm run build    # produkcyjny build i service worker
npm run preview  # podgląd katalogu dist
```

Ostatnia walidacja redesignu: 9 testów jednostkowych, poprawny build PWA, Lighthouse 100/100 dla dostępności i dobrych praktyk oraz 0 podatności w produkcyjnych zależnościach.

## Struktura

```text
src/
├── components/  # layout, stany i kontrolki PWA
├── data/        # lokalne rozszerzenia katalogu
├── hooks/       # stan pobierania danych
├── lib/         # normalizacja, indeks i ranking
├── pages/       # ekrany ładowane według tras
├── services/    # Firebase, fallback i cache
└── firebase/    # konfiguracja SDK
```

Szczegóły: [architektura](docs/architecture.md), [dane](docs/api.md), [rozwój](docs/development.md), [plan redesignu](docs/redesign-plan.md) i [dziennik zmian](CHANGELOG.md).

## PWA i wdrożenie

`npm run build` generuje manifest oraz service worker w `dist/`. Shell aplikacji jest precache’owany, a dane Firebase korzystają ze strategii `NetworkFirst`. Konfiguracja Netlify publikuje katalog `dist` i przekierowuje trasy SPA do `index.html`.

Katalog `dist/` jest artefaktem generowanym i nie jest wersjonowany. Wdrożenie zawsze powinno wykonywać świeże `npm ci` oraz `npm run build`.

## Licencja i prawa autorskie

© 2026 Shellty. Wszystkie prawa zastrzeżone. Repozytorium nie zawiera obecnie licencji open source; bez osobnej zgody kodu nie należy kopiować ani redystrybuować.
