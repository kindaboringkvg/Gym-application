"use client"

import useSWR from "swr"
import { ArrowLeft, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/Workout/bottom-nav"
import { useUnit } from "@/lib/unit-context"
import {
  getGroupedSessions,
  getCategoryLabel,
  getCategoryColor,
  formatRelativeDate,
  calculateSessionVolume,
} from "@/lib/workout-store"
import type { WorkoutSession, WorkoutCategory } from "@/lib/types"

function fetchHistoryData() {
  return {
    groupedSessions: getGroupedSessions(),
  }
}

function SessionCard({ session }: { session: WorkoutSession }) {
  const { unit, convertWeight } = useUnit()
  const category = session.category || "mixed"
  const volume = calculateSessionVolume(session)
  const convertedVolume = convertWeight(volume)
  const totalSets = session.exercises.reduce((acc, ex) => acc + ex.sets.length, 0)
  
  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <Badge 
            variant="outline" 
            className={`${getCategoryColor(category)} border font-semibold uppercase tracking-wider`}
          >
            {getCategoryLabel(category)}
          </Badge>
          <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <TrendingUp className="size-4" />
              {(convertedVolume / 1000).toFixed(1)}t
            </span>
            <span>{totalSets} sets</span>
            <span>{session.exercises.length} exercises</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        {session.exercises.map((exercise) => (
          <div 
            key={exercise.id} 
            className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2"
          >
            <span className="font-medium text-foreground">{exercise.name}</span>
            <span className="text-sm text-muted-foreground">
              {exercise.sets.length} sets
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CategoryFilter({ 
  selected, 
  onSelect 
}: { 
  selected: WorkoutCategory | "all"
  onSelect: (cat: WorkoutCategory | "all") => void 
}) {
  const categories: (WorkoutCategory | "all")[] = ["all", "push", "pull", "legs", "mixed"]
  
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={selected === cat ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(cat)}
          className={
            selected === cat 
              ? "bg-primary text-primary-foreground" 
              : "border-border text-muted-foreground hover:text-foreground"
          }
        >
          {cat === "all" ? "All" : getCategoryLabel(cat as WorkoutCategory)}
        </Button>
      ))}
    </div>
  )
}

export default function HistoryPage() {
  const { data } = useSWR("history-data", fetchHistoryData, {
    fallbackData: fetchHistoryData(),
  })
  
  const [selectedCategory, setSelectedCategory] = useState<WorkoutCategory | "all">("all")
  
  if (!data) return null
  
  // Filter sessions based on selected category
  const filteredGroups = data.groupedSessions.map((group) => ({
    ...group,
    sessions: selectedCategory === "all" 
      ? group.sessions 
      : group.sessions.filter((s) => s.category === selectedCategory),
  })).filter((group) => group.sessions.length > 0)
  
  // Calculate stats
  const totalWorkouts = data.groupedSessions.reduce(
    (acc, group) => acc + group.sessions.length, 
    0
  )
  const pushCount = data.groupedSessions.reduce(
    (acc, group) => acc + group.sessions.filter((s) => s.category === "push").length, 
    0
  )
  const pullCount = data.groupedSessions.reduce(
    (acc, group) => acc + group.sessions.filter((s) => s.category === "pull").length, 
    0
  )
  const legCount = data.groupedSessions.reduce(
    (acc, group) => acc + group.sessions.filter((s) => s.category === "legs").length, 
    0
  )
  
  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient effect */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <main className="relative mx-auto max-w-2xl px-4 pb-32 pt-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Workout Log
              </p>
              <h1 className="font-[var(--font-display)] text-3xl font-bold tracking-tight text-foreground">
                HISTORY
              </h1>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-3">
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <p className="text-2xl font-bold text-foreground">{totalWorkouts}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center">
              <p className="text-2xl font-bold text-red-400">{pushCount}</p>
              <p className="text-xs text-red-400/70">Push</p>
            </div>
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-center">
              <p className="text-2xl font-bold text-blue-400">{pullCount}</p>
              <p className="text-xs text-blue-400/70">Pull</p>
            </div>
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-center">
              <p className="text-2xl font-bold text-green-400">{legCount}</p>
              <p className="text-xs text-green-400/70">Legs</p>
            </div>
          </div>
          
          {/* Filter */}
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
          
          {/* Sessions by Date */}
          <div className="space-y-6">
            {filteredGroups.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <Calendar className="mx-auto size-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No workouts found</p>
                <Link href="/" className="mt-4 inline-block">
                  <Button className="bg-primary text-primary-foreground">
                    Start a Workout
                  </Button>
                </Link>
              </div>
            ) : (
              filteredGroups.map((group) => (
                <div key={group.date} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-primary" />
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      {formatRelativeDate(group.date)}
                    </h2>
                    <span className="text-xs text-muted-foreground">
                      ({new Date(group.date).toLocaleDateString("en-US", { 
                        weekday: "short", 
                        month: "short", 
                        day: "numeric" 
                      })})
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {group.sessions.map((session) => (
                      <SessionCard key={session.id} session={session} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

import { useState } from "react"
