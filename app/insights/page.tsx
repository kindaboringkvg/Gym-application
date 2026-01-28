"use client"

import { useState } from "react"
import useSWR from "swr"
import Link from "next/link"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Zap,
  Target,
  Sparkles,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/Workout/bottom-nav"
import { useUnit } from "@/lib/unit-context"
import {
  getExerciseProgressData,
  getVolumeByDay,
  generateInsights,
  calculateStats,
  type WorkoutInsight,
} from "@/lib/workout-store"

function fetchInsightsData() {
  return {
    exerciseProgress: getExerciseProgressData(),
    volumeByDay: getVolumeByDay(),
    insights: generateInsights(),
    stats: calculateStats(),
  }
}

function InsightCard({ insight }: { insight: WorkoutInsight }) {
  const getIcon = () => {
    switch (insight.type) {
      case "increase_weight":
        return <TrendingUp className="size-5 text-green-400" />
      case "increase_reps":
        return <Target className="size-5 text-blue-400" />
      case "rest_more":
        return <AlertCircle className="size-5 text-yellow-400" />
      case "maintain":
        return <CheckCircle className="size-5 text-green-400" />
      case "deload":
        return <TrendingDown className="size-5 text-red-400" />
      default:
        return <Zap className="size-5 text-primary" />
    }
  }

  const getPriorityColor = () => {
    switch (insight.priority) {
      case "high":
        return "border-red-500/30 bg-red-500/10"
      case "medium":
        return "border-yellow-500/30 bg-yellow-500/10"
      case "low":
        return "border-green-500/30 bg-green-500/10"
    }
  }

  const getPriorityBadge = () => {
    switch (insight.priority) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
    }
  }

  return (
    <Card className={`border ${getPriorityColor()}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{getIcon()}</div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">{insight.exercise}</h4>
              <Badge variant="outline" className={getPriorityBadge()}>
                {insight.priority}
              </Badge>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {insight.message}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ExerciseProgressChart({
  data,
  selectedExercise,
}: {
  data: { name: string; data: { date: string; maxWeight: number }[] }[]
  selectedExercise: string
}) {
  const { formatWeight, unit } = useUnit()
  const exerciseData = data.find(
    (e) => e.name.toLowerCase() === selectedExercise.toLowerCase()
  )

  if (!exerciseData || exerciseData.data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        No data for this exercise yet
      </div>
    )
  }

  const chartData = exerciseData.data.map((d) => ({
    date: d.date,
    weight: unit === "lbs" ? Math.round(d.maxWeight * 2.20462) : d.maxWeight,
  }))

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="date"
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          axisLine={{ stroke: "hsl(var(--border))" }}
        />
        <YAxis
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickFormatter={(value) => `${value}${unit}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          labelStyle={{ color: "hsl(var(--foreground))" }}
          formatter={(value) => [formatWeight(value as any), "Max Weight"]}
        />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

function VolumeChart({
  data,
}: {
  data: { date: string; volume: number; category: string }[]
}) {
  const { unit } = useUnit()

  const chartData = data.map((d) => ({
    date: d.date,
    volume: unit === "lbs" ? Math.round(d.volume * 2.20462) : d.volume,
    category: d.category,
  }))

  const getBarColor = (category: string) => {
    switch (category) {
      case "push":
        return "#ef4444"
      case "pull":
        return "#3b82f6"
      case "legs":
        return "#22c55e"
      default:
        return "#eab308"
    }
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="date"
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          axisLine={{ stroke: "hsl(var(--border))" }}
        />
        <YAxis
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickFormatter={(value) => `${(value / 1000).toFixed(1)}t`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          labelStyle={{ color: "hsl(var(--foreground))" }}
          formatter={(value) => [
            `${(value as any / 1000).toFixed(2)}t`,
            "Volume",
          ]}
        />
        <Bar
          dataKey="volume"
          radius={[4, 4, 0, 0]}
          fill="hsl(var(--primary))"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default function InsightsPage() {
  const { data } = useSWR("insights-data", fetchInsightsData, {
    fallbackData: fetchInsightsData(),
  })

  const [selectedExercise, setSelectedExercise] = useState<string>(
    data?.exerciseProgress[0]?.name || "Bench Press"
  )

  if (!data) return null

  const exerciseNames = data.exerciseProgress.map((e) => e.name)

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient effect */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <main className="relative mx-auto max-w-2xl px-4 pb-32 pt-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Performance Analysis
              </p>
              <h1 className="flex items-center gap-2 font-[var(--font-display)] text-3xl font-bold tracking-tight text-foreground">
                <Sparkles className="size-7 text-primary" />
                AI INSIGHTS
              </h1>
            </div>
          </div>

          {/* AI Recommendations */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-1 w-4 rounded-full bg-primary" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Smart Recommendations
              </h2>
            </div>

            {data.insights.length === 0 ? (
              <Card className="border-border bg-card">
                <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                  <Sparkles className="mb-3 size-12 text-muted-foreground/50" />
                  <p className="text-muted-foreground">
                    Complete more workouts to receive personalized insights
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {data.insights.map((insight, idx) => (
                  <InsightCard key={idx} insight={insight} />
                ))}
              </div>
            )}
          </section>

          {/* Exercise Progress Chart */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-1 w-4 rounded-full bg-primary" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Exercise Progress
              </h2>
            </div>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">
                  Max Weight Over Time
                </CardTitle>
                <div className="flex flex-wrap gap-2 pt-2">
                  {exerciseNames.map((name) => (
                    <Button
                      key={name}
                      variant={selectedExercise === name ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedExercise(name)}
                      className={
                        selectedExercise === name
                          ? "bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }
                    >
                      {name}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <ExerciseProgressChart
                  data={data.exerciseProgress}
                  selectedExercise={selectedExercise}
                />
              </CardContent>
            </Card>
          </section>

          {/* Volume Chart */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-1 w-4 rounded-full bg-primary" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Training Volume
              </h2>
            </div>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">
                  Daily Volume (Weight x Reps)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <VolumeChart data={data.volumeByDay} />
              </CardContent>
            </Card>
          </section>

          {/* Quick Stats */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-1 w-4 rounded-full bg-primary" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Performance Summary
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Card className="border-border bg-card">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-foreground">
                    {data.stats.totalVolume}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Total Tons
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-foreground">
                    {data.exerciseProgress.length}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Unique Exercises
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-foreground">
                    {data.volumeByDay.length}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Workout Sessions
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {data.stats.currentStreak}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Day Streak
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
