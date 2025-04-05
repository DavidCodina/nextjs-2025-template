'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/utils'
// import { useStepperContext } from './StepperContext'

interface StepProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: string
  description?: string
  index?: number
  isActive?: boolean
  //! isLast?: boolean
  // icon?: React.ReactNode
  isCompleted?: boolean
}

const stepCircleClasses = `
flex size-10 items-center font-bold justify-center shrink-0
rounded-full border 
`

/* ========================================================================

======================================================================== */
//# See Mantine example for responsive behavior.
// https://mantine.dev/core/stepper/

// That said Chakra seems to have a more basic approach.
// https://www.chakra-ui.com/docs/components/steps

//# Use isCompleted to set the completed checkmark.
//# Create NextTrigger and PreviousTrigger to hook into context.
//# Make sure I'm using correct theme colors.
//# Add variants.
//# Move activeStep state into the context.
//# Work on responsive behavior.

export function Step({
  className,
  description,
  index = 0,
  isActive = false,
  isCompleted = false,
  label,
  //! isLast = false,
  // icon,
  ...otherProps
}: StepProps) {
  /* ======================
    renderStepCircle()
  ====================== */

  const renderStepCircle = () => {
    return (
      <div
        className={cn(
          stepCircleClasses,
          isCompleted
            ? `bg-primary text-primary-foreground border-primary p-1.5`
            : isActive
              ? `text-primary border-primary`
              : 'text-muted-foreground'
        )}
      >
        {isCompleted ? (
          <Check className='h-full w-full' />
        ) : (
          <span>{index + 1}</span>
        )}
      </div>
    )
  }

  /* ======================
      renderStepBody()
  ====================== */

  const renderStepBody = () => {
    return (
      <div className=''>
        <div className='font-semibold'>{label}</div>
        <div className='text-muted-foreground text-xs'>{description}</div>
      </div>
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <button {...otherProps} className={cn('flex gap-2 text-left', className)}>
      {renderStepCircle()}
      {renderStepBody()}
    </button>
  )
}
