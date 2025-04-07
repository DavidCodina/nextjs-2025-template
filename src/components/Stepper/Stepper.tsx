'use client'

import * as React from 'react'
import { cn } from '@/utils'
import { StepperProvider } from './StepperContext'

type Variant = React.ComponentProps<typeof StepperProvider>['variant']
type StepperProps = React.ComponentProps<'div'>

const basesClasses = `
flex-container flex flex-wrap justify-between
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
        className={cn(
          basesClasses,
          alternativeLabel ? 'gap-y-4' : 'gap-4',
          className
        )}
      >
        {children}
      </div>
    </StepperProvider>
  )
}
