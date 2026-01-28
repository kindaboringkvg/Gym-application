'use client'

import React from "react"

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push('/')
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="text-foreground">IRON</span>
            <span className="text-primary">PULSE</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Track your gains. Crush your goals.</p>
        </div>
        
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="font-[family-name:var(--font-display)] text-2xl tracking-wide">
              WELCOME BACK
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your workout data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="athlete@ironpulse.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-border/50 bg-secondary/50 focus:border-primary"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-border/50 bg-secondary/50 focus:border-primary"
                  />
                </div>
                {error && (
                  <div className="rounded-lg border border-primary/50 bg-primary/10 px-4 py-3">
                    <p className="text-sm text-primary">{error}</p>
                  </div>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-primary font-semibold tracking-wide hover:bg-primary/90" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'LOGIN'
                  )}
                </Button>
              </div>
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">{"Don't have an account? "}</span>
                <Link
                  href="/auth/sign-up"
                  className="font-semibold text-primary hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
