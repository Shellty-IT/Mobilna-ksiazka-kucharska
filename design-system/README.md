# Design System — Mobilna Książka Kucharska

Input files for `/design-sync`. Each `*.html` under `foundations/` and `components/`
is a **self-contained preview** (inline CSS, no external dependencies) whose first
line carries a `<!-- @dsCard … -->` marker. `/design-sync` reads these markers to
build the Design System pane card index and pushes the files, one component at a
time, to a Claude Design project.

The styles are extracted verbatim from the live app CSS (`src/global.css`,
`src/components/**/*.css`) so the previews match production.

## Structure

```
design-system/
├── foundations/
│   ├── colors.html          # palette + gradients
│   ├── typography.html       # type scale + weights
│   └── spacing-radius.html   # spacing, radii, shadows
└── components/
    ├── buttons.html          # primary / secondary / danger / start-stop
    ├── navbar.html           # app bar (desktop) + mobile drawer
    ├── inputs.html           # outlined text field + checkbox
    ├── login-form.html       # auth card
    ├── alerts.html           # error banner
    ├── timer.html            # minutnik countdown
    ├── loader.html           # concentric spinner
    ├── recipe-cards.html     # numbered result cards
    ├── feature-cards.html    # image feature cards (Znajdź przepis)
    └── intro-tips.html       # numbered tip list
```

## Design tokens (source of truth)

| Token            | Value                                              |
|------------------|----------------------------------------------------|
| Brand gradient   | `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`|
| Indigo           | `#667eea`                                           |
| Purple           | `#764ba2`                                           |
| Danger gradient  | `linear-gradient(135deg, #f56565 0%, #c53030 100%)` |
| Ink / headings   | `#1e293b`, `#2d3748`                                |
| Body text        | `#4a5568`                                           |
| Muted text       | `#64748b`, `#718096`, `#a0aec0`                     |
| Surfaces         | `#ffffff`, `#f8fafc`, `#f7fafc`                     |
| Tint (info box)  | `#f0f4ff → #e9f0ff`, border `#dce7ff`              |
| Borders          | `#e2e8f0`, `#cbd5e0`                                |
| Radius scale     | 8 / 10 / 12 / 14 / 16 / 18 / 20 / 24 / 28 px        |
| Font weights     | 400 / 500 / 600 / 700 / 800                         |

## After editing

Re-run `/design-sync` to push changes. Do not hand-edit `_ds_manifest.json` —
it is generated from the `@dsCard` markers.
