'use client'

import * as React from 'react'
import { cn } from '@/utils'

// Note: last:mb-6 will create a higher specificity such that
// If you pass in someething like mb-4, it will get ignored.
const baseClasses = `px-6 mt-6 last:mb-6`

/* ========================================================================

======================================================================== */

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-content'
      className={cn(baseClasses, className)}
      {...props}
    />
  )
}

export { CardContent }
