"use client"

import { LayoutGrid, History, Sparkles, User, Plus, Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface BottomNavProps {
  onAddExercise?: () => void
}

export function BottomNav({ onAddExercise }: BottomNavProps) {
  const pathname = usePathname()
  
  const navItems = [
    { href: "/", icon: LayoutGrid, label: "Dashboard" },
    { href: "/history", icon: History, label: "History" },
  ]
  
  const rightNavItems = [
    { href: "/insights", icon: Sparkles, label: "AI Insights" },
    { href: "/profile", icon: User, label: "Profile" },
  ]
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="mx-auto max-w-md px-4 pb-4">
        <div className="relative flex items-center justify-center">
          {/* Navigation bar */}
          <nav className="flex items-center gap-8 rounded-full bg-secondary/90 px-8 py-3 backdrop-blur-lg">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={
                    pathname === item.href
                      ? "text-primary hover:bg-transparent hover:text-primary"
                      : "text-muted-foreground hover:bg-transparent hover:text-foreground"
                  }
                >
                  <item.icon className="size-5" />
                  <span className="sr-only">{item.label}</span>
                </Button>
              </Link>
            ))}
            
            {/* Spacer for FAB */}
            <div className="w-12" />
            
            {rightNavItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={
                    pathname === item.href
                      ? "text-primary hover:bg-transparent hover:text-primary"
                      : "text-muted-foreground hover:bg-transparent hover:text-foreground"
                  }
                >
                  <item.icon className="size-5" />
                  <span className="sr-only">{item.label}</span>
                </Button>
              </Link>
            ))}
          </nav>

          {/* Floating action button */}
          {onAddExercise && (
            <Button
              onClick={onAddExercise}
              className="absolute -top-4 size-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 hover:shadow-primary/50"
            >
              <Plus className="size-6" />
              <span className="sr-only">Add exercise</span>
            </Button>
          )}
          
          {!onAddExercise && (
            <Link href="/">
              <Button
                className="absolute -top-4 size-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 hover:shadow-primary/50"
              >
                <Plus className="size-6" />
                <span className="sr-only">Add exercise</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
