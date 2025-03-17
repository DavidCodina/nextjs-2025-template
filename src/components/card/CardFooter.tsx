'use client'

import * as React from 'react'
import { cn } from '@/utils'

/* ========================================================================

======================================================================== */

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-footer'
      className={cn('mt-auto -mb-6 flex items-center p-6', className)}
      {...props}
    />
  )
}

export { CardFooter }
