# Seshlehem Open

A lightweight, mobile-first golf trip scoring app for the **Seshlehem Open**.

Phase 0 establishes the React application shell and Cloudflare Worker foundation. Competition data, scoring, leaderboards and administration belong to later phases in `TECHNICAL_IMPLEMENTATION_PLAN.md`.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- TanStack Query
- Cloudflare Worker and Worker Static Assets
- Vitest + React Testing Library

## Requirements

- Node.js 20.19 or newer (Node.js 22 LTS is recommended)
- pnpm 10 or newer

No Cloudflare account, D1 database or environment variables are required for Phase 0 local development.

## Local development

From the repository root:

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173`. The command starts both Vite and the local Wrangler Worker; Vite proxies `/api/*` to the Worker at `http://localhost:8787`.

Verify the API separately with:

```bash
curl http://localhost:8787/api/health
```

The response is:

```json
{"status":"ok"}
```

To run only one local process:

```bash
pnpm dev:web
pnpm dev:api
```

Run those commands in separate terminals when using them together.

## Validation

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

`pnpm build` creates the frontend production assets in `dist/` and performs a dry-run Worker deployment bundle. It does not deploy or require Cloudflare credentials.

## Project references

Read these before substantial implementation work:

1. `GOLF_TRIP_APP_REQUIREMENTS.md`
2. `TECHNICAL_IMPLEMENTATION_PLAN.md`
3. `docs/UI_REFERENCE.md`
4. `AGENTS.md`

The technical plan is the source of truth for architecture. Phase 1 begins only after this foundation is reviewed.
