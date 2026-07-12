# Design system — Mobilna Książka Kucharska

Samodzielne podglądy HTML w `foundations/` i `components/` dokumentują wcześniejsze eksperymenty komponentowe. Produkcyjnym źródłem prawdy po redesignie 2026 jest `src/styles.css`; przy kolejnej synchronizacji podglądy należy wygenerować ponownie z tego pliku.

## Aktualne fundamenty

| Rola | Wartość |
| --- | --- |
| Tło | `#fffaf5` |
| Powierzchnia | `#ffffff` |
| Tekst | `#27231f` |
| Tekst pomocniczy | `#6d665e` |
| Akcent | `#b9472c` |
| Akcent ciemny | `#8f2f1d` |
| Zieleń | `#dce6d4`, `#2e392b` |
| Fokus | `#246bce`, obrys 3 px |
| Krój podstawowy | `Segoe UI`, system sans-serif |
| Krój redakcyjny | `Iowan Old Style`, `Palatino Linotype`, Georgia |

## Zasady

- minimalny cel dotykowy: 44 × 44 px;
- widoczny `:focus-visible` dla każdej kontrolki;
- układ bez przewijania poziomego od 320 px;
- animacje ograniczone przez `prefers-reduced-motion`;
- kolory statusów nie są jedynym nośnikiem informacji;
- komponenty tras i ich stany są opisane w `docs/components.md`.
