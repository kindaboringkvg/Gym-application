"use client"

import type { Exercise, WorkoutSession, WorkoutSet, WorkoutStats, WorkoutCategory, GroupedSessions } from "./types"

// Generate unique IDs
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

// Exercise categorization
const PUSH_EXERCISES = [
  "bench press", "incline bench press", "decline bench press",
  "chest press", "dumbbell press", "shoulder press", "overhead press",
  "military press", "arnold press", "tricep pushdown", "tricep extension",
  "skull crushers", "dips", "push ups", "cable fly", "chest fly",
  "lateral raise", "front raise", "triceps", "shoulder", "chest"
]

const PULL_EXERCISES = [
  "pull ups", "chin ups", "lat pulldown", "row", "barbell row",
  "dumbbell row", "cable row", "seated row", "t-bar row", "face pull",
  "bicep curl", "hammer curl", "preacher curl", "concentration curl",
  "deadlift", "back extension", "shrugs", "biceps", "back", "lats"
]

const LEG_EXERCISES = [
  "squat", "leg press", "lunges", "leg extension", "leg curl",
  "hamstring curl", "calf raise", "romanian deadlift", "rdl",
  "hip thrust", "glute bridge", "bulgarian split squat", "hack squat",
  "goblet squat", "front squat", "legs", "quads", "hamstrings", "glutes", "calves"
]

export function categorizeExercise(exerciseName: string): WorkoutCategory {
  const name = exerciseName.toLowerCase()
  
  if (PUSH_EXERCISES.some(ex => name.includes(ex))) return "push"
  if (PULL_EXERCISES.some(ex => name.includes(ex))) return "pull"
  if (LEG_EXERCISES.some(ex => name.includes(ex))) return "legs"
  
  return "mixed"
}

export function categorizeSession(exercises: Exercise[]): WorkoutCategory {
  if (exercises.length === 0) return "mixed"
  
  const categories = exercises.map(ex => categorizeExercise(ex.name))
  const pushCount = categories.filter(c => c === "push").length
  const pullCount = categories.filter(c => c === "pull").length
  const legCount = categories.filter(c => c === "legs").length
  
  const total = exercises.length
  const threshold = 0.5 // 50% of exercises need to match
  
  if (pushCount / total >= threshold) return "push"
  if (pullCount / total >= threshold) return "pull"
  if (legCount / total >= threshold) return "legs"
  
  return "mixed"
}

export function getCategoryLabel(category: WorkoutCategory): string {
  switch (category) {
    case "push": return "Push Day"
    case "pull": return "Pull Day"
    case "legs": return "Leg Day"
    default: return "Mixed Workout"
  }
}

export function getCategoryColor(category: WorkoutCategory): string {
  switch (category) {
    case "push": return "bg-red-500/20 text-red-400 border-red-500/30"
    case "pull": return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "legs": return "bg-green-500/20 text-green-400 border-green-500/30"
    default: return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  }
}

// Sample data for demo purposes
const today = new Date()
const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
const twoDaysAgo = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000)
const threeDaysAgo = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000)
const fourDaysAgo = new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000)

const sampleSessions: WorkoutSession[] = [
  {
    id: generateId(),
    date: fourDaysAgo,
    exercises: [
      {
        id: generateId(),
        name: "Squat",
        sets: [
          { id: generateId(), weight: 80, reps: 10 },
          { id: generateId(), weight: 100, reps: 8 },
          { id: generateId(), weight: 120, reps: 6 },
        ],
        createdAt: fourDaysAgo,
      },
      {
        id: generateId(),
        name: "Leg Press",
        sets: [
          { id: generateId(), weight: 150, reps: 12 },
          { id: generateId(), weight: 180, reps: 10 },
        ],
        createdAt: fourDaysAgo,
      },
      {
        id: generateId(),
        name: "Calf Raise",
        sets: [
          { id: generateId(), weight: 60, reps: 15 },
          { id: generateId(), weight: 70, reps: 12 },
        ],
        createdAt: fourDaysAgo,
      },
    ],
    category: "legs",
  },
  {
    id: generateId(),
    date: threeDaysAgo,
    exercises: [
      {
        id: generateId(),
        name: "Pull Ups",
        sets: [
          { id: generateId(), weight: 0, reps: 12 },
          { id: generateId(), weight: 0, reps: 10 },
          { id: generateId(), weight: 0, reps: 8 },
        ],
        createdAt: threeDaysAgo,
      },
      {
        id: generateId(),
        name: "Barbell Row",
        sets: [
          { id: generateId(), weight: 60, reps: 10 },
          { id: generateId(), weight: 70, reps: 8 },
        ],
        createdAt: threeDaysAgo,
      },
      {
        id: generateId(),
        name: "Bicep Curl",
        sets: [
          { id: generateId(), weight: 15, reps: 12 },
          { id: generateId(), weight: 17.5, reps: 10 },
        ],
        createdAt: threeDaysAgo,
      },
    ],
    category: "pull",
  },
  {
    id: generateId(),
    date: twoDaysAgo,
    exercises: [
      {
        id: generateId(),
        name: "Bench Press",
        sets: [
          { id: generateId(), weight: 60, reps: 10 },
          { id: generateId(), weight: 80, reps: 8 },
          { id: generateId(), weight: 90, reps: 6 },
        ],
        createdAt: twoDaysAgo,
      },
      {
        id: generateId(),
        name: "Shoulder Press",
        sets: [
          { id: generateId(), weight: 40, reps: 10 },
          { id: generateId(), weight: 45, reps: 8 },
        ],
        createdAt: twoDaysAgo,
      },
      {
        id: generateId(),
        name: "Tricep Pushdown",
        sets: [
          { id: generateId(), weight: 30, reps: 12 },
          { id: generateId(), weight: 35, reps: 10 },
        ],
        createdAt: twoDaysAgo,
      },
    ],
    category: "push",
  },
  {
    id: generateId(),
    date: yesterday,
    exercises: [
      {
        id: generateId(),
        name: "Deadlift",
        sets: [
          { id: generateId(), weight: 100, reps: 8 },
          { id: generateId(), weight: 120, reps: 6 },
          { id: generateId(), weight: 140, reps: 4 },
        ],
        createdAt: yesterday,
      },
      {
        id: generateId(),
        name: "Lat Pulldown",
        sets: [
          { id: generateId(), weight: 50, reps: 12 },
          { id: generateId(), weight: 60, reps: 10 },
        ],
        createdAt: yesterday,
      },
    ],
    category: "pull",
  },
  {
    id: generateId(),
    date: today,
    exercises: [
      {
        id: generateId(),
        name: "Bench Press",
        sets: [
          { id: generateId(), weight: 60, reps: 10 },
          { id: generateId(), weight: 80, reps: 8 },
          { id: generateId(), weight: 100, reps: 5 },
        ],
        createdAt: today,
      },
    ],
    category: "push",
  },
]

// In-memory store (will reset on page refresh)
let sessions: WorkoutSession[] = [...sampleSessions]

export function getSessions(): WorkoutSession[] {
  return sessions
}

export function getLatestSession(): WorkoutSession | null {
  if (sessions.length === 0) return null
  return sessions[sessions.length - 1]
}

export function addSession(session: WorkoutSession): void {
  sessions = [...sessions, session]
}

export function addExerciseToSession(sessionId: string, exercise: Exercise): void {
  sessions = sessions.map((s) =>
    s.id === sessionId ? { ...s, exercises: [...s.exercises, exercise] } : s
  )
}

export function updateExercise(sessionId: string, exercise: Exercise): void {
  sessions = sessions.map((s) =>
    s.id === sessionId
      ? {
          ...s,
          exercises: s.exercises.map((e) =>
            e.id === exercise.id ? exercise : e
          ),
        }
      : s
  )
}

export function deleteExercise(sessionId: string, exerciseId: string): void {
  sessions = sessions.map((s) =>
    s.id === sessionId
      ? { ...s, exercises: s.exercises.filter((e) => e.id !== exerciseId) }
      : s
  )
}

export function addSetToExercise(
  sessionId: string,
  exerciseId: string,
  set: WorkoutSet
): void {
  sessions = sessions.map((s) =>
    s.id === sessionId
      ? {
          ...s,
          exercises: s.exercises.map((e) =>
            e.id === exerciseId ? { ...e, sets: [...e.sets, set] } : e
          ),
        }
      : s
  )
}

export function deleteSet(
  sessionId: string,
  exerciseId: string,
  setId: string
): void {
  sessions = sessions.map((s) =>
    s.id === sessionId
      ? {
          ...s,
          exercises: s.exercises.map((e) =>
            e.id === exerciseId
              ? { ...e, sets: e.sets.filter((set) => set.id !== setId) }
              : e
          ),
        }
      : s
  )
}

export function calculateStats(): WorkoutStats {
  let totalVolume = 0

  sessions.forEach((session) => {
    session.exercises.forEach((exercise) => {
      exercise.sets.forEach((set) => {
        totalVolume += set.weight * set.reps
      })
    })
  })

  // Convert to tons (kg / 1000)
  const totalVolumeTons = totalVolume / 1000

  // Calculate weekly average (simplified: sessions per week)
  const uniqueDays = new Set(
    sessions.map((s) => new Date(s.date).toDateString())
  ).size
  const weeklyAvg = Math.min(uniqueDays, 7)

  // Calculate streak (simplified)
  const streak = Math.max(uniqueDays, 1)

  return {
    totalVolume: Math.round(totalVolumeTons * 10) / 10,
    weeklyAvgDays: Math.round(weeklyAvg * 10) / 10,
    currentStreak: streak * 12, // Demo multiplier for visual effect
  }
}

export function getAIAnalysis(): string {
  const latestSession = getLatestSession()
  if (!latestSession || latestSession.exercises.length === 0) {
    return "Start your first workout to receive personalized AI analysis and coaching insights."
  }

  const exercise = latestSession.exercises[0]
  if (exercise.sets.length < 2) {
    return "Add more sets to your workout to receive detailed performance analysis."
  }

  const lastSet = exercise.sets[exercise.sets.length - 1]
  const prevSet = exercise.sets[exercise.sets.length - 2]
  
  if (lastSet.weight < prevSet.weight || lastSet.reps < prevSet.reps) {
    const dropPercent = Math.round(
      (1 - (lastSet.weight * lastSet.reps) / (prevSet.weight * prevSet.reps)) * 100
    )
    return `Your ${exercise.name} intensity dropped by ${Math.abs(dropPercent)}% on Set ${exercise.sets.length}. Consider increasing rest time to 120s for maximum hypertrophy.`
  }

  return `Great progress on ${exercise.name}! Your strength is improving consistently. Keep pushing those limits.`
}

export function getGroupedSessions(): GroupedSessions[] {
  const grouped: Map<string, WorkoutSession[]> = new Map()
  
  // Sort sessions by date (newest first)
  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  
  sortedSessions.forEach((session) => {
    const dateKey = new Date(session.date).toDateString()
    const existing = grouped.get(dateKey) || []
    
    // Add category if not set
    const sessionWithCategory: WorkoutSession = {
      ...session,
      category: session.category || categorizeSession(session.exercises),
    }
    
    grouped.set(dateKey, [...existing, sessionWithCategory])
  })
  
  return Array.from(grouped.entries()).map(([date, sessions]) => ({
    date,
    sessions,
  }))
}

export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffTime = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  })
}

export function calculateSessionVolume(session: WorkoutSession): number {
  let volume = 0
  session.exercises.forEach((exercise) => {
    exercise.sets.forEach((set) => {
      volume += set.weight * set.reps
    })
  })
  return volume
}

// Analytics for AI Insights page
export interface ExerciseProgress {
  name: string
  data: { date: string; maxWeight: number; totalVolume: number; totalReps: number }[]
}

export interface WorkoutInsight {
  type: "increase_weight" | "increase_reps" | "rest_more" | "maintain" | "deload"
  exercise: string
  message: string
  priority: "high" | "medium" | "low"
}

export function getExerciseProgressData(): ExerciseProgress[] {
  const exerciseMap = new Map<string, Map<string, { maxWeight: number; totalVolume: number; totalReps: number }>>()
  
  sessions.forEach((session) => {
    const dateKey = new Date(session.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    
    session.exercises.forEach((exercise) => {
      const exerciseName = exercise.name.toLowerCase()
      
      if (!exerciseMap.has(exerciseName)) {
        exerciseMap.set(exerciseName, new Map())
      }
      
      const dateMap = exerciseMap.get(exerciseName)!
      let maxWeight = 0
      let totalVolume = 0
      let totalReps = 0
      
      exercise.sets.forEach((set) => {
        maxWeight = Math.max(maxWeight, set.weight)
        totalVolume += set.weight * set.reps
        totalReps += set.reps
      })
      
      const existing = dateMap.get(dateKey)
      if (existing) {
        dateMap.set(dateKey, {
          maxWeight: Math.max(existing.maxWeight, maxWeight),
          totalVolume: existing.totalVolume + totalVolume,
          totalReps: existing.totalReps + totalReps,
        })
      } else {
        dateMap.set(dateKey, { maxWeight, totalVolume, totalReps })
      }
    })
  })
  
  return Array.from(exerciseMap.entries()).map(([name, dateMap]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    data: Array.from(dateMap.entries()).map(([date, stats]) => ({
      date,
      ...stats,
    })),
  }))
}

export function getVolumeByDay(): { date: string; volume: number; category: WorkoutCategory }[] {
  return sessions
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((session) => ({
      date: new Date(session.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      volume: calculateSessionVolume(session),
      category: session.category || categorizeSession(session.exercises),
    }))
}

export function generateInsights(): WorkoutInsight[] {
  const insights: WorkoutInsight[] = []
  const progressData = getExerciseProgressData()
  
  progressData.forEach(({ name, data }) => {
    if (data.length < 2) return
    
    const recent = data[data.length - 1]
    const previous = data[data.length - 2]
    
    // Check for progressive overload opportunity
    if (recent.maxWeight === previous.maxWeight && recent.totalReps >= previous.totalReps) {
      insights.push({
        type: "increase_weight",
        exercise: name,
        message: `You've maintained ${recent.maxWeight}kg on ${name} with good rep count. Consider increasing weight by 2.5-5kg next session.`,
        priority: "high",
      })
    }
    
    // Check for rep increase
    if (recent.maxWeight === previous.maxWeight && recent.totalReps < previous.totalReps * 0.9) {
      insights.push({
        type: "rest_more",
        exercise: name,
        message: `Your reps dropped on ${name}. Consider longer rest periods (2-3 min) between sets for strength.`,
        priority: "medium",
      })
    }
    
    // Check for volume increase
    if (recent.totalVolume > previous.totalVolume * 1.1) {
      insights.push({
        type: "maintain",
        exercise: name,
        message: `Great progress on ${name}! Volume increased by ${Math.round((recent.totalVolume / previous.totalVolume - 1) * 100)}%. Keep this intensity.`,
        priority: "low",
      })
    }
    
    // Deload recommendation
    if (recent.totalVolume < previous.totalVolume * 0.8 && recent.maxWeight < previous.maxWeight) {
      insights.push({
        type: "deload",
        exercise: name,
        message: `Performance dropped on ${name}. Consider a deload week to recover and come back stronger.`,
        priority: "high",
      })
    }
  })
  
  // Add general insights
  const categoryBreakdown = {
    push: 0,
    pull: 0,
    legs: 0,
    mixed: 0,
  }
  
  sessions.forEach((session) => {
    const cat = session.category || categorizeSession(session.exercises)
    categoryBreakdown[cat]++
  })
  
  const total = Object.values(categoryBreakdown).reduce((a, b) => a + b, 0)
  
  if (categoryBreakdown.legs < total * 0.2 && total > 3) {
    insights.push({
      type: "increase_reps",
      exercise: "Leg Training",
      message: "You're training legs less frequently than upper body. Add an extra leg day for balanced development.",
      priority: "medium",
    })
  }
  
  if (categoryBreakdown.pull < categoryBreakdown.push * 0.8 && total > 3) {
    insights.push({
      type: "increase_reps",
      exercise: "Pull Exercises",
      message: "Your push-to-pull ratio is imbalanced. Add more pulling movements to prevent shoulder issues.",
      priority: "high",
    })
  }
  
  return insights.slice(0, 5) // Return top 5 insights
}
