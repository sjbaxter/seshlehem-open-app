# Seshlehem Open — UI Reference

This document captures the approved visual mock-up and should be used together with the product requirements. It is design direction, not a pixel-perfect specification.

## Overall visual language
- Mobile-first phone UI.
- Golf/dark green primary chrome and accents.
- White/light content cards.
- Rounded cards, controls and buttons.
- Subtle shadows and generous spacing.
- Bold, readable sans-serif headings.
- High contrast suitable for outdoor use.
- Large touch controls.
- Minimal clutter.
- Persistent bottom navigation.
- Use course imagery sparingly, mainly on overview/summary surfaces rather than score-entry forms.

## Screen 1 — Home / Overview
Purpose: give the player immediate trip context and the fastest route back into scoring.

Suggested structure:
1. Dark green header with **Seshlehem Open** and current trip (e.g. Moray 2026).
2. Current/next round card with course, date/status, group/tee time where known.
3. Large primary **Continue Scoring** button when a round is active.
4. Compact live leaderboard preview (top 3 plus link to full board).
5. Small cards for overall standings / birdies / 2s.
6. Bottom navigation.

The home screen should feel like a trip dashboard, not an admin dashboard.

## Screen 2 — Leaderboard
Provide tabs/segmented control for:
- Current round / Day 1 / Day 2 as appropriate
- Overall

Daily leaderboard rows:
- position
- player
- holes completed
- Stableford points, visually dominant
- optional gross total

Overall leaderboard rows:
- position
- player
- per-round points
- total, visually dominant

Highlight the selected player subtly. Use tied positions clearly (T1 etc.) where applicable.

## Screen 3 — Scorecard
Traditional scorecard information presented comfortably on a phone rather than as a wide desktop table.

Each hole should expose:
- hole number
- par
- SI
- gross
- strokes received
- Stableford points

Show front-nine, back-nine and total summaries. A horizontally dense 18-column golf card is not required; vertical rows/cards are acceptable and likely better on phones.

## Screen 4 — Enter Score
This is the most important screen and should be the simplest.

Top context:
- round / course
- **Hole N** prominently
- Par • SI • yardage
- e.g. `You receive 1 shot`

Score control:
- large easy-to-tap gross score values or +/- control
- selected gross score visually obvious
- Pick Up / NR available without being easy to hit accidentally

Immediate feedback after selection:
- Stableford points
- gross result label such as Birdie / Par / Bogey where relevant

Bottom actions:
- Previous Hole
- Save & Next / Next Hole

Avoid menus, modals and extra confirmation taps in the normal scoring path.

## Screen 5 — Stats / Side Competitions
Keep the tone fun and simple.

Primary cards:
### Birdies
Rank players by gross birdies.

### 2s
Rank players by gross scores of exactly 2 on **any hole**.

Optional later cards:
- eagles+
- pars
- biggest blow-up
- front/back-nine performance

Do not let optional novelty statistics complicate core scoring.

## Screen 6 — Trip Summary / Awards
After the final round, show a shareable-feeling summary page:
- Seshlehem Open overall champion
- winner's total points and round breakdown
- Day 1 winner
- Day 2 winner
- Birdie leader
- 2s leader
- optional fun awards later

This can be designed so a screenshot looks good in the group chat.

## Bottom navigation
Recommended five items:
1. Home
2. Leaderboard
3. Scorecard
4. Stats
5. More

`More` includes:
- Groups
- Change Player
- Admin (for admin users)
- Trip/course details as needed

## Admin UI
Admin pages do not need the polish of the scoring/leaderboard views. Keep them functional, clear and phone-usable:
- players / handicaps
- trip
- courses / tees / holes
- rounds
- groups / tee times
- score corrections

## Outdoor usability checklist
- Do not rely on hover.
- Aim for touch targets around 44px minimum.
- Avoid low-contrast grey-on-white text for critical values.
- Keep the currently selected score unmistakable.
- Do not require horizontal scrolling for primary tasks.
- Keep scoring usable one-handed where practical.
- Make save failures impossible to miss.

## Naming
The application/competition brand is **Seshlehem Open**. Course/trip labels such as **Moray 2026**, **Moray Old**, and **Moray New** are data and must not be baked into generic component names or business logic.
