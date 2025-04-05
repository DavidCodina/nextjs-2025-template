'use client'

import * as React from 'react'
import { useStepperContext } from './StepperContext'
import { cn } from '@/utils'

type StepContentProps = React.ComponentProps<'div'> & {
  step: number
}

/* ========================================================================

======================================================================== */

export function StepContent({
  children,
  className,
  step,
  ...otherProps
}: StepContentProps) {
  const { activeStep } = useStepperContext()

  /* ======================
          return
  ====================== */

  if (step !== activeStep) {
    return null
  }

  return (
    <div
      {...otherProps}
      className={cn(
        'bg-background-light mt-4 rounded-md border p-4',
        className
      )}
    >
      {children}
    </div>
  )
}
