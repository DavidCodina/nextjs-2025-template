'use client'

import * as React from 'react'
import { cn } from '@/utils'
import { useStepperContext } from './StepperContext'

type StepBodyProps = React.HTMLAttributes<HTMLDivElement> & {
  description: React.ReactNode
  isCompleted: boolean
  /** Use isValid  true | false | undefined to opt into success and/or error styles. */
  isValid: boolean | undefined
  label: React.ReactNode
}

/* ========================================================================

======================================================================== */

export const StepBody = ({
  description = '',
  isCompleted = false,
  isValid = undefined, // Do not set true or false as the default.
  label = '',
  ...otherProps
}: StepBodyProps) => {
  const { variant } = useStepperContext()

  /* ======================
        labelVariant
  ====================== */

  let labelVariant = ''

  switch (variant) {
    case 'default':
      labelVariant = 'text-foreground'
      break
    case 'primary':
      labelVariant = 'text-primary'
      break
    case 'secondary':
      labelVariant = 'text-secondary'
      break

    default:
      labelVariant = 'text-foreground'
      break
  }
  /* ======================
          return
  ====================== */

  if (!label && !description) {
    return null
  }

  return (
    <div {...otherProps}>
      {label && (
        <div
          {...(isValid === false
            ? { 'data-valid': false }
            : isValid === true
              ? { 'data-valid': true }
              : {})}
          className={cn(
            'font-semibold whitespace-nowrap',
            labelVariant,

            !isCompleted &&
              isValid === false &&
              'data-[valid=false]:text-destructive',
            isCompleted && isValid === true && 'data-[valid=true]:text-success'
          )}
        >
          {label}
        </div>
      )}
      {description && (
        <div className='text-muted-foreground text-[0.75em] whitespace-nowrap'>
          {description}
        </div>
      )}
    </div>
  )
}
