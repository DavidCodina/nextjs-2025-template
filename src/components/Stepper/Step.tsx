'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/utils'

type StepProps = React.HTMLAttributes<HTMLButtonElement> & {
  description?: string
  index: number
  isActive: boolean
  isCompleted: boolean
  isLast?: boolean
  label: string
  // icon?: React.ReactNode
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

//# Add variants.
//# Work on responsive behavior.

export function Step({
  className = '',
  description = '',
  index = 0,
  isActive = false,
  isCompleted = false,
  isLast = false,
  label = '',
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
          //# Rather than doing all this, use data-active and data-completed.
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
    if (!label && !description) {
      return null
    }
    return (
      <div>
        {label && <div className='font-semibold'>{label}</div>}
        {description && (
          <div className='text-muted-foreground text-xs'>{description}</div>
        )}
      </div>
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <>
      <button
        {...otherProps}
        className={cn('flex items-center gap-2 text-left', className)}
        data-active={isActive}
        data-completed={isCompleted}
      >
        {renderStepCircle()}
        {renderStepBody()}
      </button>

      {!isLast && (
        <div
          className={cn(
            'bg-primary h-0.5 flex-1',
            isCompleted ? 'bg-primary' : 'bg-border'
          )}
        />
      )}
    </>
  )
}
