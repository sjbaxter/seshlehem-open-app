# Codex Start Prompt — Seshlehem Open

Read these files completely before changing code:

1. `GOLF_TRIP_APP_REQUIREMENTS.md`
2. `TECHNICAL_IMPLEMENTATION_PLAN.md`
3. `docs/UI_REFERENCE.md`
4. `AGENTS.md`

Act as the lead developer for this project.

The goal is a lightweight mobile web app for a small group of friends playing the Seshlehem Open. The first trip has seven players playing Moray Old and Moray New as separate Stableford competitions, with a combined overall leaderboard plus birdie and gross-2 counters.

The app must work in normal phone browsers, store shared scores centrally and be deployable on free infrastructure.

Follow `TECHNICAL_IMPLEMENTATION_PLAN.md` as the current architecture: **React + TypeScript + Vite, Cloudflare Worker API and Cloudflare D1** unless you discover a concrete blocker. Older Next.js/Supabase/Vercel references in product history are superseded by the technical plan.

Do not implement the whole application in one large change.

## First task
1. Inspect the repository and specifications.
2. Produce a concise checklist for Phase 0.
3. Identify genuine contradictions/blockers only; do not reopen settled architecture decisions just to suggest alternatives.
4. Implement **Phase 0 only** from `TECHNICAL_IMPLEMENTATION_PLAN.md`.
5. Run lint, typecheck, unit tests and production build.
6. Fix failures before stopping.
7. Update `README.md` with exact local-development instructions.
8. Summarise changed files and validation commands/results.

## Important constraints
- Prioritise correct scoring and simple code over abstraction.
- No real authentication.
- No Redux, GraphQL, microservices or websocket infrastructure.
- Stableford calculations must be pure TypeScript with strong unit tests once the scoring phase begins.
- Do not hard-code Moray, seven players or two rounds into generic business logic.
- Seed Moray only as initial data.
- Primary UI target is 360–430px phone screens.
- No offline score synchronisation.
- Polling is sufficient for shared leaderboards.
- Never expose secrets in browser code.

After Phase 0 is stable, stop for review before beginning Phase 1.
