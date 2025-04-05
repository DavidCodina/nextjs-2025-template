'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/utils'
import { useStepperContext } from './StepperContext'

type StepProps = React.HTMLAttributes<HTMLButtonElement> & {
  description?: React.ReactNode
  index: number
  isActive: boolean
  isCompleted: boolean
  isLast?: boolean
  label: React.ReactNode
  icon?: React.ReactNode
}

// ⚠️ text-base is temporary until size variants are a thing.
const buttonBaseClasses = `
flex items-center gap-2 text-left text-base
[&_svg:not([class*='size-'])]:size-full
[&_svg:not([class*='size-'])]:p-[0.4em]
`

const stepCircleClasses = `
flex size-[2.5em] items-center font-bold justify-center shrink-0
border rounded-full shadow-[0px_1px_1px_rgba(0,0,0,0.35)]
`

/* ========================================================================

======================================================================== */

export function Step({
  className = '',
  description = '',
  index = 0,
  isActive = false,
  isCompleted = false,
  isLast = false,
  label = '',
  icon,
  ...otherProps
}: StepProps) {
  const { variant } = useStepperContext()

  /* ======================
      renderStepCircle()
  ====================== */

  const renderStepCircle = () => {
    const defaultStepCircleVariant =
      // isActive styles should have precedence over isCompleted styles.
      isActive
        ? `bg-background-light border-foreground text-foreground`
        : isCompleted
          ? `
          bg-[oklch(from_var(--color-foreground)_calc(l_+_0.15)_c_h)]
          dark:bg-[oklch(from_var(--color-foreground)_calc(l_-_0.03)_c_h)]
          text-white dark:text-black border-foreground
          `
          : 'text-foreground border-foreground dark:text-muted-foreground dark:border-border'

    const primaryStepCircleVariant = isActive
      ? `bg-background-light border-primary text-primary`
      : isCompleted
        ? `
        bg-primary text-primary-foreground
        border-[oklch(from_var(--color-primary)_calc(l_-_0.25)_c_h)]
        dark:border-[oklch(from_var(--color-primary)_calc(l_+_0.25)_c_h)]
        `
        : 'text-muted-foreground'

    const secondaryStepCircleVariant = isActive
      ? `bg-background-light border-secondary text-secondary`
      : isCompleted
        ? `
        bg-secondary text-secondary-foreground
        border-[oklch(from_var(--color-secondary)_calc(l_-_0.25)_c_h)]
        dark:border-[oklch(from_var(--color-secondary)_calc(l_+_0.25)_c_h)]
        `
        : 'text-muted-foreground'

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
      <div className={cn(stepCircleClasses, stepCircleVariant)}>
        {isCompleted ? (
          <Check className='h-full w-full' />
        ) : icon ? (
          icon
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
          <div className={cn('font-semibold', labelVariant)}>{label}</div>
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
        className={cn(
          'bg-primary h-0.5 flex-1',
          isCompleted ? separatorVariant : 'bg-border'
        )}
      />
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <>
      <button {...otherProps} className={cn(buttonBaseClasses, className)}>
        {renderStepCircle()}
        {renderStepBody()}
      </button>

      {renderSeparator()}
    </>
  )
}
