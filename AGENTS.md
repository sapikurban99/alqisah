<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Overview

Y2K pixel-art wedding invitation + F1 checkpoint racing game ("AlQiSAH", Aldi & Qisty). Single-page Next.js 16 app with three modes: mode selector, invitation flow (cover/couple/event/gallery/rsvp), and canvas racing game with wedding-info checkpoints.

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
│   ├── layout.tsx          # Root layout, both fonts, viewport lock
│   ├── page.tsx            # Renders <WeddingInvitation />
│   └── globals.css         # Tailwind v4 + Y2K pixel design system
├── components/
│   ├── WeddingInvitation.tsx  # Main container — mode/section routing + audio clicks
│   ├── ModeSelector.tsx       # Pixel-art home screen
│   ├── CoverSection.tsx       # "Save the Date" cover
│   ├── CoupleSection.tsx      # Bride & groom info
│   ├── EventSection.tsx       # Akad & resepsi + countdown + maps/calendar links
│   ├── GallerySection.tsx     # Photo grid + lightbox
│   ├── GameSection.tsx        # Canvas F1 game with checkpoint popups
│   ├── RsvpSection.tsx        # RSVP form + wishes board
│   └── WeddingGame.tsx        # DEAD CODE — unused wrapper, do not use
└── utils/
    └── audio.ts            # audioManager singleton (playClick etc.)
```

- `WeddingInvitation` owns all mode/section state — child sections receive callbacks, not state. Game states: `"start" | "playing" | "checkpoint" | "end"`.
- `GameSection` is the only canvas component (fixed 380×640 internal resolution). Checkpoint flow: car crosses marker → `gameSpeedRef = 0`, state → `"checkpoint"`, popup shows → continue button restores `INITIAL_SPEED` and resumes loop.
- All components are `"use client"` — no server components besides layout.
- `CLAUDE.md` just re-exports this file (`@AGENTS.md`) — edit here only.

## Key Conventions

- **Path alias**: `@/*` maps to `./src/*`
- **Fonts**: Courier Prime (`--font-courier`, body) + Press_Start_2P (`--font-pixel`, headings/labels). Use the `.font-pixel` helper class or `style={{ fontFamily: "var(--font-pixel), monospace" }}` — never hardcode the font stack.
- **Pixel design system** (in `globals.css`, use these — don't invent new styles): `.pixel-box` / `-pink` / `-amber` / `-emerald` for cards, `.pixel-btn*` variants for buttons, `.pixel-input` for form fields, `.pb-safe` / `.pt-safe` for safe-area padding.
- **Viewport**: Locked (no zoom) via `Viewport` export in `layout.tsx`. `lang="id"` (Indonesian).
- **Assets**: All in `public/wedding/`. Navbar icons are `nav-{heart,star,frame,envelope,play}.png` (map to couple/event/gallery/rsvp/game). Game sprites are `f1-*` (bg/arch/podium) + `obstacle-*` (cone/tires/sign/flag/light) + `sprite-car-full.png` (player car). Generated from `Asset Wedding/` originals via root `*.py` scripts — edit sources, not outputs.
- **Tailwind v4**: Uses `@import "tailwindcss"` syntax, not `@tailwind` directives. Theme tokens in `globals.css` via `@theme inline`.

## Gotchas

- Pixel-art images must use `.pixelated` class or `style={{ imageRendering: "pixelated" }}` or they render blurry.
- `GameSection` preloads sprites into `imagesRef` via `new window.Image()` — guard every `drawImage` with an existence check; first frames render fallbacks.
- Canvas loop uses `requestAnimationFrame` — always `cancelAnimationFrame` in the effect cleanup.
- Web Audio (jump/checkpoint/victory sounds + `audioManager`) throws before user gesture — keep all audio calls inside `try/catch` or user-event handlers.
- Global CSS sets `user-select: none`, `overflow: hidden` on body, and `touch-action: manipulation` — invitation sections scroll via their own `overflow-y-auto` containers, not the page.
