import * as React from 'react'
import { cn } from '@/utils/index'

/* ========================================================================

======================================================================== */

export function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot='pagination-content'
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  )
}
