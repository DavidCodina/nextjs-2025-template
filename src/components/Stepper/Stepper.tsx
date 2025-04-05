'use client'

import * as React from 'react'
import { useStepperContext } from './StepperContext'
import { cn } from '@/utils'

type StepperProps = React.ComponentProps<'div'>

//# flex-wrap is good, but check Chakra to see if it gets centered on next line.
const basesClasses = `
flex flex-wrap justify-between items-center gap-4
`

/* ========================================================================

======================================================================== */

export function Stepper({ children, className, ...otherProps }: StepperProps) {
  const { activeStep, setTotalSteps } = useStepperContext()
  const childrenArray = React.Children.toArray(children)
  const childreArrayLength = childrenArray.length

  /* ======================
           steps
  ====================== */

  const steps = childrenArray.map((step, index) => {
    const isActive = activeStep === index
    const isCompleted = activeStep > index

    const clonedElement = React.cloneElement(
      step as React.ReactElement<{
        index: number
        isActive: boolean
        isCompleted: boolean
      }>,
      {
        index,
        isActive: isActive,
        isCompleted: isCompleted
      }
    )

    if (index !== childrenArray.length - 1) {
      return (
        <React.Fragment key={index}>
          {clonedElement}
          <div
            className={cn(
              'bg-primary h-0.5 flex-1',
              isCompleted ? 'bg-primary' : 'bg-border'
            )}
          ></div>
        </React.Fragment>
      )
    }

    return clonedElement
  })

  /* ======================
        useEffect()
  ====================== */

  React.useEffect(() => {
    setTotalSteps(childreArrayLength)
  }, [childreArrayLength, setTotalSteps])

  /* ======================
          return
  ====================== */

  return (
    <div {...otherProps} className={cn(basesClasses, className)}>
      {steps}
    </div>
  )
}
