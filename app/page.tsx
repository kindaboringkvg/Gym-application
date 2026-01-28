"use client"

import { useState, useCallback } from "react"
import useSWR from "swr"
import { Header } from "@/components/Workout/header"
import { StatsCards } from "@/components/Workout/stats-cards"
import { AIAnalysis } from "@/components/Workout/ai-analysis"
import { SessionList } from "@/components/Workout/session-list"
import { BottomNav } from "@/components/Workout/bottom-nav"
import { AddExerciseDialog } from "@/components/Workout/add-exercise-dialog"
import { AddSetDialog } from "@/components/Workout/add-set-dialog"
import {
  getSessions,
  getLatestSession,
  calculateStats,
  getAIAnalysis,
  addSession,
  addExerciseToSession,
  addSetToExercise,
  deleteSet,
  deleteExercise,
  generateId,
} from "@/lib/workout-store"
import type { Exercise, WorkoutSession } from "@/lib/types"

function fetchWorkoutData() {
  return {
    sessions: getSessions(),
    latestSession: getLatestSession(),
    stats: calculateStats(),
    aiAnalysis: getAIAnalysis(),
  }
}

export default function WorkoutTracker() {
  const { data, mutate } = useSWR("workout-data", fetchWorkoutData, {
    fallbackData: fetchWorkoutData(),
  })

  const [addExerciseOpen, setAddExerciseOpen] = useState(false)
  const [addSetOpen, setAddSetOpen] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  const handleAddExercise = useCallback(
    (name: string, weight: number, reps: number) => {
      let session = data?.latestSession

      // Create a new session if none exists or if we want a fresh one
      if (!session) {
        const newSession: WorkoutSession = {
          id: generateId(),
          date: new Date(),
          exercises: [],
        }
        addSession(newSession)
        session = newSession
      }

      // Add the exercise
      const exercise: Exercise = {
        id: generateId(),
        name,
        sets: [{ id: generateId(), weight, reps }],
        createdAt: new Date(),
      }
      addExerciseToSession(session.id, exercise)
      mutate()
    },
    [data?.latestSession, mutate]
  )

  const handleAddSet = useCallback(
    (weight: number, reps: number) => {
      if (!data?.latestSession || !selectedExercise) return

      addSetToExercise(data.latestSession.id, selectedExercise.id, {
        id: generateId(),
        weight,
        reps,
      })
      mutate()
    },
    [data?.latestSession, selectedExercise, mutate]
  )

  const handleDeleteSet = useCallback(
    (exerciseId: string, setId: string) => {
      if (!data?.latestSession) return
      deleteSet(data.latestSession.id, exerciseId, setId)
      mutate()
    },
    [data?.latestSession, mutate]
  )

  const handleDeleteExercise = useCallback(
    (exerciseId: string) => {
      if (!data?.latestSession) return
      deleteExercise(data.latestSession.id, exerciseId)
      mutate()
    },
    [data?.latestSession, mutate]
  )

  const openAddSetDialog = useCallback((exercise: Exercise) => {
    setSelectedExercise(exercise)
    setAddSetOpen(true)
  }, [])

  if (!data) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient effect */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <main className="relative mx-auto max-w-2xl px-4 pb-32 pt-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <Header streak={data.stats.currentStreak} />
          <StatsCards stats={data.stats} />
          <AIAnalysis analysis={data.aiAnalysis} />
          <SessionList
            session={data.latestSession}
            onAddSet={openAddSetDialog}
            onDeleteSet={handleDeleteSet}
            onDeleteExercise={handleDeleteExercise}
          />
        </div>
      </main>

      <BottomNav onAddExercise={() => setAddExerciseOpen(true)} />

      <AddExerciseDialog
        open={addExerciseOpen}
        onOpenChange={setAddExerciseOpen}
        onAdd={handleAddExercise}
      />

      <AddSetDialog
        open={addSetOpen}
        onOpenChange={setAddSetOpen}
        exercise={selectedExercise}
        onAdd={handleAddSet}
      />
    </div>
  )
}
