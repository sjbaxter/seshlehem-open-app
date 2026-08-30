# AGENTS.md

## Project goal
Build the Seshlehem Open as a lightweight mobile web app for a small group of friends. Optimise for correctness, simplicity and fast phone score entry rather than enterprise architecture.

## Source of truth
Read these before substantial changes:
1. `GOLF_TRIP_APP_REQUIREMENTS.md`
2. `TECHNICAL_IMPLEMENTATION_PLAN.md`
3. `docs/UI_REFERENCE.md`

Where the requirements file mentions the older Next.js/Supabase/Vercel idea, the newer `TECHNICAL_IMPLEMENTATION_PLAN.md` takes precedence: use React + TypeScript + Vite with Cloudflare Worker + D1 unless there is a concrete blocker.

## Engineering rules
- Keep Stableford and handicap calculations in pure TypeScript functions with comprehensive unit tests.
- Do not hard-code Moray, seven players or two rounds into generic domain logic.
- Moray data is seed data only.
- No real authentication is required. Player identity is selected locally; admin security is intentionally lightweight.
- Do not add Redux, GraphQL, microservices, websockets, CQRS, containers or other infrastructure unless a later requirement genuinely needs it.
- No offline score synchronisation in MVP.
- Prefer polling for leaderboard freshness.
- Keep UI mobile-first and usable at 360–430px widths.
- Large touch targets, high contrast and minimal taps are more important than dense desktop layouts.
- Avoid exposing secrets to browser code.
- Use migrations and seed scripts so a new environment can reproduce the database.

## Quality gates
Before declaring a phase complete, run and fix:
- lint
- TypeScript typecheck
- unit tests
- production build

For scoring-related phases, tests for handicap allocation and Stableford are mandatory before UI work is considered complete.

## Change discipline
Work incrementally. Do not implement multiple major phases in one uncontrolled change. Keep README setup/deployment instructions current as the implementation evolves.
