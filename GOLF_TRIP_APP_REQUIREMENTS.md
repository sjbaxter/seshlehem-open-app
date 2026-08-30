# Seshlehem Open — Product Requirements

## 1. Purpose
Build a lightweight, fun, mobile-first golf scoring web app for the **Seshlehem Open**. The first use is a seven-player, two-round trip to Moray Golf Club. Each day is a separate individual Stableford competition and there is also a combined overall leaderboard.

The app is for friends, not a commercial product. Priorities are fast score entry, correct Stableford scoring, shared leaderboards and easy reuse in future years.

## 2. Initial trip
- Competition/group name: **Seshlehem Open**
- Initial trip: Moray 2026
- Round 1: Moray Golf Club — Old Course
- Round 2: Moray Golf Club — New Course
- Players: 7 initially, but player count must not be hard-coded
- Format: Individual Stableford
- Separate daily winners plus combined two-day overall winner
- Birdie counter
- Gross 2s counter — a score of 2 counts on **any hole**, not only par 3s

## 3. Target platform
- Normal mobile web browser on iPhone and Android
- Primary design width: 360–430px
- Desktop/tablet support is secondary
- No native App Store/Play Store app is required
- No offline score sync is required

## 4. User identification
There is deliberately no real authentication.

On first visit show **Who are you?** with the active trip players as large buttons/cards. Selecting a player stores their player ID in localStorage. Provide a Change Player action later.

A normal player can view everything and enter/edit their own scores. An admin can edit any player score and configure trips, rounds, players, handicaps, courses and groups.

This restriction is a convenience feature, not a security boundary.

## 5. Reusability
Do not hard-code Moray, seven players or two rounds into the domain model. Use a generic hierarchy roughly equivalent to:

```text
Trips
  Players
  Rounds
    Course / Tee / Holes
    Groups
    Round Players / Handicaps
    Scores
```

Moray should be seeded as the first course/trip data. Future Seshlehem Open trips must be creatable without code changes.

## 6. Player setup
Store at least:
- id
- display name
- optional initials/short name
- active flag
- admin flag

Trip/round membership must allow the handicap to be set for the competition. For MVP, the admin enters the **playing handicap** directly. Do not calculate WHS Course Handicap from Handicap Index, slope or rating.

Prefer a round-level playing-handicap snapshot so historical scores remain reproducible.

## 7. Playing groups
Each round supports configurable groups, e.g. one group of 4 and one group of 3.

Store/show:
- group name/number
- players
- optional tee time
- basic player progress where available

Players still enter their own scores individually. Admin can score for anyone.

## 8. Round setup
Each round has:
- trip
- round number
- name
- date
- course
- tee
- status: upcoming / in-progress / complete
- competition type: Stableford
- groups

Initial rounds are Moray Old and Moray New.

## 9. Course data
Seed the published Moray Old and New hole information required for scoring, including:
- hole number
- par
- stroke index
- tee yardage

Support more than one tee where useful. Admin must be able to select the tee used for each round and course/hole data must be editable for future trips.

## 10. Stableford rules
Use standard individual Stableford based on net score:

```text
points = max(0, 2 + par - netScore)
```

Equivalent outcomes:
- net double bogey or worse = 0
- net bogey = 1
- net par = 2
- net birdie = 3
- net eagle = 4
- net albatross = 5

### Handicap stroke allocation
For a positive playing handicap:

```text
baseStrokes = floor(handicap / 18)
remainder = handicap % 18
strokesOnHole = baseStrokes + (strokeIndex <= remainder ? 1 : 0)
netScore = grossScore - strokesOnHole
```

This must support handicaps over 18. Negative handicaps are not required for MVP.

## 11. Score entry
This is the most important interaction.

For the selected player and round show:
- course / round
- hole number
- par
- SI
- yardage
- strokes received on the hole
- large gross-score controls
- calculated Stableford points immediately
- simple result label where useful
- Previous / Next hole navigation

Allow gross scores approximately 1–15 plus optional Pick Up/NR. Pick Up scores 0 Stableford and does not count as birdie or 2.

Saving must persist centrally. A failed save must be obvious and must not pretend to have succeeded.

Players can revisit and edit earlier holes. Admin can edit any player's score.

## 12. Daily leaderboards
Each round has its own Stableford leaderboard showing at least:
- position
- player
- holes completed
- Stableford points
- optional gross total

Sort by Stableford points descending. During play, holes completed must be visible so partial rounds are obvious.

## 13. Overall leaderboard
Sum the Stableford points from the rounds included in the trip competition.

For Moray 2026 show columns similar to:

```text
Pos | Player | Old | New | Total
```

The overall leaderboard should update as Round 2 progresses.

## 14. Ties / countback
Countback is nice-to-have and must not delay MVP. If implemented for a daily competition use:
1. last 9
2. last 6
3. last 3
4. 18th
5. tied/manual decision if still level

Overall ties can initially display as tied.

## 15. Scorecards
Users can view any player's full round scorecard with:
- hole
- par
- SI
- gross
- strokes received
- Stableford points
- front nine / back nine / total summaries where practical

## 16. Statistics
MVP statistics:
- birdies by player
- gross 2s by player, on any hole

Do not store these as manually entered values; derive them from gross scores and hole par.

Later optional stats:
- eagles+
- pars / bogeys / doubles
- blow-up hole
- best/worst hole
- awards and historical trip records

## 17. Home screen
Mobile dashboard should prioritise:
- Seshlehem Open / trip name
- current or next round
- player's group / tee time where configured
- quick Continue Scoring action
- compact round leaderboard preview
- overall leaderboard preview
- birdies / 2s summary

## 18. Navigation
Suggested mobile bottom navigation:
1. Home
2. Leaderboard
3. Scorecard
4. Stats
5. More

Admin lives under More/Admin rather than occupying primary navigation.

## 19. Visual direction
Use a clean golf-oriented design inspired by the approved mock-up:
- dark/golf green framing and accents
- white/light cards
- rounded cards/buttons
- subtle shadows
- large touch targets
- high contrast for outdoor use
- sparse golf imagery rather than decorative clutter
- persistent, comfortable bottom navigation
- leaderboard readability at a glance

Do not aim for pixel-perfect reproduction; usability on a phone while playing is the priority.

## 20. Data model (logical)
Use tables/entities equivalent to:
- trips
- players
- trip_players
- courses
- tees
- holes
- rounds
- groups
- group_players
- round_players
- scores

Recommended score uniqueness: one score per `round_player + hole`.

Do not persist Stableford points unless there is a compelling reason; derive them from score, par, SI and snapshotted playing handicap so edits recalculate consistently.

## 21. Data integrity
- one score per player/hole/round
- hole number 1–18
- score edits overwrite rather than append duplicate scoring records
- leaderboard totals derive from persisted source scores
- normal UI only edits selected player's score
- admin UI may edit everyone

## 22. Required scoring tests
At minimum test:
- handicap 0
- handicap 6 on SI 1 and SI 7
- handicap 18
- handicap 20 on SI 1, 2 and 3
- handicap 36
- gross par/no stroke = 2 points
- gross bogey/one stroke = 2 points
- gross birdie with/without strokes
- net double bogey = 0
- very high gross score = 0
- gross 2 on par 3 counts as a 2
- gross 2 on par 4 counts as a 2 and gross eagle
- editing a score updates totals rather than double counting

## 23. Live behaviour
True realtime is not required. Poll leaderboards/statistics periodically while those screens are visible (roughly 10 seconds is adequate) and refresh after score saves and on window focus.

## 24. Explicitly out of scope for MVP
- email/password or social login
- secure identity/roles
- payments/kitty handling
- chat
- GPS distances / shot tracking
- course maps
- automatic WHS lookup/calculation
- offline score sync
- push notifications
- native mobile apps
- enterprise monitoring/architecture

## 25. MVP acceptance criteria
### Setup
- Admin can configure trip, players, playing handicaps, rounds and groups.
- Moray Old/New scoring data is seeded and editable.
- Tee can be selected per round.

### Player access
- User selects name without login.
- Selection persists locally and can be changed.

### Scoring
- Player enters/edits each hole gross score.
- Stableford and handicap strokes calculate correctly.
- Admin can edit any score.
- Scores are persisted centrally.

### Leaderboards / stats
- Each round leaderboard works.
- Overall leaderboard works.
- Holes completed is visible.
- Birdies and 2s derive correctly from scores.

### UI
- Core flows work comfortably at 360px width.
- Score entry takes minimal taps.
- No primary horizontal scrolling.
- Design follows the green/white mobile mock-up direction.

### Deployment
- One shareable HTTPS URL works in normal phone browsers.
- Deployment is viable on free infrastructure for this usage level.
- README contains local setup and deployment instructions.
