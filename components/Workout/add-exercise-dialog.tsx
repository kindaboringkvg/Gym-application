"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUnit } from "@/lib/unit-context"

interface AddExerciseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (name: string, weight: number, reps: number) => void
}

const POPULAR_EXERCISES = [
  "Bench Press",
  "Squat",
  "Deadlift",
  "Overhead Press",
  "Barbell Row",
  "Pull-ups",
  "Dumbbell Curl",
  "Tricep Dips",
  "Leg Press",
  "Lat Pulldown",
]

export function AddExerciseDialog({
  open,
  onOpenChange,
  onAdd,
}: AddExerciseDialogProps) {
  const { unit } = useUnit()
  const [name, setName] = useState("")
  const [weight, setWeight] = useState("")
  const [reps, setReps] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && weight && reps) {
      onAdd(name, Number(weight), Number(reps))
      setName("")
      setWeight("")
      setReps("")
      onOpenChange(false)
    }
  }

  const selectExercise = (exerciseName: string) => {
    setName(exerciseName)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-display)] text-2xl">
            Add Exercise
          </DialogTitle>
          <DialogDescription>
            Log a new exercise with your first set
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="exercise-name">Exercise Name</Label>
              <Input
                id="exercise-name"
                placeholder="e.g., Bench Press"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-input"
              />
              <div className="flex flex-wrap gap-2 pt-2">
                {POPULAR_EXERCISES.slice(0, 5).map((exercise) => (
                  <Button
                    key={exercise}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs bg-transparent"
                    onClick={() => selectExercise(exercise)}
                  >
                    {exercise}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight ({unit})</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="0"
                  min="0"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="bg-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reps">Reps</Label>
                <Input
                  id="reps"
                  type="number"
                  placeholder="0"
                  min="1"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  className="bg-input"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name || !weight || !reps}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Add Exercise
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
