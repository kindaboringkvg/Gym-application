"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"
import { useUnit } from "@/lib/unit-context"
import type { Exercise } from "@/lib/types"

interface ExerciseCardProps {
  exercise: Exercise
  onAddSet: () => void
  onDeleteSet: (setId: string) => void
  onDeleteExercise: () => void
}

export function ExerciseCard({
  exercise,
  onAddSet,
  onDeleteSet,
  onDeleteExercise,
}: ExerciseCardProps) {
  const { formatWeight } = useUnit()
  
  return (
    <Card className="group border-border/50 bg-card/50 transition-colors hover:border-border">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold italic text-foreground uppercase">
              {exercise.name}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-primary/50 bg-primary/10 text-primary"
            >
              {exercise.sets.length} SETS
            </Badge>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
              onClick={onDeleteExercise}
            >
              <Trash2 className="size-4" />
              <span className="sr-only">Delete exercise</span>
            </Button>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {exercise.sets.map((set, index) => (
            <div
              key={set.id}
              className="group/set flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3 transition-colors hover:bg-secondary"
            >
              <span className="text-sm font-medium text-muted-foreground uppercase">
                Set {index + 1}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-right font-medium text-foreground">
                  {formatWeight(set.weight)} × {set.reps}
                </span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="size-6 text-muted-foreground opacity-0 transition-opacity group-hover/set:opacity-100 hover:text-destructive"
                  onClick={() => onDeleteSet(set.id)}
                >
                  <Trash2 className="size-3" />
                  <span className="sr-only">Delete set</span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          className="mt-4 w-full text-muted-foreground hover:text-foreground"
          onClick={onAddSet}
        >
          <Plus className="size-4" />
          Add Set
        </Button>
      </CardContent>
    </Card>
  )
}
