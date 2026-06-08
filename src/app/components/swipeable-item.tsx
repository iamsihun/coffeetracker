'use client'

import { useRef, useState, useTransition, type ReactNode } from 'react'

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
  const startX = useRef<number | null>(null)
  const startOffset = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
    startOffset.current = offset
    setIsAnimating(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null) return
    const diff = startX.current - e.touches[0].clientX
    const newOffset = Math.min(Math.max(startOffset.current + diff, 0), DELETE_WIDTH)
    setOffset(newOffset)
  }

  const handleTouchEnd = () => {
    setIsAnimating(true)
    setOffset(offset > DELETE_WIDTH / 2 ? DELETE_WIDTH : 0)
    startX.current = null
  }

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
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
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
