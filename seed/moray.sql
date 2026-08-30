-- Moray Golf Club data transcribed from the club scorecards supplied for this project.
-- Old: https://static1.squarespace.com/static/68e7847f0c309c1ca55449e5/t/693151039a9b617bbe93ed90/1764839683248/78410+Moray+%28Old+Course%29+6PG.pdf
-- New: https://static1.squarespace.com/static/68e7847f0c309c1ca55449e5/t/6936e3632ac85c014abecd4e/1765204835689/80565+Moray+%28New+Course%29+6PG+Digi.pdf

INSERT INTO courses (id, name, location) VALUES
  ('course-moray-old', 'Moray Golf Club - Old Course', 'Lossiemouth, Scotland'),
  ('course-moray-new', 'Moray Golf Club - New Course', 'Lossiemouth, Scotland')
ON CONFLICT(id) DO UPDATE SET name = excluded.name, location = excluded.location;

INSERT INTO tees (id, course_id, name, total_yards, par, course_rating, slope_rating) VALUES
  ('tee-moray-old-gold', 'course-moray-old', 'Gold', 6572, 71, 72.5, 128),
  ('tee-moray-old-blue', 'course-moray-old', 'Blue', 6228, 71, 71.0, 125),
  ('tee-moray-new-gold', 'course-moray-new', 'Gold', 6042, 70, 69.4, 118),
  ('tee-moray-new-blue', 'course-moray-new', 'Blue', 5772, 70, 68.4, 115)
ON CONFLICT(id) DO UPDATE SET
  course_id = excluded.course_id,
  name = excluded.name,
  total_yards = excluded.total_yards,
  par = excluded.par,
  course_rating = excluded.course_rating,
  slope_rating = excluded.slope_rating;

INSERT INTO holes (id, tee_id, hole_number, par, stroke_index, yards) VALUES
  ('hole-moray-old-gold-01', 'tee-moray-old-gold', 1, 4, 12, 316),
  ('hole-moray-old-gold-02', 'tee-moray-old-gold', 2, 5, 3, 481),
  ('hole-moray-old-gold-03', 'tee-moray-old-gold', 3, 4, 8, 397),
  ('hole-moray-old-gold-04', 'tee-moray-old-gold', 4, 3, 13, 193),
  ('hole-moray-old-gold-05', 'tee-moray-old-gold', 5, 4, 6, 413),
  ('hole-moray-old-gold-06', 'tee-moray-old-gold', 6, 3, 17, 146),
  ('hole-moray-old-gold-07', 'tee-moray-old-gold', 7, 4, 9, 435),
  ('hole-moray-old-gold-08', 'tee-moray-old-gold', 8, 4, 1, 456),
  ('hole-moray-old-gold-09', 'tee-moray-old-gold', 9, 4, 15, 310),
  ('hole-moray-old-gold-10', 'tee-moray-old-gold', 10, 4, 14, 313),
  ('hole-moray-old-gold-11', 'tee-moray-old-gold', 11, 4, 2, 423),
  ('hole-moray-old-gold-12', 'tee-moray-old-gold', 12, 4, 10, 389),
  ('hole-moray-old-gold-13', 'tee-moray-old-gold', 13, 4, 4, 418),
  ('hole-moray-old-gold-14', 'tee-moray-old-gold', 14, 4, 7, 427),
  ('hole-moray-old-gold-15', 'tee-moray-old-gold', 15, 3, 18, 180),
  ('hole-moray-old-gold-16', 'tee-moray-old-gold', 16, 4, 16, 358),
  ('hole-moray-old-gold-17', 'tee-moray-old-gold', 17, 5, 5, 509),
  ('hole-moray-old-gold-18', 'tee-moray-old-gold', 18, 4, 11, 408),
  ('hole-moray-old-blue-01', 'tee-moray-old-blue', 1, 4, 12, 305),
  ('hole-moray-old-blue-02', 'tee-moray-old-blue', 2, 5, 3, 462),
  ('hole-moray-old-blue-03', 'tee-moray-old-blue', 3, 4, 8, 391),
  ('hole-moray-old-blue-04', 'tee-moray-old-blue', 4, 3, 13, 186),
  ('hole-moray-old-blue-05', 'tee-moray-old-blue', 5, 4, 6, 397),
  ('hole-moray-old-blue-06', 'tee-moray-old-blue', 6, 3, 17, 133),
  ('hole-moray-old-blue-07', 'tee-moray-old-blue', 7, 4, 9, 423),
  ('hole-moray-old-blue-08', 'tee-moray-old-blue', 8, 4, 1, 435),
  ('hole-moray-old-blue-09', 'tee-moray-old-blue', 9, 4, 15, 278),
  ('hole-moray-old-blue-10', 'tee-moray-old-blue', 10, 4, 14, 252),
  ('hole-moray-old-blue-11', 'tee-moray-old-blue', 11, 4, 2, 405),
  ('hole-moray-old-blue-12', 'tee-moray-old-blue', 12, 4, 10, 372),
  ('hole-moray-old-blue-13', 'tee-moray-old-blue', 13, 4, 4, 387),
  ('hole-moray-old-blue-14', 'tee-moray-old-blue', 14, 4, 7, 399),
  ('hole-moray-old-blue-15', 'tee-moray-old-blue', 15, 3, 18, 173),
  ('hole-moray-old-blue-16', 'tee-moray-old-blue', 16, 4, 16, 347),
  ('hole-moray-old-blue-17', 'tee-moray-old-blue', 17, 5, 5, 490),
  ('hole-moray-old-blue-18', 'tee-moray-old-blue', 18, 4, 11, 393),
  ('hole-moray-new-gold-01', 'tee-moray-new-gold', 1, 4, 10, 367),
  ('hole-moray-new-gold-02', 'tee-moray-new-gold', 2, 4, 14, 329),
  ('hole-moray-new-gold-03', 'tee-moray-new-gold', 3, 5, 2, 479),
  ('hole-moray-new-gold-04', 'tee-moray-new-gold', 4, 3, 16, 132),
  ('hole-moray-new-gold-05', 'tee-moray-new-gold', 5, 4, 5, 371),
  ('hole-moray-new-gold-06', 'tee-moray-new-gold', 6, 3, 18, 100),
  ('hole-moray-new-gold-07', 'tee-moray-new-gold', 7, 4, 7, 403),
  ('hole-moray-new-gold-08', 'tee-moray-new-gold', 8, 4, 3, 430),
  ('hole-moray-new-gold-09', 'tee-moray-new-gold', 9, 4, 12, 364),
  ('hole-moray-new-gold-10', 'tee-moray-new-gold', 10, 4, 9, 325),
  ('hole-moray-new-gold-11', 'tee-moray-new-gold', 11, 3, 17, 151),
  ('hole-moray-new-gold-12', 'tee-moray-new-gold', 12, 4, 4, 424),
  ('hole-moray-new-gold-13', 'tee-moray-new-gold', 13, 4, 11, 343),
  ('hole-moray-new-gold-14', 'tee-moray-new-gold', 14, 5, 1, 492),
  ('hole-moray-new-gold-15', 'tee-moray-new-gold', 15, 4, 6, 405),
  ('hole-moray-new-gold-16', 'tee-moray-new-gold', 16, 4, 13, 328),
  ('hole-moray-new-gold-17', 'tee-moray-new-gold', 17, 3, 15, 181),
  ('hole-moray-new-gold-18', 'tee-moray-new-gold', 18, 4, 8, 418),
  ('hole-moray-new-blue-01', 'tee-moray-new-blue', 1, 4, 10, 360),
  ('hole-moray-new-blue-02', 'tee-moray-new-blue', 2, 4, 14, 312),
  ('hole-moray-new-blue-03', 'tee-moray-new-blue', 3, 5, 2, 415),
  ('hole-moray-new-blue-04', 'tee-moray-new-blue', 4, 3, 16, 122),
  ('hole-moray-new-blue-05', 'tee-moray-new-blue', 5, 4, 5, 366),
  ('hole-moray-new-blue-06', 'tee-moray-new-blue', 6, 3, 18, 92),
  ('hole-moray-new-blue-07', 'tee-moray-new-blue', 7, 4, 7, 396),
  ('hole-moray-new-blue-08', 'tee-moray-new-blue', 8, 4, 3, 408),
  ('hole-moray-new-blue-09', 'tee-moray-new-blue', 9, 4, 12, 354),
  ('hole-moray-new-blue-10', 'tee-moray-new-blue', 10, 4, 9, 321),
  ('hole-moray-new-blue-11', 'tee-moray-new-blue', 11, 3, 17, 144),
  ('hole-moray-new-blue-12', 'tee-moray-new-blue', 12, 4, 4, 414),
  ('hole-moray-new-blue-13', 'tee-moray-new-blue', 13, 4, 11, 334),
  ('hole-moray-new-blue-14', 'tee-moray-new-blue', 14, 5, 1, 440),
  ('hole-moray-new-blue-15', 'tee-moray-new-blue', 15, 4, 6, 391),
  ('hole-moray-new-blue-16', 'tee-moray-new-blue', 16, 4, 13, 321),
  ('hole-moray-new-blue-17', 'tee-moray-new-blue', 17, 3, 15, 176),
  ('hole-moray-new-blue-18', 'tee-moray-new-blue', 18, 4, 8, 406)
ON CONFLICT(id) DO UPDATE SET
  tee_id = excluded.tee_id,
  hole_number = excluded.hole_number,
  par = excluded.par,
  stroke_index = excluded.stroke_index,
  yards = excluded.yards;

INSERT INTO trips (id, name, start_date, end_date, active) VALUES
  ('trip-moray-2026', 'Moray 2026', NULL, NULL, 1)
ON CONFLICT(id) DO UPDATE SET name = excluded.name;

-- Gold is the initial round tee; both Gold and Blue remain available to configure.
INSERT INTO rounds (
  id, trip_id, course_id, tee_id, round_number, name, round_date, status, competition_type
) VALUES
  ('round-moray-old-2026', 'trip-moray-2026', 'course-moray-old', 'tee-moray-old-gold', 1, 'Moray Old', NULL, 'upcoming', 'stableford'),
  ('round-moray-new-2026', 'trip-moray-2026', 'course-moray-new', 'tee-moray-new-gold', 2, 'Moray New', NULL, 'upcoming', 'stableford')
ON CONFLICT(id) DO UPDATE SET
  trip_id = excluded.trip_id,
  course_id = excluded.course_id,
  tee_id = excluded.tee_id,
  round_number = excluded.round_number,
  name = excluded.name,
  round_date = excluded.round_date,
  status = excluded.status,
  competition_type = excluded.competition_type;
