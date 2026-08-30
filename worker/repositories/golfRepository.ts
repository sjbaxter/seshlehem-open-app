import type {
  CourseSummary,
  HoleSummary,
  PlayerSummary,
  RoundSummary,
  TeeSummary,
  TripSummary,
} from '../../src/api/contracts'

export interface GolfRepository {
  getActiveTrip(): Promise<TripSummary | null>
  getTrip(tripId: string): Promise<TripSummary | null>
  getTripRounds(tripId: string): Promise<RoundSummary[]>
  getTripPlayers(tripId: string): Promise<PlayerSummary[]>
  listCourses(): Promise<CourseSummary[]>
  getCourse(courseId: string): Promise<CourseSummary | null>
  getCourseTees(courseId: string): Promise<TeeSummary[]>
  getRound(roundId: string): Promise<RoundSummary | null>
  getTeeHoles(teeId: string): Promise<HoleSummary[]>
}

type TripRow = Omit<TripSummary, 'active'> & { active: number }
type PlayerRow = Omit<PlayerSummary, 'isAdmin' | 'active'> & { isAdmin: number; active: number }

const toTrip = (row: TripRow): TripSummary => ({ ...row, active: row.active === 1 })
const toPlayer = (row: PlayerRow): PlayerSummary => ({
  ...row,
  isAdmin: row.isAdmin === 1,
  active: row.active === 1,
})

export class D1GolfRepository implements GolfRepository {
  constructor(private readonly database: D1Database) {}

  async getActiveTrip(): Promise<TripSummary | null> {
    const row = await this.database
      .prepare('SELECT id, name, start_date AS startDate, end_date AS endDate, active FROM trips WHERE active = 1 ORDER BY created_at DESC LIMIT 1')
      .first<TripRow>()
    return row ? toTrip(row) : null
  }

  async getTrip(tripId: string): Promise<TripSummary | null> {
    const row = await this.database
      .prepare('SELECT id, name, start_date AS startDate, end_date AS endDate, active FROM trips WHERE id = ?1')
      .bind(tripId)
      .first<TripRow>()
    return row ? toTrip(row) : null
  }

  async getTripRounds(tripId: string): Promise<RoundSummary[]> {
    const result = await this.database
      .prepare(`SELECT r.id, r.trip_id AS tripId, r.course_id AS courseId, c.name AS courseName,
        r.tee_id AS teeId, t.name AS teeName, r.round_number AS roundNumber, r.name,
        r.round_date AS roundDate, r.status, r.competition_type AS competitionType
        FROM rounds r JOIN courses c ON c.id = r.course_id JOIN tees t ON t.id = r.tee_id
        WHERE r.trip_id = ?1 ORDER BY r.round_number`)
      .bind(tripId)
      .all<RoundSummary>()
    return result.results
  }

  async getTripPlayers(tripId: string): Promise<PlayerSummary[]> {
    const result = await this.database
      .prepare(`SELECT p.id, p.display_name AS displayName, p.short_name AS shortName,
        p.is_admin AS isAdmin, p.active, tp.default_playing_handicap AS defaultPlayingHandicap
        FROM trip_players tp JOIN players p ON p.id = tp.player_id
        WHERE tp.trip_id = ?1 AND p.active = 1 ORDER BY p.display_name`)
      .bind(tripId)
      .all<PlayerRow>()
    return result.results.map(toPlayer)
  }

  async listCourses(): Promise<CourseSummary[]> {
    const result = await this.database
      .prepare('SELECT id, name, location FROM courses ORDER BY name')
      .all<CourseSummary>()
    return result.results
  }

  async getCourse(courseId: string): Promise<CourseSummary | null> {
    return this.database
      .prepare('SELECT id, name, location FROM courses WHERE id = ?1')
      .bind(courseId)
      .first<CourseSummary>()
  }

  async getCourseTees(courseId: string): Promise<TeeSummary[]> {
    const result = await this.database
      .prepare(`SELECT id, course_id AS courseId, name, total_yards AS totalYards, par,
        course_rating AS courseRating, slope_rating AS slopeRating
        FROM tees WHERE course_id = ?1 ORDER BY name`)
      .bind(courseId)
      .all<TeeSummary>()
    return result.results
  }

  async getRound(roundId: string): Promise<RoundSummary | null> {
    return this.database
      .prepare(`SELECT r.id, r.trip_id AS tripId, r.course_id AS courseId, c.name AS courseName,
        r.tee_id AS teeId, t.name AS teeName, r.round_number AS roundNumber, r.name,
        r.round_date AS roundDate, r.status, r.competition_type AS competitionType
        FROM rounds r JOIN courses c ON c.id = r.course_id JOIN tees t ON t.id = r.tee_id
        WHERE r.id = ?1`)
      .bind(roundId)
      .first<RoundSummary>()
  }

  async getTeeHoles(teeId: string): Promise<HoleSummary[]> {
    const result = await this.database
      .prepare(`SELECT hole_number AS holeNumber, par, stroke_index AS strokeIndex, yards
        FROM holes WHERE tee_id = ?1 ORDER BY hole_number`)
      .bind(teeId)
      .all<HoleSummary>()
    return result.results
  }
}
