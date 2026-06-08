'use client'

import { useState, useTransition } from 'react'
import { ConfirmDialog } from './confirm-dialog'

export function ConfirmDeleteButton({
  deleteAction,
  message,
  label,
  className,
  'aria-label': ariaLabel,
}: {
  deleteAction: () => Promise<void>
  message: string
  label: string
  className?: string
  'aria-label'?: string
}) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleConfirm = () => {
    startTransition(async () => {
      await deleteAction()
    })
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className={className}
        aria-label={ariaLabel}
      >
        {label}
      </button>
      <ConfirmDialog
        isOpen={showConfirm}
        message={message}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
        isPending={isPending}
      />
    </>
  )
}
