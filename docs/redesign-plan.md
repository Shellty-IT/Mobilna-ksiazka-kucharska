# Plan redesignu 2026

## Audyt stanu wyjściowego

- Aplikacja korzystała już z Reacta, Vite, Firebase Realtime Database i podstawowej konfiguracji PWA.
- Wyszukiwarka znała tylko ręcznie wpisaną część składników. Warianty takie jak `Ryż`/`Ryz`, `SosSerowy`/`Sos serowy` i `Śmietana`/`Smietanka` mogły rozdzielać wyniki.
- Ranking uwzględniał liczbę wybranych składników, ale nie komunikował, czy danie można ugotować od razu.
- Widok wyboru składników i wyniki były ułożone jeden pod drugim, co utrudniało porównywanie na szerokim ekranie.
- Dokumentacja opisywała wcześniejszą architekturę, nieistniejące pliki oraz starsze wersje bibliotek.
- Provider Firebase Authentication był ładowany, choć interfejs nie oferował funkcji konta.

## Założenia produktu i interfejsu

1. Najważniejsza ścieżka ma mieć dwa wyraźne kroki: wybór zawartości kuchni i ocenę wyników.
2. Na desktopie kroki tworzą dwukolumnowy obszar roboczy, na telefonie układają się liniowo.
3. Każdy wynik pokazuje stan: „Masz wszystko”, „Prawie gotowe” albo „Pomysł do uzupełnienia”.
4. Wszystkie elementy interaktywne mają widoczny fokus, odpowiedni rozmiar dotykowy i etykiety dla czytników ekranu.
5. Ciepła paleta, szeryfowe nagłówki i oszczędna ilustracja pozostają częścią tożsamości produktu.

## Plan techniczny

- Generować katalog filtrów z faktycznych danych przepisów, zamiast utrzymywać niepełną listę ręczną.
- Kanonizować identyfikatory i aliasy składników przed budową indeksu.
- Budować indeks wyszukiwania tylko po zmianie danych i używać zbiorów do dopasowań.
- Ważyć dostępność całego przepisu, liczbę trafień i pokrycie wyboru użytkownika; kompletne dania otrzymują 100%.
- Obsłużyć wyszukiwanie nazw bez polskich znaków i pojedyncze literówki.
- Rozszerzyć lokalny katalog, który jest również fallbackiem przy braku Firebase.
- Zachować lazy loading tras, usunąć nieużywane elementy startowego grafu zależności i utrzymać cache PWA.
- Zweryfikować testy jednostkowe, build, manifest, service worker, responsywność i dostępność.

## Kryteria ukończenia

- wyszukiwarka obejmuje każdy składnik obecny w katalogu;
- aliasy nie tworzą duplikatów i dają identyczne wyniki;
- użytkownik może ograniczyć wyniki do dań kompletnych lub prawie kompletnych;
- aplikacja działa od 320 px szerokości i jest obsługiwana klawiaturą;
- minutnik zachowuje czas między widokami;
- build generuje instalowalny manifest i service worker;
- README PL/EN, dokumentacja techniczna i changelog odpowiadają kodowi.
