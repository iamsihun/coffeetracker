'use client'

import { useState, useTransition, type ReactNode } from 'react'
import { Button, type ButtonProps } from '@/components/ui/button'
import { ConfirmDialog } from './confirm-dialog'

export function ConfirmDeleteButton({
  deleteAction,
  message,
  label,
  className,
  variant = 'outline',
  size = 'sm',
  'aria-label': ariaLabel,
}: {
  deleteAction: () => Promise<void>
  message: string
  label: ReactNode
  className?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
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
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={() => setShowConfirm(true)}
        className={className}
        aria-label={ariaLabel}
      >
        {label}
      </Button>
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
