# Mobile Cookbook

[Wersja polska](README.md)

A responsive PWA that suggests meals from ingredients already available at home. It combines recipe discovery, practical product guidance, and a kitchen timer that persists between screens.

## How search works

1. The user selects ingredients available in the kitchen.
2. Identifiers, Polish characters, and aliases are converted to a canonical form.
3. The recipe index calculates recipe coverage, match breadth, and missing products.
4. Complete recipes receive 100%; other results are ordered by the smallest required shopping list.

The filter catalogue is derived from recipe data, so a new recipe ingredient automatically becomes searchable.

## Key features

- a dynamic catalogue of every ingredient present in recipe data;
- ranking based primarily on how much of a recipe can be made immediately;
- “ready now”, “up to 3 missing”, and “all ideas” result modes;
- merged aliases and spelling variants such as `Ryż`/`Ryz` and `SosSerowy`/`Sos serowy`;
- accent-insensitive recipe search with single-typo tolerance;
- 71 recipes in the local catalogue (51 base recipes and 20 extensions);
- product preparation guides and a persistent kitchen timer;
- keyboard, screen-reader, small-screen, and reduced-motion support;
- installable PWA, offline caching, and a local data fallback.

## Requirements

- Node.js 20.19 or newer;
- npm 10 or newer;
- optionally, a custom Firebase Realtime Database project.

## Install and run

```bash
git clone <repository-url>
cd Mobilna-ksiazka-kucharska
npm install
npm run dev
```

The app is available at `http://localhost:3010`.

For reproducible CI or server installations, use `npm ci` instead of `npm install`.

## Firebase configuration

Copy `.env.example` to `.env` and set the `VITE_FIREBASE_*` values. Without custom settings, the app uses its bundled public project configuration. If Firebase cannot be read, `src/example.json` is used; `src/data/recipeExtensions.js` is always merged into the catalogue.

Git ignores all `.env` variants except the secret-free `.env.example` template. Vite variables are embedded in browser code, so they must never contain private administrative credentials.

## Data sources

- Firebase Realtime Database — the primary online data source;
- `src/example.json` — fallback catalogue and seed data;
- `src/data/recipeExtensions.js` — additional recipes merged for every data source.

After 4.5 seconds without a Firebase response, the app automatically switches to local data.

## Commands

```bash
npm run dev      # development server
npm test         # search algorithm tests
npm run build    # production build and service worker
npm run preview  # preview the dist directory
```

Latest redesign validation: 9 unit tests, a successful PWA build, Lighthouse scores of 100/100 for accessibility and best practices, and no production dependency vulnerabilities.

## Project structure

```text
src/
├── components/  # layout, feedback, and PWA controls
├── data/        # local catalogue extensions
├── hooks/       # data loading state
├── lib/         # normalization, indexing, and ranking
├── pages/       # route-level screens
├── services/    # Firebase access, fallback, and cache
└── firebase/    # SDK configuration
```

More detail is available in the [architecture](docs/architecture.md), [data guide](docs/api.md), [development guide](docs/development.md), [redesign plan](docs/redesign-plan.md), and [changelog](CHANGELOG.md).

## PWA and deployment

`npm run build` generates the manifest and service worker in `dist/`. The app shell is precached, while Firebase data uses a `NetworkFirst` strategy. The Netlify configuration publishes `dist` and rewrites SPA routes to `index.html`.

The generated `dist/` directory is intentionally not versioned. Deployments should always run a clean `npm ci` followed by `npm run build`.

## License and copyright

© 2026 Shellty. All rights reserved. This repository currently has no open-source licence; the code may not be copied or redistributed without separate permission.
