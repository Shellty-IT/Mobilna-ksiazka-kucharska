# Instalacja i Konfiguracja

## Wymagania wstępne
- Node.js (v14+)
- Konto na platformie Firebase

## Instalacja lokalna

1. Sklonuj repozytorium:
```bash
git clone <url-repozytorium>
cd Mobilna-ksiazka-kucharska
```

2. Zainstaluj zależności:
```bash
npm install
```

3. Skonfiguruj Firebase:
   - Stwórz nowy projekt w konsoli Firebase.
   - Włącz **Authentication** (metoda Email/Password).
   - Stwórz **Realtime Database**.
   - Skopiuj dane konfiguracyjne do pliku `src/firebase/firebaseIndex.js` oraz `src/utils/firebase.js`.

4. Zaimportuj przykładowe dane:
   - Możesz wykorzystać plik `src/example.json` do zaimportowania wstępnej struktury bazy danych w konsoli Firebase (Realtime Database -> Import JSON).

5. Uruchom aplikację:
```bash
npm start
```

## Konfiguracja PWA
Aplikacja jest skonfigurowana jako Progressive Web App przy użyciu `workbox-webpack-plugin`. Główne ustawienia znajdują się w `src/serviceWorker.js` oraz w pliku `public/manifest.json`.

## Deployment (Netlify)
Projekt zawiera plik `netlify.toml`, który ułatwia wdrażanie na platformie Netlify.
- Build command: `npm run build`
- Publish directory: `dist`
