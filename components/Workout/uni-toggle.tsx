"use client"

import { useUnit } from "@/lib/unit-context"
import { Button } from "@/components/ui/button"

export function UnitToggle() {
  const { unit, toggleUnit } = useUnit()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleUnit}
      className="border-border bg-secondary/50 text-xs font-semibold uppercase tracking-wider hover:bg-secondary"
    >
      {unit === "kg" ? "KG" : "LBS"}
    </Button>
  )
}
