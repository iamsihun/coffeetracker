import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Coffee } from 'lucide-react'
import './globals.css'
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/app/components/theme-provider'
import { ThemeToggle } from '@/app/components/theme-toggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Coffee Tracker',
  description: 'Track your coffee bean brews',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
              <a href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                <Coffee className="h-5 w-5 text-primary" />
                Coffee Tracker
              </a>
              <ThemeToggle />
            </div>
          </header>
          <main className="mx-auto max-w-lg px-4 py-6">{children}</main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
