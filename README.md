# Seshlehem Open

A lightweight, mobile-first golf trip scoring app for the **Seshlehem Open**.

The first release is for a seven-player trip to Moray Golf Club, with separate Stableford competitions on the Old and New courses plus a combined overall leaderboard, birdie counter and 2s counter.

## Implementation direction

The app is intentionally small and should stay simple. The current technical recommendation is:

- React + TypeScript + Vite
- Tailwind CSS
- Cloudflare Worker API
- Cloudflare D1 database
- Cloudflare static asset hosting
- Vitest / React Testing Library
- Playwright for a small number of critical mobile flows

The target is a normal web browser on iPhone/Android and free-tier infrastructure. Vercel + Supabase and Azure are documented alternatives, but are not the default implementation.

## Read before coding

Codex should read these files in this order:

1. `GOLF_TRIP_APP_REQUIREMENTS.md` — product behaviour and scope
2. `TECHNICAL_IMPLEMENTATION_PLAN.md` — current architecture; this **takes precedence where it differs from the older stack references in the requirements**
3. `docs/golf-app-ui-reference.jpg` — visual direction
4. `CODEX_START_PROMPT.md` — phased implementation instructions
5. `AGENTS.md` — repository-level engineering rules

## Build approach

Do not build the whole application in one pass. Follow the phases in `TECHNICAL_IMPLEMENTATION_PLAN.md`, keeping the Stableford calculation as pure, well-tested TypeScript domain logic.

The application must remain reusable for future Seshlehem Open trips; Moray and seven players are seed data, not hard-coded assumptions.

## Status

Repository initialised with product, UX and technical specifications. Application implementation is intended to be carried out incrementally with Codex.
