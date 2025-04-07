'use client'

import * as React from 'react'
import { Check, LoaderCircle, X } from 'lucide-react'
import { cn } from '@/utils'
import { useStepperContext } from './StepperContext'
import { StepBody } from './StepBody'
import { StepSeparator } from './StepSeparator'
import { useMediaQuery } from './useMediaQuery'

// Why not use React.HTMLAttributes<HTMLButtonElement> ?
// Because ref is not baked into that type.
type StepProps = React.ComponentProps<'button'> & {
  description?: React.ReactNode
  icon?: React.ReactNode
  index: number
  isActive: boolean
  isCompleted: boolean
  isLoading?: boolean
  /** Use isValid  true | false | undefined to opt into success and/or error styles. */
  isValid?: boolean
  label?: React.ReactNode
}

// ⚠️ text-* size is NOT set here. Instead, set
// text-* on the `Stepper` and everything
// with em units will inherit from that.
// text-* is used to set the overall size.

const buttonBaseClasses = `
items-center
flex gap-2 text-left
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
  label = '',
  icon,
  ref,
  ...otherProps
}: StepProps) {
  const { alternativeLabel, separatorBreakpoint, variant } = useStepperContext()

  // i.e., matches the breakpoint for removing the StepSeparators.
  const matches = useMediaQuery(`(max-width: ${separatorBreakpoint}px)`)

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
        state & refs
  ====================== */

  const internalButtonRef = React.useRef<HTMLButtonElement | null>(null)
  const stepCirceRef = React.useRef<HTMLDivElement | null>(null)

  const [stepCircleHeight, setStepCircleHeight] = React.useState(0)

  const [stepCircleSize, setStepCircleSize] = React.useState(0)
  const [buttonWidth, setButtonWidth] = React.useState(0)
  const [_isFirst, setIsFirst] = React.useState(false)
  const [isLast, setIsLast] = React.useState(false)

  ///////////////////////////////////////////////////////////////////////////
  //
  // As part of the alternativeLabel feature, separatorLengthFix
  // is used to set a negative marginRight on the PREVIOUS StepSeparator.
  // A similar separatorLengthFix exists within the current StepSeparator
  // to set a negative marginLeft on its <div>.
  //
  // In this way, we're able to achieve the correct spacing between
  // buttons and separators when alternativeLabel is true. In other words,
  // we are correcting for excessive horizontal spacing due to the width of
  // the label and/or description. This effect is similar to the behavior of
  // the MUI Stepper's alternativeLabel feature, though the implementation
  // details may differ:
  //
  //   https://mui.com/material-ui/react-stepper/#alternative-label
  //
  // The downside is that the presence of StepSeparators with negative margins
  // will cause Steps to appear to crash into each other when horizontal space
  // becomes to scrunched. To mitigate this, one can use `separatorBreakpoint`
  // such that below this viewport width, the StepSeparators are removed.
  //
  // The alternativeLabel feature introduced the most complexity to the Stepper.
  // However, it seems to work well enough, but separatorBreakpoint will
  // likely need finessing for each use case.
  //
  ///////////////////////////////////////////////////////////////////////////

  const separatorLengthFix = (buttonWidth - stepCircleSize) / -2

  React.useEffect(() => {
    if (!internalButtonRef.current) {
      return
    }

    const previousSibling = internalButtonRef.current.previousElementSibling
    if (
      previousSibling &&
      previousSibling.getAttribute('data-slot') === 'step-separator' &&
      alternativeLabel &&
      previousSibling instanceof HTMLElement
    ) {
      previousSibling.style.marginRight = `${separatorLengthFix}px`
    }

    return () => {
      if (
        previousSibling &&
        previousSibling.getAttribute('data-slot') === 'step-separator' &&
        alternativeLabel &&
        previousSibling instanceof HTMLElement
      ) {
        previousSibling.style.marginRight = ''
      }
    }
  }, [alternativeLabel, separatorLengthFix])

  /* ======================
          useEffect()
  ====================== */
  // Implement useLayoutEffect to run after render and before paint.
  // At the time immediately following the first render, all steps
  // will have rendered and be known to the DOM. Consequently, we
  // can get the parent of Step, then get the [data-slot="step"] children,
  // then determine first and last buttons.

  React.useEffect(() => {
    if (!internalButtonRef.current) {
      return
    }

    const parent = internalButtonRef.current.parentElement
    const steps = parent!.querySelectorAll<HTMLElement>('[data-slot="step"]')

    if (steps.length > 0) {
      const isFirstStep = steps[0] === internalButtonRef.current
      const isLastStep = steps[steps.length - 1] === internalButtonRef.current
      setIsFirst(isFirstStep)
      setIsLast(isLastStep)
    }
  }, [])

  /* ======================
          useEffect()
  ====================== */
  ///////////////////////////////////////////////////////////////////////////
  //
  // It's plausible that one may change the size of the Step at
  // some point based on the viewport size, or some other criteria.
  // This, in turn affects the size of the stepCircle.
  //
  // Regardless of how this is accomplished, the height
  // of the stepCircle is checked on EVERY render.
  // Then stepCircleHeight is added to the dependency array
  // of the subsequent useEffect that updates the stepCircleSize.
  // Then stepCircleSize is added to the final useEffect's
  // dependency array that updates buttonWidth.
  //
  // ⚠️ This useEffect runs on EVERY render and assumes that any change to
  // stepCircleHeight will be the result of a prop change higher up
  // (e.g., className, style, or size (if exists) prop) on the Stepper:
  //
  //   <Stepper className={`${size}`} />
  //
  // Conversely, if the height changes as a result of some preexisting media query
  // that targets the step circles's size, then this useEffect will not be triggered.
  //
  //   <Stepper className="text-base lg:text-3xl" />
  //
  // However, the latter implementation still seems to work, thanks
  // to the resize handler in the buttonWidth useEffect().
  //
  ///////////////////////////////////////////////////////////////////////////

  // eslint-disable-next-line
  React.useEffect(() => {
    if (stepCirceRef.current) {
      const newHeight = stepCirceRef.current.offsetHeight
      if (newHeight !== stepCircleHeight) {
        setStepCircleHeight(newHeight)
      }
    }
  })

  /* ======================
          useEffect()
  ====================== */
  // Update stepCircleSize.

  React.useEffect(() => {
    // Creating a new macrotask is important for getting the correct size.
    setTimeout(() => {
      if (stepCirceRef.current) {
        // Here we can just use height because the
        // element has the same height and width.
        const height = stepCirceRef.current.offsetHeight
        setStepCircleSize(height)
      }
    }, 0)
  }, [alternativeLabel, stepCircleHeight])

  /* ======================
          useEffect()
  ====================== */
  // Update buttonWidth.

  React.useEffect(() => {
    const updateButtonWidth = () => {
      // Prior to implementing the resize handler, buttonWidth was only
      // being set on mount. However, the width was getting miscalculated.
      // This was fixed by creating a new macrotask. Follwing that pattern,
      // the setTimeout has also been baked into the resize handler. This
      // could potentially be too expensive, but it seems to work fine.
      setTimeout(() => {
        if (internalButtonRef.current) {
          const width = internalButtonRef.current.offsetWidth
          setButtonWidth(width)
        }
      }, 0)
    }

    updateButtonWidth()

    window.addEventListener('resize', updateButtonWidth)
    return () => {
      window.removeEventListener('resize', updateButtonWidth)
    }
  }, [alternativeLabel, stepCircleSize])

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
        ref={stepCirceRef}
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
          return
  ====================== */

  return (
    <>
      <button
        ref={(node) => {
          if (ref && 'current' in ref) {
            ref.current = node
          } else if (typeof ref === 'function') {
            ref?.(node)
          }
          internalButtonRef.current = node
        }}
        data-slot='step'
        {...otherProps}
        className={cn(
          buttonBaseClasses,

          matches && 'flex-1',

          { 'flex-col text-center': alternativeLabel },

          className
        )}
        type='button'
      >
        {renderStepCircle()}

        <StepBody
          description={description}
          isCompleted={isCompleted}
          isValid={isValid}
          label={label}
        />
      </button>

      <StepSeparator
        buttonWidth={buttonWidth}
        isCompleted={isCompleted}
        isLast={isLast}
        isValid={isValid}
        stepCircleSize={stepCircleSize}
      />
    </>
  )
}
