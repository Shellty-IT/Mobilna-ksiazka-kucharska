# Dziennik zmian

Ważne zmiany w projekcie są dokumentowane w tym pliku. Format jest zgodny z ideą [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased] — 2026-07-13

### Dodano

- dwukolumnowy obszar wyszukiwania „spiżarnia → wyniki” z responsywnym układem mobilnym;
- tryby wyników: gotowe teraz, maksymalnie trzy brakujące składniki i wszystkie pomysły;
- dynamiczny katalog składników, statusy dopasowania i wizualny miernik wyniku;
- obsługę aliasów, wariantów pisowni, polskich znaków oraz pojedynczych literówek w nazwach;
- 8 nowych przepisów, w tym dania roślinne, rybne i śniadaniowe;
- przycisk instalacji PWA, informację o trybie offline oraz link pomijający nawigację;
- trwały minutnik z presetami, zachowujący odliczanie między widokami;
- limit czasu dla Firebase z automatycznym przejściem na lokalny katalog;
- plan redesignu oraz zaktualizowaną dokumentację architektury.

### Zmieniono

- ranking wyników premiuje przede wszystkim część przepisu możliwą do wykonania z dostępnych produktów;
- katalog wyników jest indeksowany raz po pobraniu danych;
- interfejs ma mocniejszy kontrast, spójny fokus klawiatury i większe cele dotykowe;
- usunięto blokujące render pobieranie fontów zewnętrznych na rzecz szybkiego zestawu systemowego;
- widok przepisu pokazuje liczbę składników oraz dostępny czas przygotowania;
- dokumentację PL i EN dostosowano do React 19, React Router 7, Vite 8 i bieżącej struktury katalogów.

### Usunięto

- nieużywany `AuthProvider` ze startowego drzewa aplikacji, co zmniejsza kod wymagany przy pierwszym uruchomieniu.
