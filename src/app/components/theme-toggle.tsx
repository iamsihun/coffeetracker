'use client'

import { flushSync } from 'react-dom'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark'
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => void
    }

    if (typeof doc.startViewTransition === 'function') {
      // Snapshot the page, apply the theme synchronously, then cross-fade
      doc.startViewTransition(() => {
        flushSync(() => setTheme(next))
      })
    } else {
      setTheme(next)
    }
  }

  return (
    <Button variant="ghost" size="icon" className="relative h-9 w-9" onClick={toggleTheme}>
      {/* Both icons render; CSS swaps them so server and client markup match */}
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
