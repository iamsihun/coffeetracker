'use client'

import { useRef } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

const TRANSITION_MS = 350

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const transitionTimeout = useRef<number>()

  const toggleTheme = () => {
    const root = document.documentElement
    root.classList.add('theme-transition')
    window.clearTimeout(transitionTimeout.current)
    transitionTimeout.current = window.setTimeout(() => {
      root.classList.remove('theme-transition')
    }, TRANSITION_MS)

    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
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
