'use client'

import * as React from 'react'
import { cn } from '@/utils'
import { StepperProvider } from './StepperContext'

type Variant = React.ComponentProps<typeof StepperProvider>['variant']
type StepperProps = React.ComponentProps<'div'>

//` items-center
const basesClasses = `
bg-background-light flex-container flex flex-wrap justify-between gap-4
`

/* ========================================================================

======================================================================== */

export function Stepper({
  alternativeLabel = false,
  separatorBreakpoint = Infinity,
  children,
  className,
  variant = 'default',
  ...otherProps
}: StepperProps & {
  alternativeLabel?: boolean
  separatorBreakpoint?: number
  variant?: Variant
}) {
  /* ======================
          return
  ====================== */

  return (
    <StepperProvider
      alternativeLabel={alternativeLabel}
      separatorBreakpoint={separatorBreakpoint}
      variant={variant}
    >
      <div
        data-slot='stepper'
        {...otherProps}
        className={cn(basesClasses, className)}
      >
        {children}
      </div>
    </StepperProvider>
  )
}
