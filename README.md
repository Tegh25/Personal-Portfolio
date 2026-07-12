# Teghveer Singh Ateliey — Portfolio Explorations

[![Netlify Status](https://api.netlify.com/api/v1/badges/0223566c-38b4-4959-80e6-3845031bf57a/deploy-status)](https://app.netlify.com/projects/teghveer/deploys)

A personal portfolio that treats design as part of the engineering. Instead of shipping one polished layout, this site presents **the same résumé content in nine different experiences** — three visual *directions* crossed with three content *views*.

The goal is not to pick a winner on day one. It is to explore how an FPGA engineer's work reads when framed as a terminal session, a magazine spread, or a block diagram — and to let visitors (and the author) compare those framings side by side.

Big thanks to Vishnu P. for the original idea and design!

---

## The matrix: 3 directions × 3 views

Every combination is a fully realized page, not a skin swap. Typography, motion, section structure, and showpiece interactions change with the direction; the underlying facts come from a single data file.

|  | **Personal Site** | **Case Studies** | **Living Résumé** |
|---|---|---|---|
| **01 · Terminal** | Boot sequence, CLI sections | Wireshark-style packet captures, per-project deep dives | Monospace CV with experience blocks |
| **02 · Editorial** | Newspaper cover, drop caps, scroll-drawn diagrams | Long-form feature articles | Typeset résumé with roman numerals |
| **03 · Schematic** | Career signal-flow pipeline | Block-diagram case studies with animated packets | Chip-layout CV with pin-list skills |

Switch either axis independently. Your last choice is remembered in `localStorage`, so a refresh does not reset where you were.

---

## The three directions

Each direction is a complete art direction — palette, type system, spacing rhythm, and metaphor.

### 01 · Terminal — *system / dark*

Monospace, near-black background, green prompt accents. Content is organized like shell commands: `cat ./summary.md`, `ls -la ./projects/`, `./skills --matrix`.

**Showpieces:** a live typewriter boot sequence on the personal site; a Wireshark-style packet stream for the Evertz broadcast-FPGA case study.

Best when you want the portfolio to feel like infrastructure — logs, packets, and build output rather than marketing copy.

### 02 · Editorial — *paper / serif*

Cream stock, Fraunces and Instrument Serif, editorial rules and drop caps. Sections read like a quarterly design journal: "Letter from the engineer," numbered features, a printed colophon at the bottom.

**Showpieces:** a magazine-cover hero; an orbital satellite diagram that traces in as you scroll (PRESET case study).

Best when you want warmth, narrative, and the sense that each project is a story worth sitting with.

### 03 · Schematic — *FPGA / block diagram*

Dark teal slate on a faint grid. Career modules are drawn as chips with headers, corner marks, and animated signal packets flowing between blocks.

**Showpieces:** a four-module career pipeline on the personal site; per-project block diagrams in Case Studies with stack pin-lists and metric readouts.

Best when you want the portfolio to mirror how the author actually thinks — systems as connected modules with defined interfaces.

---

## The three views

Views answer a different question about the same person. Direction controls *how* it looks; view controls *what shape* the content takes.

### Personal Site

The full portfolio experience — hero, summary, featured projects, skills, awards, and contact. This is the "browse everything" mode. Each direction structures these sections differently (CLI headings vs. editorial rules vs. schematic chips), but the information arc is the same: who, what, why, how to reach out.

### Case Studies

Deep dives on four flagship roles:

- **Evertz** — broadcast FPGA / JPEG-XS tooling
- **PRESET** — satellite payload firmware on FreeRTOS
- **MAC Formula Electric** — vehicle software and build pipelines
- **TD** — software engineering internship

Within Case Studies, use the **project tabs** along the top of the stage to switch between roles. Each project gets direction-specific treatment: terminal packet tables and impact logs, editorial long-form articles with pixel icons, or schematic block diagrams with animated data paths.

### Living Résumé

A reimagined CV — still printable in spirit, but laid out for the screen. Experience, education, honors, and contact are distilled into a single scrollable document. Handy when you want facts fast without the portfolio narrative.

---

## How to navigate the site

When the page loads, a short boot message appears and fades out. Everything below is persistent chrome plus a scrollable stage.

```
┌─────────────────────────────────────────────────────────────┐
│  teghveer.portfolio / 3 directions × 3 views                │
│                [01 Terminal] [02 Editorial] [03 Schematic]  ← direction
├─────────────────────────────────────────────────────────────┤
│  view   Personal Site · Case Studies · Living Résumé        ← view
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                     (scrollable content)                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

1. **Pick a direction** — top-right tabs (`01 Terminal`, `02 Editorial`, `03 Schematic`). Hover for a short subtitle.
2. **Pick a view** — second row (`Personal Site`, `Case Studies`, `Living Résumé`). Hover for a hint.
3. **Scroll the stage** — the fixed chrome stays put; content scrolls underneath.
4. **Case Studies only** — click a project tab (company name / tag) to swap the active case study without leaving the view.
5. **Links** — contact and social links inside each direction open in a new tab where applicable.

On mobile, the chrome compacts: direction numbers hide, the brand subtitle collapses, and case-study tabs scroll horizontally. Layout overrides in `index.html` keep grids single-column and SVGs responsive.

---

## Technical notes

This is intentionally lightweight — no bundler, no install step.

| Piece | Choice |
|---|---|
| **Runtime** | React 18 (UMD) + Babel Standalone, loaded from CDN |
| **Styling** | Inline styles per direction + shared layout CSS in `index.html` |
| **Data** | Single `RESUME` object in `src/data.jsx` — projects, skills, education, awards |
| **Assets** | `PixelArt.jsx` — SVG pixel icons (satellite, racecar, FPGA chip, camera, etc.) |
| **State** | `tegh.direction` and `tegh.view` in `localStorage` |
| **Entry** | `index.html` → `src/App.jsx` shell → one of three `Direction*.jsx` components |

There is no backend. The `uploads/` folder is gitignored for local assets; `screenshots/` holds mobile audit captures.

---

## Run locally

The JSX files are fetched over HTTP and transpiled in the browser, so you need a local server — opening `index.html` directly (`file://`) will not work reliably.

**Python 3**

```bash
cd Personal_Portfolio
python -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

**Node (npx)**

```bash
npx serve .
```

Any static file server on the repo root is fine. No `npm install` required.

---

## Repository structure

```
Personal_Portfolio/
├── index.html              # Shell, global chrome CSS, script tags
├── src/
│   ├── App.jsx             # Direction + view tabs, stage routing
│   ├── data.jsx            # RESUME — single source of truth
│   ├── PixelArt.jsx        # Shared SVG pixel-art components
│   ├── DirectionTerminal.jsx
│   ├── DirectionEditorial.jsx
│   └── DirectionSchematic.jsx
├── screenshots/            # Mobile layout audit images
└── uploads/                # Local-only assets (gitignored)
```

Each `Direction*.jsx` exports a component that accepts `view` (`site` | `cases` | `resume`) and `data` (the `RESUME` object), then renders the matching sub-view internally.

---

## Author

**Teghveer Singh Ateliey** — Mechatronics Engineer · embedded systems, robotics, firmware, full-stack.

[LinkedIn](https://linkedin.com/in/teghveerateliey) · [GitHub](https://github.com/Tegh25) · [X](https://x.com/Tegh25)
