export interface WorkoutSet {
  id: string
  weight: number
  reps: number
}

export interface Exercise {
  id: string
  name: string
  sets: WorkoutSet[]
  createdAt: Date
}

export type WorkoutCategory = "push" | "pull" | "legs" | "mixed"

export interface WorkoutSession {
  id: string
  date: Date
  exercises: Exercise[]
  category?: WorkoutCategory
}

export interface WorkoutStats {
  totalVolume: number
  weeklyAvgDays: number
  currentStreak: number
}

export interface GroupedSessions {
  date: string
  sessions: WorkoutSession[]
}
