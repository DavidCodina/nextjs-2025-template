'use client'

import * as React from 'react'
import { cn } from '@/utils'

type StepperProps = React.ComponentProps<'div'>

//# flex-wrap is good, but check Chakra to see if it gets centered on next line.
const basesClasses = `
flex flex-wrap justify-between items-center gap-4
`

/* ========================================================================

======================================================================== */
//# Nice to have: sometimes there's something like a isError prop that will change the
//# icon to an X.

export function Stepper({ children, className, ...otherProps }: StepperProps) {
  /* ======================
          return
  ====================== */

  return (
    <div {...otherProps} className={cn(basesClasses, className)}>
      {children}
    </div>
  )
}
