'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/utils'
import { TOOLTIP_ZINDEX_CLASS } from '../component-constants'

const baseClasses = `
bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95
data-[state=closed]:animate-out data-[state=closed]:fade-out-0
data-[state=closed]:zoom-out-95
data-[side=bottom]:slide-in-from-top-2
data-[side=left]:slide-in-from-right-2
data-[side=right]:slide-in-from-left-2
data-[side=top]:slide-in-from-bottom-2 
w-fit rounded-md px-3 py-1.5 text-xs text-balance
${TOOLTIP_ZINDEX_CLASS}
`

const arrowClasses = `
bg-primary fill-primary size-2.5 
translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]
${TOOLTIP_ZINDEX_CLASS}
`

/* ========================================================================

======================================================================== */

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot='tooltip-content'
        sideOffset={sideOffset}
        className={cn(baseClasses, className)}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className={arrowClasses} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { TooltipContent }
