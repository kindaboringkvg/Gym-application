"use client"

import { Card, CardContent } from "@/components/ui/card"

interface AIAnalysisProps {
  analysis: string
}

export function AIAnalysis({ analysis }: AIAnalysisProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-0.5 w-6 bg-primary" />
        <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
          AI Coach Analysis
        </p>
      </div>
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-2 shrink-0 rounded-full bg-primary animate-pulse" />
            <div>
              <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                AI Analysis
              </p>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                &ldquo;{analysis}&rdquo;
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
