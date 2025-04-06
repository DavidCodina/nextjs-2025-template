'use client'

import * as React from 'react'
import { cn } from '@/utils'
import { StepperProvider } from './StepperContext'

type Variant = React.ComponentProps<typeof StepperProvider>['variant']
type StepperProps = React.ComponentProps<'div'>

const basesClasses = `
flex flex-wrap justify-between items-center gap-4
`

/* ========================================================================

======================================================================== */

export function Stepper({
  children,
  className,
  variant = 'default',
  ...otherProps
}: StepperProps & { variant?: Variant }) {
  /* ======================
          return
  ====================== */

  return (
    <StepperProvider variant={variant}>
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
