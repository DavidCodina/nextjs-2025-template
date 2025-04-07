'use client'

import * as React from 'react'
import { cn } from '@/utils'
import { useStepperContext } from './StepperContext'
import { useMediaQuery } from './useMediaQuery'

type StepSeparatorProps = React.ComponentProps<'div'> & {
  isCompleted: boolean
  isLast: boolean
  /** Use isValid  true | false | undefined to opt into success and/or error styles. */
  isValid: boolean | undefined
  stepCircleSize: number
  buttonWidth: number
}

/* ========================================================================

======================================================================== */

export const StepSeparator = ({
  isCompleted = false,
  isLast = false,
  isValid = undefined, // Do not set true or false as the default.
  stepCircleSize = 0,
  buttonWidth = 0,
  ref,
  ...otherProps
}: StepSeparatorProps) => {
  const { alternativeLabel, separatorBreakpoint, variant } = useStepperContext()

  // i.e., matches the breakpoint for removing the StepSeparators.
  const matches = useMediaQuery(`(max-width: ${separatorBreakpoint}px)`)

  const internalSeparatorRef = React.useRef<HTMLDivElement | null>(null)

  const separatorLengthFix = (buttonWidth - stepCircleSize) / -2

  // alternativeLabelStyle depends on Stepper container using `items-start` when
  // alternativeLabel prop is true. That way, the StepSeparator is initially
  // at the very top of the container, and it can be moved down as needed.
  const alternativeLabelStyle: React.CSSProperties = {
    position: 'relative',
    top: stepCircleSize / 2,
    transform: 'translateY(-50%)',
    marginLeft: separatorLengthFix
  }

  /* ======================
      separatorVariant
  ====================== */

  let separatorVariant = ''

  switch (variant) {
    case 'default':
      separatorVariant = 'bg-foreground'
      break
    case 'primary':
      separatorVariant = 'bg-primary'
      break
    case 'secondary':
      separatorVariant = 'bg-secondary'
      break
    default:
      separatorVariant = 'bg-foreground'
      break
  }

  /* ======================
          return
  ====================== */

  if (isLast) {
    return null
  }

  return (
    <div
      ref={(node) => {
        if (ref && 'current' in ref) {
          ref.current = node
        } else if (typeof ref === 'function') {
          ref?.(node)
        }
        internalSeparatorRef.current = node
      }}
      {...otherProps}
      data-slot='step-separator'
      {...(isValid === false
        ? { 'data-valid': false }
        : isValid === true
          ? { 'data-valid': true }
          : {})}
      className={cn(
        'h-[2px] flex-1',
        matches && 'hidden',
        isCompleted ? separatorVariant : 'bg-border',
        isCompleted && isValid === true && 'data-[valid=true]:bg-success'
      )}
      style={{
        ...(alternativeLabel ? alternativeLabelStyle : {})
      }}
    />
  )
}
