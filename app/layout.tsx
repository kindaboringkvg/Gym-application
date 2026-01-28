import React from "react"
import type { Metadata, Viewport } from 'next'
import { Oswald, Inter } from 'next/font/google'
// import { Analytics } from '@vercel/analytics/next'
import { UnitProvider } from '@/lib/unit-context'
import './globals.css'

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'IRONPULSE - Track Your Workout Progress',
  description: 'A cinematic gym app for tracking workout progress with detailed exercise logging',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${oswald.variable} ${inter.variable} font-sans antialiased`}>
        <UnitProvider>
          {children}
        </UnitProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
