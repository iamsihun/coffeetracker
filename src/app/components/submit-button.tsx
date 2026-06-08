'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton({
  label,
  pendingLabel,
  className,
  'aria-label': ariaLabel,
}: {
  label: string
  pendingLabel: string
  className?: string
  'aria-label'?: string
}) {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className={className} aria-label={ariaLabel}>
      {pending ? pendingLabel : label}
    </button>
  )
}
