# Seshlehem Open

A lightweight, mobile-first golf trip scoring app for the **Seshlehem Open**.

Phase 0 establishes the application foundation defined in `TECHNICAL_IMPLEMENTATION_PLAN.md`: React + TypeScript + Vite, Tailwind CSS, React Router, TanStack Query, and a Cloudflare Worker API. Database/schema work starts in Phase 1.

## Prerequisites

- Node.js 22 LTS or newer
- npm 10 or newer
- A Cloudflare account is only required when you want to deploy; local development works without a D1 database in Phase 0.

## Local development

Install dependencies once:

```bash
npm install
```

Start the Vite frontend and local Cloudflare Worker together:

```bash
npm run dev
```

Open:

- App: `http://localhost:5173`
- Worker directly: `http://localhost:8787`
- Health check through the app dev proxy: `http://localhost:5173/api/health`

The Vite dev server proxies `/api/*` to Wrangler on port 8787, matching the production same-origin API shape.

If you prefer separate terminals:

```bash
npm run dev:worker
```

and:

```bash
npm run dev:web
```

## Quality checks

Run the Phase 0 quality gates with:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The production frontend is written to `dist/`. GitHub Actions runs the same validation commands on pushes and pull requests.

## Production preview

Build first, then run the worker with the built static assets:

```bash
npm run build
npx wrangler dev
```

Open `http://localhost:8787` and verify both the SPA and `/api/health`.

## Deployment

Authenticate Wrangler once:

```bash
npx wrangler login
```

Then deploy the Phase 0 Worker and static assets:

```bash
npm run deploy
```

No secrets belong in browser code or in the repository. Cloudflare D1 configuration will be added in Phase 1.

## Current structure

```text
src/                 React application
  app/               app shell and routes
  styles/            Tailwind/global styles
  test/              shared test setup
worker/              Cloudflare Worker API
.github/workflows/    CI validation
wrangler.jsonc        local/production Worker config
```

## Phase status

- **Phase 0 — Foundation:** implemented
- **Phase 1 — Data foundation:** not started
- Later scoring, leaderboards, groups/stats/admin and polish phases remain intentionally untouched.

Read `CODEX_START_PROMPT.md`, `GOLF_TRIP_APP_REQUIREMENTS.md`, `TECHNICAL_IMPLEMENTATION_PLAN.md`, `docs/UI_REFERENCE.md`, and `AGENTS.md` before substantial implementation work.
