# Instalacja i konfiguracja

1. Zainstaluj Node.js 20.19+ i uruchom `npm install`.
2. Opcjonalnie skopiuj `.env.example` do `.env` i wpisz konfigurację Firebase.
3. Uruchom `npm run dev`; lokalny adres to `http://localhost:3010`.
4. Przed wdrożeniem uruchom `npm test` oraz `npm run build`.

## Firebase

Realtime Database powinna udostępniać kolekcje `recipes`, `vegetables`, `pasta`, `groats` oraz `other` zgodnie z `docs/api.md`. `src/example.json` można zaimportować jako dane startowe i jest używany automatycznie jako fallback.

## Netlify

`netlify.toml` ustawia polecenie budowania i katalog publikacji. Plik `public/_redirects` zapewnia obsługę bezpośrednich wejść na trasy SPA.
