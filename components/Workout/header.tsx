"use client"

import { Flame } from "lucide-react"
import { UnitToggle } from "@/components/Workout/uni-toggle"

interface HeaderProps {
  streak: number
}

export function Header({ streak }: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1">
        <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Est. 2024 • Athlete Data
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          <span className="text-foreground">IRON</span>
          <span className="text-primary">PULSE</span>
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <UnitToggle />
        <div className="flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-primary">
          <Flame className="size-4 fill-primary" />
          <span className="text-sm font-semibold tracking-wide">
            {streak} DAY STREAK
          </span>
        </div>
      </div>
    </header>
  )
}
