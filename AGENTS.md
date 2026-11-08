# AGENTS.md

## Project

"Goodora-Volunteer" — volunteer website frontend. Next.js 16.4.5 App Router (under `src/app`) + React 19 + TypeScript strict + Tailwind CSS v4 + shadcn/ui ("base-nova" style, configured in `components.json`). No tests, no CI, no formatter config.

## Commands

- `npm run dev` — dev server (port 3000). `npm run build` / `npm run start`.
- `npm run lint` — runs bare `eslint` (flat config in `eslint.config.mjs`).
- Typecheck: `npx tsc --noEmit` — there is **no** typecheck script.
- Path alias `@/*` → `src/*` (see `tsconfig.json`).

## Framework quirks (all set in `next.config.ts`)

- **`cacheComponents: true`**: pages/requests that read dynamic data (`cookies()`, `headers()`, search params, uncached fetches) must be wrapped in `<Suspense>` with explicit caching (`"use cache"`, `cacheLife`, etc.). If you don't know this Next feature, read the docs before fighting build errors. See the doc note at the bottom of this file.
- **`reactCompiler: true`** (babel-plugin-react-compiler): memoization is compiler-managed. Don't sprinkle `useMemo`/`useCallback`/`React.memo` unless optimizing something the compiler can't see.
- **Tailwind v4, CSS-first**: there is no `tailwind.config`. All tokens are defined in `src/app/globals.css` via `@theme inline` + oklch CSS variables (light/dark via `@custom-variant dark`). Tailwind is loaded through a Turbopack rule (`@tailwindcss/turbopack`) in `next.config.ts`, not PostCSS — add loaders there, not a PostCSS config.
- **shadcn/ui**: pre-installed components live in `src/components/ui/` (~70 of them). Add new ones with `npx shadcn@latest add <name>`; `components.json` controls style/aliases. Note `shadcn` and `@shadcn/react` are runtime dependencies and `globals.css` imports `shadcn/tailwind.css` — don't remove them.
- `next-env.d.ts` and `.next/` types are generated — never edit; they're referenced in `tsconfig.json` includes.

## Gotchas

- **`README.md` contains unresolved Git merge-conflict markers** (upstream create-next-app boilerplate vs. project title). Don't trust it as documentation.
- Repo history is divergent/messy (two unrelated "Initial commit" roots, remote merge). Don't rebase or clean history without being asked.
- `src/app/page.tsx` is currently a near-empty shell; the real UI work is ahead. The heavy `src/components/ui/` library is pre-installed scaffold, not app code — don't treat it as dead code to delete.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
