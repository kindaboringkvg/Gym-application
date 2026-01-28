import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

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
              <AlertTriangle className="size-8 text-primary" />
            </div>
            <CardTitle className="font-[family-name:var(--font-display)] text-2xl tracking-wide">
              SOMETHING WENT WRONG
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-primary/50 bg-primary/10 p-4">
              <p className="text-sm text-primary">
                {params?.error || 'An unspecified error occurred during authentication.'}
              </p>
            </div>
            <Link href="/auth/login" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90">
                Try Again
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
