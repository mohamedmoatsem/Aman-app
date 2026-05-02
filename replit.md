# أمان (Aman) — Mental Health Support App

## Overview

Bilingual Arabic/English mobile-first safety support web app (React+Vite + Express + PostgreSQL) with AI mental health features. Built as a pnpm workspace monorepo.

## Architecture

- **Frontend**: `artifacts/aman-app` — React + Vite (port via `$PORT`), RTL Arabic/English, Tailwind CSS
- **API Server**: `artifacts/api-server` — Express 5 on port 8080
- **Dashboard**: `artifacts/aman-dashboard` — Streamlit on port 5000 at `/dashboard`
- **AI**: Gemma 4 (`gemma-4-26b-a4b-it`) via `@google/generative-ai` — env var: `Gemini_API_KEY`

## Key Routes

### Frontend
- `/` — Home (mood tracker, JITAI, subscribe)
- `/chat` or `/assistant` — AI mental health assistant (Gemma 4)
- `/resources` — Articles & mental health library
- `/workshops` — Community workshops
- `/community` — Community posts
- `/depression` — Depression recovery (CBT/DBT techniques)
- `/stats` — Live DB-driven statistics with animated counters
- `/video` — 2-minute animated Arabic explainer

### API (`/api/...`)
- `POST /chat` — Gemma 4 AI chat (Sudanese dialect, PTSD/EMDR techniques)
- `POST /mood` — Log mood; `GET /mood/history/:userId` — history
- `GET /jitai/:userId` — Smart intervention check; `POST /jitai/accepted`
- `GET /stats` — Live analytics (users, sessions, mood trends)
- `POST /subscribe` — Email subscription (→ `subscriptions` table)
- `GET /community`, `POST /community` — Community posts
- `GET /workshops` — Workshops list
- `GET /healthz` — Health check

## Important Notes

- DB table `subscriptions` (not `subscribers`) — use raw SQL for this
- `community_posts` has `author_id` (int), not `authorName` (text) — use raw SQL
- Drizzle schema may not match live DB exactly — prefer raw SQL for legacy tables
- Gemma responds with chain-of-thought; `extractFinalReply()` in `chat.ts` cleans it up
- `Gemini_API_KEY` env var (capital G)
- JITAI triggers after 3 consecutive low-mood days (score ≤ 2)
- Sudan time = UTC+3 (used in mood logs)
- Device ID stored in `localStorage` as `aman_device_id`

## Workspace

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/<modelname>.ts` — table definitions with `drizzle-zod` insert schemas (no models definitions exist right now)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `artifacts/aman-dashboard` (Python/Streamlit)

Python Streamlit dashboard for advanced psychological support features. Accessible at `/dashboard/` (proxied via Vite dev server from port 5000).

- Entry: `app.py` — main page with Gemma 4 mood classification (DBT/MCT routing)
- Pages:
  - `pages/1_🆘_ركن_الطوارئ.py` — DBT Emergency Corner with TIPP exercises (breathing timer, temperature exercises, distress tolerance tips in Sudanese Arabic)
  - `pages/2_📦_صندوق_القلق.py` — MCT Worry Box with scheduled worry viewing window (JSON-backed storage)
  - `pages/3_🎯_تمرين_الانتباه.py` — Attention Training Technique with audio and visual stimuli
  - `pages/4_📚_المقالات.py` — Swipe card article browser (DBT/MCT filtered)
- Utils: `utils/gemma.py` (Gemma 4 API), `utils/storage.py` (worry JSON CRUD)
- Data: `data/articles.json` (6 swipe cards), `data/worries.json` (worry storage)
- Workflow: `artifacts/aman-dashboard: Streamlit App` — runs on port 5000 with `--server.baseUrlPath /dashboard`
- Vite proxy: `/dashboard` → `localhost:5000` (with WebSocket support)
- Packages installed system-wide: `streamlit`, `google-genai` (via `--break-system-packages`)

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.
