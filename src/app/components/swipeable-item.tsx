'use client'

import { useRef, useState, useTransition, useEffect, type ReactNode } from 'react'

const DELETE_WIDTH = 80

export function SwipeableItem({
  children,
  deleteAction,
  className = '',
}: {
  children: ReactNode
  deleteAction: () => Promise<void>
  className?: string
}) {
  const [offset, setOffset] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPending, startTransition] = useTransition()
  const containerRef = useRef<HTMLDivElement>(null)
  const startX = useRef<number | null>(null)
  const startY = useRef<number | null>(null)
  const startOffset = useRef(0)
  const isHorizontal = useRef<boolean | null>(null)
  const liveOffset = useRef(0)

  useEffect(() => {
    liveOffset.current = offset
  }, [offset])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX
      startY.current = e.touches[0].clientY
      startOffset.current = liveOffset.current
      isHorizontal.current = null
      setIsAnimating(false)
    }

    const onTouchMove = (e: TouchEvent) => {
      if (startX.current === null || startY.current === null) return
      const dx = startX.current - e.touches[0].clientX
      const dy = startY.current - e.touches[0].clientY

      if (isHorizontal.current === null && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
        isHorizontal.current = Math.abs(dx) > Math.abs(dy)
      }

      if (isHorizontal.current) {
        e.preventDefault()
        setOffset(Math.min(Math.max(startOffset.current + dx, 0), DELETE_WIDTH))
      }
    }

    const onTouchEnd = () => {
      if (!isHorizontal.current) return
      setIsAnimating(true)
      setOffset(liveOffset.current > DELETE_WIDTH / 2 ? DELETE_WIDTH : 0)
      startX.current = null
      startY.current = null
      isHorizontal.current = null
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  const handleContentClick = (e: React.MouseEvent) => {
    if (offset > 0) {
      e.preventDefault()
      e.stopPropagation()
      setIsAnimating(true)
      setOffset(0)
    }
  }

  const handleDelete = () => {
    startTransition(async () => {
      await deleteAction()
    })
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden rounded-xl ${className}`}>
      {/* Delete zone revealed on swipe */}
      <div
        className="absolute right-0 top-0 bottom-0 flex items-center justify-center bg-red-500"
        style={{ width: DELETE_WIDTH }}
      >
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="w-full h-full text-white font-medium text-sm disabled:opacity-60"
        >
          {isPending ? '···' : 'Delete'}
        </button>
      </div>

      {/* Swipeable content — bg-white covers the delete zone when offset is 0 */}
      <div
        className="bg-white"
        style={{
          transform: `translateX(-${offset}px)`,
          transition: isAnimating ? 'transform 0.2s ease-out' : 'none',
        }}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  )
}
