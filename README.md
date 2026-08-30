# Seshlehem Open

A lightweight, mobile-first golf trip scoring app for the **Seshlehem Open**.

Phase 1 adds the D1 data foundation, reproducible Moray course seed, repository layer and read-only setup APIs. Scoring, leaderboards and administration belong to later phases in `TECHNICAL_IMPLEMENTATION_PLAN.md`.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- TanStack Query
- Cloudflare Worker and Worker Static Assets
- Cloudflare D1 with SQLite migrations
- Vitest + React Testing Library

## Requirements

- Node.js 20.19 or newer (Node.js 22 LTS is recommended)
- pnpm 10 or newer

No Cloudflare account or environment variables are required for local development. Wrangler creates the local D1 database under `.wrangler/`.

## Local development

From the repository root:

```bash
pnpm install
pnpm db:setup
pnpm dev
```

Open `http://localhost:5173`. The command starts both Vite and the local Wrangler Worker; Vite proxies `/api/*` to the Worker at `http://localhost:8787`.

`pnpm db:setup` applies all pending migrations and seeds the Moray 2026 trip, Old/New courses, and Gold/Blue tees. The seed is safe to run repeatedly. Gold is the initial tee selected for both seeded rounds; Blue remains available for later configuration.

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

## Local database commands

```bash
pnpm db:migrate
pnpm db:seed
pnpm db:setup
```

- `db:migrate` applies pending migrations to the local D1 database.
- `db:seed` inserts or updates the reproducible Moray seed without duplicating rows.
- `db:setup` runs both commands in order.

To start from an empty local database, stop Wrangler, delete the ignored `.wrangler/` directory, then run `pnpm db:setup` again. This deletes local development data only.

## Phase 1 read API

The local Worker exposes:

- `GET /api/health`
- `GET /api/trips/active`
- `GET /api/trips/:tripId`
- `GET /api/trips/:tripId/players`
- `GET /api/courses`
- `GET /api/courses/:courseId`
- `GET /api/rounds/:roundId`

The initial trip intentionally has no players because names and handicaps have not been supplied. They can be added through later admin/dev setup without changing the generic schema.

## Cloudflare configuration

Local D1 uses the placeholder database ID in `wrangler.jsonc`. Before remote deployment, create the production database and replace that placeholder with the returned ID:

```bash
pnpm wrangler d1 create seshlehem-open-db
```

Do not commit Cloudflare API tokens or other credentials.

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

The technical plan is the source of truth for architecture. Phase 2 begins only after this data foundation is reviewed.
