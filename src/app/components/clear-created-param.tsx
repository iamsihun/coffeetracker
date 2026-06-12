'use client'

import { useEffect } from 'react'

const HIGHLIGHT_MS = 2500

/**
 * Rendered when the page URL has ?created=<brewId>. Scrolls the new brew into
 * view, then strips the param once the highlight animation finishes so a
 * refresh or back-navigation doesn't replay it.
 *
 * Uses history.replaceState (a shallow URL update) rather than router.replace:
 * a router navigation would re-render the page without ?created, flipping the
 * brew form's initialOpen back to true and re-expanding it.
 */
export function ClearCreatedParam({
  beanId,
  createdId,
}: {
  beanId: string
  createdId: string
}) {
  useEffect(() => {
    document
      .getElementById(`brew-${createdId}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })

    const timeout = window.setTimeout(() => {
      window.history.replaceState(null, '', `/beans/${beanId}`)
    }, HIGHLIGHT_MS)

    return () => window.clearTimeout(timeout)
  }, [beanId, createdId])

  return null
}
