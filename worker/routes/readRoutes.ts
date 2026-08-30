import type {
  CourseDetailResponse,
  RoundDetailResponse,
  TripDetailResponse,
  TripPlayersResponse,
} from '../../src/api/contracts'
import type { GolfRepository } from '../repositories/golfRepository'

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { 'content-type': 'application/json; charset=utf-8' } })

const notFound = (message: string) => json({ error: message }, 404)

export async function handleReadRoute(request: Request, repository: GolfRepository): Promise<Response | null> {
  const segments = new URL(request.url).pathname.split('/').filter(Boolean)

  if (segments[0] !== 'api') return null

  if (segments[1] === 'trips' && segments[2] === 'active' && segments.length === 3) {
    const trip = await repository.getActiveTrip()
    if (!trip) return notFound('No active trip')
    const response: TripDetailResponse = { trip, rounds: await repository.getTripRounds(trip.id) }
    return json(response)
  }

  if (segments[1] === 'trips' && segments[2] && segments.length === 3) {
    const trip = await repository.getTrip(segments[2])
    if (!trip) return notFound('Trip not found')
    const response: TripDetailResponse = { trip, rounds: await repository.getTripRounds(trip.id) }
    return json(response)
  }

  if (segments[1] === 'trips' && segments[2] && segments[3] === 'players' && segments.length === 4) {
    const trip = await repository.getTrip(segments[2])
    if (!trip) return notFound('Trip not found')
    const response: TripPlayersResponse = { players: await repository.getTripPlayers(trip.id) }
    return json(response)
  }

  if (segments[1] === 'courses' && segments.length === 2) {
    return json({ courses: await repository.listCourses() })
  }

  if (segments[1] === 'courses' && segments[2] && segments.length === 3) {
    const course = await repository.getCourse(segments[2])
    if (!course) return notFound('Course not found')
    const tees = await repository.getCourseTees(course.id)
    const teesWithHoles = await Promise.all(
      tees.map(async (tee) => ({ ...tee, holes: await repository.getTeeHoles(tee.id) })),
    )
    const response: CourseDetailResponse = { course, tees: teesWithHoles }
    return json(response)
  }

  if (segments[1] === 'rounds' && segments[2] && segments.length === 3) {
    const round = await repository.getRound(segments[2])
    if (!round) return notFound('Round not found')
    const response: RoundDetailResponse = { round, holes: await repository.getTeeHoles(round.teeId) }
    return json(response)
  }

  return null
}
