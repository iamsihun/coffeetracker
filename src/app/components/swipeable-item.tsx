'use client'

import { useRef, useState, useTransition, useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ConfirmDialog } from './confirm-dialog'

const DELETE_WIDTH = 80

export function SwipeableItem({
  children,
  deleteAction,
  className = '',
  id,
}: {
  children: ReactNode
  deleteAction: () => Promise<void>
  className?: string
  id?: string
}) {
  const [offset, setOffset] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
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
    setShowConfirm(true)
  }

  const handleConfirm = () => {
    startTransition(async () => {
      await deleteAction()
    })
  }

  const handleCancel = () => {
    setShowConfirm(false)
    setIsAnimating(true)
    setOffset(0)
  }

  return (
    <div
      ref={containerRef}
      id={id}
      className={cn(
        'relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
    >
      <ConfirmDialog
        isOpen={showConfirm}
        message="Are you sure you want to delete this?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isPending={isPending}
      />
      {/* Delete zone revealed on swipe */}
      <div
        className="absolute right-0 top-0 bottom-0 flex items-center justify-center bg-destructive"
        style={{ width: DELETE_WIDTH }}
      >
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="h-full w-full text-sm font-medium text-destructive-foreground disabled:opacity-60"
        >
          Delete
        </button>
      </div>

      {/* Swipeable content — card background covers the delete zone when offset is 0 */}
      <div
        className="bg-card"
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
