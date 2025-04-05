'use client'

import * as React from 'react'
import { useStepperContext } from './StepperContext'
import { cn } from '@/utils'

type CompletedContentProps = React.ComponentProps<'div'>

/* ========================================================================

======================================================================== */

export function CompletedContent({
  children,
  className,
  ...otherProps
}: CompletedContentProps) {
  const { activeStep, totalSteps } = useStepperContext()

  /* ======================
          return
  ====================== */

  if (typeof totalSteps !== 'number' || activeStep < totalSteps) {
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
