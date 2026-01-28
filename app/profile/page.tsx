"use client"

import { ArrowLeft, User, LogIn, TrendingUp, Calendar, Flame, Target } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/Workout/bottom-nav"
import { getSessions, calculateStats } from "@/lib/workout-store"

function fetchProfileData() {
  const sessions = getSessions()
  const stats = calculateStats()
  
  // Calculate additional stats
  let totalExercises = 0
  let totalSets = 0
  let totalReps = 0
  
  sessions.forEach((session) => {
    totalExercises += session.exercises.length
    session.exercises.forEach((exercise) => {
      totalSets += exercise.sets.length
      exercise.sets.forEach((set) => {
        totalReps += set.reps
      })
    })
  })
  
  return {
    stats,
    totalWorkouts: sessions.length,
    totalExercises,
    totalSets,
    totalReps,
  }
}

export default function ProfilePage() {
  const { data } = useSWR("profile-data", fetchProfileData, {
    fallbackData: fetchProfileData(),
  })
  
  if (!data) return null
  
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
                Your Account
              </p>
              <h1 className="font-[var(--font-display)] text-3xl font-bold tracking-tight text-foreground">
                PROFILE
              </h1>
            </div>
          </div>
          
          {/* Profile Card */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/20">
                <User className="size-8 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-foreground">Guest User</p>
                <p className="text-sm text-muted-foreground">Sign in to save your progress</p>
              </div>
            </div>
            
            <div className="mt-6 rounded-lg border border-primary/30 bg-primary/10 p-4">
              <div className="flex items-start gap-3">
                <LogIn className="mt-0.5 size-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Save Your Progress</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Create an account to save your workouts to the cloud and access them from any device.
                  </p>
                  <Button className="mt-3 bg-primary text-primary-foreground hover:bg-primary/90">
                    Coming Soon
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Overview */}
          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Your Stats
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Flame className="size-4 text-primary" />
                  <span className="text-xs uppercase">Streak</span>
                </div>
                <p className="mt-2 text-3xl font-bold text-foreground">{data.stats.currentStreak}</p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
              
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="size-4 text-primary" />
                  <span className="text-xs uppercase">Volume</span>
                </div>
                <p className="mt-2 text-3xl font-bold text-foreground">{data.stats.totalVolume}</p>
                <p className="text-xs text-muted-foreground">tons lifted</p>
              </div>
              
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="size-4 text-primary" />
                  <span className="text-xs uppercase">Workouts</span>
                </div>
                <p className="mt-2 text-3xl font-bold text-foreground">{data.totalWorkouts}</p>
                <p className="text-xs text-muted-foreground">sessions</p>
              </div>
              
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Target className="size-4 text-primary" />
                  <span className="text-xs uppercase">Total Sets</span>
                </div>
                <p className="mt-2 text-3xl font-bold text-foreground">{data.totalSets}</p>
                <p className="text-xs text-muted-foreground">completed</p>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold text-foreground">Lifetime Stats</h3>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Exercises</span>
                <span className="font-medium text-foreground">{data.totalExercises}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Reps</span>
                <span className="font-medium text-foreground">{data.totalReps.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Weekly Average</span>
                <span className="font-medium text-foreground">{data.stats.weeklyAvgDays} days</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
