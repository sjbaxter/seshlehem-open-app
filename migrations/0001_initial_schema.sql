PRAGMA foreign_keys = ON;

CREATE TABLE trips (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  start_date TEXT,
  end_date TEXT,
  active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (start_date IS NULL OR end_date IS NULL OR start_date <= end_date)
);

CREATE UNIQUE INDEX one_active_trip ON trips(active) WHERE active = 1;

CREATE TABLE players (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  short_name TEXT,
  is_admin INTEGER NOT NULL DEFAULT 0 CHECK (is_admin IN (0, 1)),
  active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1))
);

CREATE TABLE trip_players (
  id TEXT PRIMARY KEY,
  trip_id TEXT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  player_id TEXT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  default_playing_handicap INTEGER NOT NULL CHECK (default_playing_handicap BETWEEN 0 AND 72),
  UNIQUE (trip_id, player_id)
);

CREATE TABLE courses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT
);

CREATE TABLE tees (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  total_yards INTEGER CHECK (total_yards IS NULL OR total_yards > 0),
  par INTEGER CHECK (par IS NULL OR par BETWEEN 54 AND 90),
  course_rating REAL,
  slope_rating INTEGER CHECK (slope_rating IS NULL OR slope_rating BETWEEN 55 AND 155),
  UNIQUE (course_id, name)
);

CREATE TABLE holes (
  id TEXT PRIMARY KEY,
  tee_id TEXT NOT NULL REFERENCES tees(id) ON DELETE CASCADE,
  hole_number INTEGER NOT NULL CHECK (hole_number BETWEEN 1 AND 18),
  par INTEGER NOT NULL CHECK (par BETWEEN 3 AND 6),
  stroke_index INTEGER NOT NULL CHECK (stroke_index BETWEEN 1 AND 18),
  yards INTEGER CHECK (yards IS NULL OR yards > 0),
  UNIQUE (tee_id, hole_number),
  UNIQUE (tee_id, stroke_index)
);

CREATE TABLE rounds (
  id TEXT PRIMARY KEY,
  trip_id TEXT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE RESTRICT,
  tee_id TEXT NOT NULL REFERENCES tees(id) ON DELETE RESTRICT,
  round_number INTEGER NOT NULL CHECK (round_number > 0),
  name TEXT NOT NULL,
  round_date TEXT,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'in_progress', 'complete')),
  competition_type TEXT NOT NULL DEFAULT 'stableford' CHECK (competition_type = 'stableford'),
  UNIQUE (trip_id, round_number)
);

CREATE TABLE round_players (
  id TEXT PRIMARY KEY,
  round_id TEXT NOT NULL REFERENCES rounds(id) ON DELETE CASCADE,
  trip_player_id TEXT NOT NULL REFERENCES trip_players(id) ON DELETE CASCADE,
  playing_handicap INTEGER NOT NULL CHECK (playing_handicap BETWEEN 0 AND 72),
  UNIQUE (round_id, trip_player_id)
);

CREATE TABLE playing_groups (
  id TEXT PRIMARY KEY,
  round_id TEXT NOT NULL REFERENCES rounds(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  tee_time TEXT
);

CREATE TABLE group_players (
  id TEXT PRIMARY KEY,
  group_id TEXT NOT NULL REFERENCES playing_groups(id) ON DELETE CASCADE,
  round_player_id TEXT NOT NULL REFERENCES round_players(id) ON DELETE CASCADE,
  UNIQUE (group_id, round_player_id)
);

CREATE TABLE scores (
  id TEXT PRIMARY KEY,
  round_player_id TEXT NOT NULL REFERENCES round_players(id) ON DELETE CASCADE,
  hole_number INTEGER NOT NULL CHECK (hole_number BETWEEN 1 AND 18),
  gross_score INTEGER,
  picked_up INTEGER NOT NULL DEFAULT 0 CHECK (picked_up IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (round_player_id, hole_number),
  CHECK (
    (picked_up = 1 AND gross_score IS NULL)
    OR (picked_up = 0 AND gross_score BETWEEN 1 AND 15)
  )
);

CREATE INDEX trip_players_by_trip ON trip_players(trip_id);
CREATE INDEX rounds_by_trip ON rounds(trip_id);
CREATE INDEX holes_by_tee ON holes(tee_id);
CREATE INDEX round_players_by_round ON round_players(round_id);
CREATE INDEX groups_by_round ON playing_groups(round_id);
CREATE INDEX scores_by_round_player ON scores(round_player_id);
