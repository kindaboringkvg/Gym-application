import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Mail } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="text-foreground">IRON</span>
            <span className="text-primary">PULSE</span>
          </h1>
        </div>
        
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/20">
              <CheckCircle className="size-8 text-primary" />
            </div>
            <CardTitle className="font-[family-name:var(--font-display)] text-2xl tracking-wide">
              {"YOU'RE IN!"}
            </CardTitle>
            <CardDescription>
              Check your email to complete registration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-secondary/30 p-4">
              <Mail className="size-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {"We've sent a confirmation link to your email. Click it to activate your account and start tracking your gains."}
              </p>
            </div>
            <Link href="/auth/login" className="block">
              <Button variant="outline" className="w-full border-border/50 bg-transparent">
                Back to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
