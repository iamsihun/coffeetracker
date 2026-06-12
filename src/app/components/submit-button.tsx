'use client'

import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
import { Button, type ButtonProps } from '@/components/ui/button'

export function SubmitButton({
  label,
  pendingLabel,
  className,
  variant,
  size,
  'aria-label': ariaLabel,
}: {
  label: string
  pendingLabel: string
  className?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  'aria-label'?: string
}) {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      variant={variant}
      size={size}
      className={className}
      aria-label={ariaLabel}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          {pendingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  )
}
