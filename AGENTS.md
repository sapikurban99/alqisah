<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Overview

Pastel Retro Console wedding invitation + checkpoint racing game ("AlQiSAH", Aldi & Qisti). Single-page Next.js 16 app with five card-based RPG screens (Home/Player Select/Pit Stop/Gallery/RSVP) plus canvas F1 mini-game. Mobile-first 480px wrapper centered on desktop (body flex, dot pattern), pastel palette #ff6b97/#0051d5/#674bb5/#fbf9f5.

## Commands

```bash
npm run dev      # dev server on localhost:3000
npm run build    # production build (Turbopack) — also the typecheck
npm run lint     # eslint
```

No test suite exists. No typecheck script — use `npm run build` to verify types. If UI looks stale after edits, clear cache: `rm -rf .next node_modules/.cache`, rebuild, then hard-refresh the browser.

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout, Rubik + Plus Jakarta Sans, viewport lock, Material Symbols
│   ├── page.tsx            # Renders <WeddingInvitation />
│   └── globals.css         # Tailwind v4 + Pastel Retro Console design system (480 wrapper, soft shadows)
├── components/
│   ├── WeddingInvitation.tsx  # Main container — mobile-wrapper 480 + mode/section routing + fixed bottom-nav
│   ├── ModeSelector.tsx       # Pastel Home (ROMANCE.EXE + heart garland + car + countdown + CTAs)
│   ├── CoverSection.tsx       # Save the Date (same pastel, single CTA fallback)
│   ├── CoupleSection.tsx      # Player Select (P1/P2 cards + synergy + QS Ar-Rum:21)
│   ├── EventSection.tsx       # Pit Stop (quest log + countdown + Stage 01/02 + venue + calendar)
│   ├── GallerySection.tsx     # Photo Finish (cutscene grid auto-fit + lightbox)
│   ├── GameSection.tsx        # Canvas F1 game (380×640) with pastel header
│   └── RsvpSection.tsx        # Race Control terminal (stepper pax 1-2 + wishes feed)
└── utils/
    └── audio.ts            # audioManager singleton (playClick etc.)
```

- `WeddingInvitation` owns all mode/section state — child sections receive callbacks, not state. Flow: selector → cover → couple → event/gallery/rsvp; bottom navbar (hidden on cover) includes a Home button back to the selector. Game states: `"start" | "playing" | "checkpoint" | "end"`.
- `GameSection` is the only canvas component (fixed 380×640 internal resolution). Checkpoint flow: car crosses marker → `gameSpeedRef = 0`, state → `"checkpoint"`, popup shows → continue button restores `INITIAL_SPEED` and resumes loop.
- All components are `"use client"` — no server components besides layout. Date target is `Jumat, 18 September 2026` (Asia/Jakarta).
- `CLAUDE.md` just re-exports this file (`@AGENTS.md`) — edit here only.

## Key Conventions

- **Path alias**: `@/*` maps to `./src/*`
- **Fonts**: Rubik (`--font-rubik`, headings/labels) + Plus Jakarta Sans (`--font-jakarta`, body). Use the `.font-rubik` helper class — never hardcode the font stack. Material Symbols Outlined via CDN for icons.
- **Pastel Retro Console design system** (in `globals.css`, use these — don't invent new styles): `.mobile-wrapper` (480px centered card, `box-shadow 0 0 20px rgba(0,0,0,0.1)`), `.gallery-grid` (`repeat(auto-fit, minmax(150px,1fr)) gap 16px`), `body` flex center `min-height 100vh` + dot pattern, `word-wrap:break-word` for long texts, `width:100% box-sizing:border-box` for inputs, `.bottom-nav` fixed `max-width:480px` + `.main-content pb-80`. Cards `rounded-xl` `shadow soft pastel`, buttons `rounded-xl` `shadow 4px 0`, `.pb-safe` / `.pt-safe` for safe-area padding. Section changes animate via `.animate-section-in`.
- **Viewport**: Locked (no zoom) via `Viewport` export in `layout.tsx`. `lang="id"` (Indonesian).
- **Assets**: All in `public/wedding/`. Game sprites are `f1-*` (bg/finish-line/podium) + `obstacle-*` (cone/tires/speed-sign/flag/light) + `sprite-car-transparent.png` (player car) + `sprite-{bride,groom}-transparent.png` (couple photos) + `Gemini_Generated…jpeg` (gallery). Originals in `Asset Wedding/` via `*.py` scripts.
- **Tailwind v4**: Uses `@import "tailwindcss"` syntax, not `@tailwind` directives. Theme tokens in `globals.css` via `@theme inline`.

## Gotchas

- Pixel-art images must use `.pixelated` class or `style={{ imageRendering: "pixelated" }}` or they render blurry.
- `GameSection` preloads sprites into `imagesRef` via `new window.Image()` — guard every `drawImage` with an existence check; first frames render fallbacks.
- Canvas loop uses `requestAnimationFrame` — always `cancelAnimationFrame` in the effect cleanup.
- Web Audio (jump/checkpoint/victory sounds + `audioManager`) throws before user gesture — keep all audio calls inside `try/catch` or user-event handlers.
- Global CSS sets `user-select: none`, `overflow: hidden` on body, and `touch-action: manipulation` — invitation sections scroll via their own `overflow-y-auto` containers, not the page.
