'use client'

import * as React from 'react'
import { Check, LoaderCircle, X } from 'lucide-react'
import { cn } from '@/utils'
import { useStepperContext } from './StepperContext'

type StepProps = React.HTMLAttributes<HTMLButtonElement> & {
  description?: React.ReactNode
  icon?: React.ReactNode
  index: number
  isActive: boolean
  isCompleted: boolean
  isLast?: boolean
  isLoading?: boolean
  /** Use isValid  true | false | undefined to opt into success and/or error styles. */
  isValid?: boolean
  label: React.ReactNode
}

// ⚠️ text-* size is NOT set here. Instead, set
// text-* on the `Stepper` and everything
// with em units will inherit from that.
// text-* is used to set the overall size.
const buttonBaseClasses = `
flex items-center gap-2 text-left 
[&_svg:not([class*='size-'])]:size-full
[&_svg:not([class*='size-'])]:p-[0.4em]
`

const stepCircleClasses = `
flex size-[2.5em] items-center font-bold justify-center shrink-0
border rounded-full shadow-[0px_1px_1px_rgba(0,0,0,0.35)]
`

/* ========================================================================

======================================================================== */
//# Should there be a disabled prop that gets passed into the provider and
//# then propogates to buttons and determines styles?

export function Step({
  className = '',
  description = '',
  index = 0,
  isActive = false,
  isCompleted = false,
  isLoading = false,
  isValid = undefined, // Do not set true or false as the default.
  isLast = false,
  label = '',
  icon,
  ...otherProps
}: StepProps) {
  const { variant } = useStepperContext()

  // Note: <Check /> still is given precedence lower
  // down whenever isCompleted is true.
  icon = isLoading ? (
    <LoaderCircle className='animate-spin' />
  ) : isValid === false ? (
    <X />
  ) : (
    icon
  )

  /* ======================
      renderStepCircle()
  ====================== */
  // Initially, I thought to use cva() for variants. However, on top of
  // each individual variant, there are also different states, and some of them
  // need to have precedence over others (i.e., isActive > isCompleted).
  // Consequently, it made more sense to do it all manually.
  const renderStepCircle = () => {
    const defaultStepCircleVariant =
      // isActive styles should have precedence over isCompleted styles.
      isActive
        ? `
        bg-background-light border-foreground text-foreground 
        `
        : isCompleted
          ? `
          bg-[oklch(from_var(--color-foreground)_calc(l_+_0.15)_c_h)]
          dark:bg-[oklch(from_var(--color-foreground)_calc(l_-_0.03)_c_h)]
          text-white dark:text-black border-foreground
          `
          : `
          text-foreground border-foreground dark:text-muted-foreground dark:border-border
          `

    const primaryStepCircleVariant = isActive
      ? `
      bg-background-light border-primary text-primary
      `
      : isCompleted
        ? `
        bg-primary text-primary-foreground
        border-[oklch(from_var(--color-primary)_calc(l_-_0.25)_c_h)]
        dark:border-[oklch(from_var(--color-primary)_calc(l_+_0.25)_c_h)]
        `
        : `
        text-muted-foreground
        `

    const secondaryStepCircleVariant = isActive
      ? `
      bg-background-light border-secondary text-secondary
      `
      : isCompleted
        ? `
        bg-secondary text-secondary-foreground
        border-[oklch(from_var(--color-secondary)_calc(l_-_0.25)_c_h)]
        dark:border-[oklch(from_var(--color-secondary)_calc(l_+_0.25)_c_h)]
        `
        : `
        text-muted-foreground
        `

    let stepCircleVariant = ''

    switch (variant) {
      case 'default':
        stepCircleVariant = defaultStepCircleVariant
        break
      case 'primary':
        stepCircleVariant = primaryStepCircleVariant
        break
      case 'secondary':
        stepCircleVariant = secondaryStepCircleVariant
        break

      default:
        stepCircleVariant = defaultStepCircleVariant
        break
    }

    return (
      <div
        {...(isValid === false
          ? { 'data-valid': false }
          : isValid === true
            ? { 'data-valid': true }
            : {})}
        className={cn(
          stepCircleClasses,
          stepCircleVariant,
          !isCompleted &&
            isValid === false &&
            'data-[valid=false]:text-destructive data-[valid=false]:border-destructive',

          isCompleted &&
            isActive &&
            `data-[valid=true]:text-success data-[valid=true]:border-success`,
          isCompleted &&
            !isActive &&
            isValid === true &&
            `data-[valid=true]:bg-success data-[valid=true]:text-success-foreground data-[valid=true]:border-[oklch(from_var(--color-success)_calc(l_-_0.25)_c_h)]`
        )}
      >
        {isCompleted ? <Check /> : icon ? icon : <span>{index + 1}</span>}
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

    return (
      <div>
        {label && (
          <div
            {...(isValid === false
              ? { 'data-valid': false }
              : isValid === true
                ? { 'data-valid': true }
                : {})}
            className={cn(
              'font-semibold',
              labelVariant,

              !isCompleted &&
                isValid === false &&
                'data-[valid=false]:text-destructive',
              isCompleted &&
                isValid === true &&
                'data-[valid=true]:text-success'
            )}
          >
            {label}
          </div>
        )}
        {description && (
          <div className='text-muted-foreground text-[0.75em]'>
            {description}
          </div>
        )}
      </div>
    )
  }

  /* ======================
      renderSeparator()
  ====================== */

  const renderSeparator = () => {
    if (isLast) {
      return null
    }

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

    return (
      <div
        {...(isValid === false
          ? { 'data-valid': false }
          : isValid === true
            ? { 'data-valid': true }
            : {})}
        className={cn(
          'h-0.5 flex-1',
          isCompleted ? separatorVariant : 'bg-border',
          isCompleted && isValid === true && 'data-[valid=true]:bg-success'
        )}
      />
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <>
      <button
        data-slot='step'
        {...otherProps}
        className={cn(buttonBaseClasses, className)}
        type='button'
      >
        {renderStepCircle()}
        {renderStepBody()}
      </button>

      {renderSeparator()}
    </>
  )
}
