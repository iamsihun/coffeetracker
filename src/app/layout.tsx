import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Coffee Tracker',
  description: 'Track your coffee bean brews',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-stone-50 min-h-screen`}>
        <header className="bg-amber-900 text-white px-4 py-4 sticky top-0 z-10 shadow-sm">
          <div className="max-w-lg mx-auto">
            <a href="/" className="text-lg font-semibold tracking-tight">
              Coffee Tracker
            </a>
          </div>
        </header>
        <main className="max-w-lg mx-auto px-4 py-6">{children}</main>
        <Analytics />
      </body>
    </html>
  )
}
