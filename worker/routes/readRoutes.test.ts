import { describe, expect, it } from 'vitest'
import type {
  CourseSummary,
  HoleSummary,
  RoundSummary,
  TeeSummary,
  TripSummary,
} from '../../src/api/contracts'
import type { GolfRepository } from '../repositories/golfRepository'
import { handleReadRoute } from './readRoutes'

const trip: TripSummary = {
  id: 'trip-moray-2026',
  name: 'Moray 2026',
  startDate: null,
  endDate: null,
  active: true,
}

const course: CourseSummary = {
  id: 'course-moray-old',
  name: 'Moray Golf Club - Old Course',
  location: 'Lossiemouth, Scotland',
}

const tee: TeeSummary = {
  id: 'tee-moray-old-gold',
  courseId: course.id,
  name: 'Gold',
  totalYards: 6572,
  par: 71,
  courseRating: 72.5,
  slopeRating: 128,
}

const round: RoundSummary = {
  id: 'round-moray-old-2026',
  tripId: trip.id,
  courseId: course.id,
  courseName: course.name,
  teeId: tee.id,
  teeName: tee.name,
  roundNumber: 1,
  name: 'Moray Old',
  roundDate: null,
  status: 'upcoming',
  competitionType: 'stableford',
}

const holes: HoleSummary[] = [{ holeNumber: 1, par: 4, strokeIndex: 12, yards: 316 }]

const makeRepository = (): GolfRepository => ({
  getActiveTrip: async () => trip,
  getTrip: async (tripId) => (tripId === trip.id ? trip : null),
  getTripRounds: async () => [round],
  getTripPlayers: async () => [],
  listCourses: async () => [course],
  getCourse: async (courseId) => (courseId === course.id ? course : null),
  getCourseTees: async () => [tee],
  getRound: async (roundId) => (roundId === round.id ? round : null),
  getTeeHoles: async () => holes,
})

describe('read API routes', () => {
  it('returns the active trip and its rounds', async () => {
    const response = await handleReadRoute(
      new Request('https://example.test/api/trips/active'),
      makeRepository(),
    )

    expect(response?.status).toBe(200)
    await expect(response?.json()).resolves.toEqual({ trip, rounds: [round] })
  })

  it('returns a course with its tees and holes', async () => {
    const response = await handleReadRoute(
      new Request(`https://example.test/api/courses/${course.id}`),
      makeRepository(),
    )

    await expect(response?.json()).resolves.toEqual({ course, tees: [{ ...tee, holes }] })
  })

  it('returns a round with the selected tee holes', async () => {
    const response = await handleReadRoute(
      new Request(`https://example.test/api/rounds/${round.id}`),
      makeRepository(),
    )

    await expect(response?.json()).resolves.toEqual({ round, holes })
  })

  it('returns a clear 404 for an unknown trip', async () => {
    const response = await handleReadRoute(
      new Request('https://example.test/api/trips/missing'),
      makeRepository(),
    )

    expect(response?.status).toBe(404)
    await expect(response?.json()).resolves.toEqual({ error: 'Trip not found' })
  })
})
