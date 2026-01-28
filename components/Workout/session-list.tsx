"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExerciseCard } from "./exercise-card"
import type { Exercise, WorkoutSession } from "@/lib/types"

interface SessionListProps {
  session: WorkoutSession | null
  onAddSet: (exercise: Exercise) => void
  onDeleteSet: (exerciseId: string, setId: string) => void
  onDeleteExercise: (exerciseId: string) => void
}

export function SessionList({
  session,
  onAddSet,
  onDeleteSet,
  onDeleteExercise,
}: SessionListProps) {
  if (!session || session.exercises.length === 0) {
    return (
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
            Last Session
          </p>
        </div>
        <div className="rounded-xl border border-dashed border-border/50 bg-card/30 p-8 text-center">
          <p className="text-muted-foreground">
            No exercises logged yet. Tap the + button to add your first exercise!
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
          Last Session
        </p>
        <Link href="/history">
          <Button
            variant="ghost"
            className="h-auto p-0 text-xs font-semibold tracking-wide text-primary hover:bg-transparent hover:text-primary/80"
          >
            HISTORY
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {session.exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onAddSet={() => onAddSet(exercise)}
            onDeleteSet={(setId) => onDeleteSet(exercise.id, setId)}
            onDeleteExercise={() => onDeleteExercise(exercise.id)}
          />
        ))}
      </div>
    </section>
  )
}
