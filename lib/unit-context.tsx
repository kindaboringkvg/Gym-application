"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type WeightUnit = "kg" | "lbs"

interface UnitContextType {
  unit: WeightUnit
  toggleUnit: () => void
  convertWeight: (weightInKg: number) => number
  formatWeight: (weightInKg: number) => string
  getUnitLabel: () => string
}

const UnitContext = createContext<UnitContextType | null>(null)

const KG_TO_LBS = 2.20462

export function UnitProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState<WeightUnit>("kg")

  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === "kg" ? "lbs" : "kg"))
  }, [])

  const convertWeight = useCallback(
    (weightInKg: number) => {
      if (unit === "lbs") {
        return Math.round(weightInKg * KG_TO_LBS * 10) / 10
      }
      return weightInKg
    },
    [unit]
  )

  const formatWeight = useCallback(
    (weightInKg: number) => {
      const converted = convertWeight(weightInKg)
      return `${converted}${unit}`
    },
    [convertWeight, unit]
  )

  const getUnitLabel = useCallback(() => unit, [unit])

  return (
    <UnitContext.Provider
      value={{ unit, toggleUnit, convertWeight, formatWeight, getUnitLabel }}
    >
      {children}
    </UnitContext.Provider>
  )
}

export function useUnit() {
  const context = useContext(UnitContext)
  if (!context) {
    throw new Error("useUnit must be used within a UnitProvider")
  }
  return context
}
