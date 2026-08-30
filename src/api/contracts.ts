export interface TripSummary {
  id: string
  name: string
  startDate: string | null
  endDate: string | null
  active: boolean
}

export interface PlayerSummary {
  id: string
  displayName: string
  shortName: string | null
  isAdmin: boolean
  active: boolean
  defaultPlayingHandicap: number
}

export interface CourseSummary {
  id: string
  name: string
  location: string | null
}

export interface TeeSummary {
  id: string
  courseId: string
  name: string
  totalYards: number | null
  par: number | null
  courseRating: number | null
  slopeRating: number | null
}

export interface HoleSummary {
  holeNumber: number
  par: number
  strokeIndex: number
  yards: number | null
}

export interface RoundSummary {
  id: string
  tripId: string
  courseId: string
  courseName: string
  teeId: string
  teeName: string
  roundNumber: number
  name: string
  roundDate: string | null
  status: 'upcoming' | 'in_progress' | 'complete'
  competitionType: 'stableford'
}

export interface TripDetailResponse {
  trip: TripSummary
  rounds: RoundSummary[]
}

export interface TripPlayersResponse {
  players: PlayerSummary[]
}

export interface CourseDetailResponse {
  course: CourseSummary
  tees: Array<TeeSummary & { holes: HoleSummary[] }>
}

export interface RoundDetailResponse {
  round: RoundSummary
  holes: HoleSummary[]
}
