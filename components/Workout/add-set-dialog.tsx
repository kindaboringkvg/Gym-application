"use client"

import React from "react"

import { useState, useEffect } from "react"
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
import type { Exercise } from "@/lib/types"

interface AddSetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  exercise: Exercise | null
  onAdd: (weight: number, reps: number) => void
}

export function AddSetDialog({
  open,
  onOpenChange,
  exercise,
  onAdd,
}: AddSetDialogProps) {
  const { unit } = useUnit()
  const [weight, setWeight] = useState("")
  const [reps, setReps] = useState("")

  // Pre-fill with last set values
  useEffect(() => {
    if (exercise && exercise.sets.length > 0) {
      const lastSet = exercise.sets[exercise.sets.length - 1]
      setWeight(lastSet.weight.toString())
      setReps(lastSet.reps.toString())
    }
  }, [exercise])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (weight && reps) {
      onAdd(Number(weight), Number(reps))
      setWeight("")
      setReps("")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-display)] text-2xl">
            Add Set
          </DialogTitle>
          <DialogDescription>
            {exercise
              ? `Add a new set to ${exercise.name}`
              : "Add a new set to this exercise"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="set-weight">Weight ({unit})</Label>
                <Input
                  id="set-weight"
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
                <Label htmlFor="set-reps">Reps</Label>
                <Input
                  id="set-reps"
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
              disabled={!weight || !reps}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Add Set
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
