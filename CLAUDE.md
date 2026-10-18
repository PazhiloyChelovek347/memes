# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal story as a swipeable "card book". React 19 + Vite, plain JS (JSX, types via JSDoc in `src/types/story.js`), static site for GitHub Pages. Code comments and user-facing text are in Russian.

## Commands

```bash
npm run dev      # http://localhost:5173 ; add ?demo to render the demo story with every block type
npm run build    # → dist/
npm run lint     # ESLint (CI runs lint before build — keep it clean)
npm run preview
```

There are no tests. Verify changes in the browser; in dev mode `validateStory` (`src/lib/story.js`) prints console warnings for duplicate/missing ids, unknown block types and conditions referencing nonexistent ids.

## Architecture

**Data-driven story.** Content lives only in `src/data/story.js` (main) and `src/data/demo.js` (all block types, the field reference). `getActiveStory()` picks one by the `?demo` query param. A story is `{ id, pages: [{ id, blocks: [...] }] }`; each block has `id` and `type`. Page/block ids are persisted keys (progress, conditions, future reactions) — never rename existing ids.

**Rendering pipeline.** `App` → `StoryPage` → `BlockRenderer`, which looks up `block.type` in `src/components/blocks/registry.js`, checks `visibleWhen`, and wraps the component in a `div` with `data-content-id="<storyId>:<blockId>"` (hook point for future likes). Block components receive only `{ block }`. Adding a block type = new component + one registry line.

**Progress state.** `useStoryProgress(story)` is the single source of state (current page, activated block ids, choice answers, tap counts), persisted to localStorage via `usePersistentState` under `story:<storyId>:*` keys. It is exposed through `ProgressContext`; blocks read it with `useProgress()` (see `blocks/custom/ExampleCustomBlock.jsx`) — don't prop-drill.
- `visibleWhen` conditions (`clicked`, `all`, `oneFrom`, `not`, nestable) are evaluated in `src/lib/conditions.js` against activated ids.
- A page with any `allowNext: true` blocks is locked until at least one of them is activated (`isPageUnlocked`).
- Navigation: buttons, swipe (`useSwipe`), arrow keys (`useArrowKeys`). No router — page index lives in state, so `base: './'` in `vite.config.js` works from any subfolder.

**Reactions service.** `src/services/reactions/` defines an interface (`types.js`) with a localStorage stub; `index.js` is the single place to swap in a future Supabase implementation. Env vars are read only in `src/config/env.js` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`; see `.env.example`, local values in `.env.local`).

**Styling.** Plain CSS in `src/styles/`; colors, sizes and animation timings are design tokens in `tokens.css`. Navigation labels are in `src/data/ui.js`. Images go in `public/images/` and are referenced as `src: 'images/name.jpg'` (resolved via `lib/assetUrl.js`).

## Deploy

Push to `main` → `.github/workflows/deploy.yml` (npm ci, lint, build, deploy `dist` to GitHub Pages).
