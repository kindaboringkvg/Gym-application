"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useUnit } from "@/lib/unit-context"
import type { WorkoutStats } from "@/lib/types"

interface StatsCardsProps {
  stats: WorkoutStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  const { unit } = useUnit()
  
  // Convert tons (stats are stored in kg-based tons)
  const displayVolume = unit === "lbs" 
    ? (stats.totalVolume * 2.20462).toFixed(1) 
    : stats.totalVolume
  
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="border-border/50 bg-card/50">
        <CardContent className="pt-6">
          <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
            Total Volume
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-foreground">
              {displayVolume}
            </span>
            <span className="text-lg text-muted-foreground">TONS</span>
          </div>
        </CardContent>
      </Card>
      <Card className="border-border/50 bg-card/50">
        <CardContent className="pt-6">
          <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
            Weekly Avg
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-foreground">
              {stats.weeklyAvgDays}
            </span>
            <span className="text-lg text-muted-foreground">DAYS</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
