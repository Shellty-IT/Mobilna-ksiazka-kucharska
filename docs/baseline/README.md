# Stan początkowy

Ten katalog zawiera materiały porównawcze dla redesignu aplikacji.

## Zrzuty ekranowe

- `home-desktop.png` — widok aplikacji przy szerokości 1440 px.
- `home-mobile.png` — widok aplikacji przy szerokości 390 px.

W obu widokach podczas wykonania zrzutu widoczny był ekran ładowania oczekujący na stan uwierzytelnienia. To zachowanie należy zachować jako przypadek testowy: interfejs nie może pozostawać bez końca w stanie ładowania po błędzie lub braku odpowiedzi usługi autoryzacji.

## Dane Firebase

| Ścieżka | Rekordy | Pola |
| --- | ---: | --- |
| `/recipes` | 58 | `composition`, `description`, `ingredients`, `name`, `number` |
| `/vegetables` | 20 | `description`, `image`, `name`, `number`, `values`, `values2` |
| `/pasta` | 16 | `description`, `image`, `name`, `number`, `values` |
| `/groats` | 12 | `description`, `image`, `name`, `number` |
| `/other` | 9 | `description`, `image`, `name`, `number`, `values`, `values2` |

### Ograniczenia obecnego modelu

- identyfikatory rekordów są przechowywane w polu `number`, zamiast wykorzystywać klucze bazy;
- reguły Realtime Database nie definiują indeksu `.indexOn` dla pola `number`;
- dokumentacja API opisuje pola `title`, `slug`, `steps`, których nie zawierają aktualne rekordy przepisów;
- składniki są zapisane jako nazwy tekstowe, co utrudnia obsługę synonimów i jednoznaczne dopasowanie.

## Stan techniczny

- komenda `npm run build` kończy się powodzeniem;
- zestaw testów nie zawiera obecnie żadnych testów;
- build nie generuje `service-worker.js`, mimo że aplikacja go rejestruje;
- manifest deklaruje ten sam plik SVG jako `image/png` i `image/x-icon`;
- port 3000 nie jest wiarygodnym adresem porównawczym w tym środowisku, ponieważ może być zajęty przez niezależną aplikację.

## Kryteria porównania po wdrożeniu

1. Widok ładowania ma przejść do stanu treści, błędu lub ponowienia w przewidywalnym czasie.
2. Aplikacja ma poprawnie działać przy szerokościach 390 px i 1440 px.
3. Manifest i service worker mają umożliwiać instalację oraz działanie offline.
4. Widok szczegółów ma pobierać pojedynczy rekord, bez pobierania całej kolekcji.
5. Wyszukiwarka ma zwracać uszeregowane wyniki i wskazywać brakujące składniki.
