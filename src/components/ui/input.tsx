import * as React from 'react'

import { cn } from '@/lib/utils'

const DATE_LIKE_TYPES = ['date', 'time', 'datetime-local', 'month', 'week']

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          // Date-like inputs lay out their own internals: `flex` crams the
          // picker icon against the text on desktop, and iOS Safari ignores
          // the width and overflows unless appearance is reset.
          type && DATE_LIKE_TYPES.includes(type) &&
            'block min-w-0 appearance-none [&::-webkit-date-and-time-value]:text-left',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
