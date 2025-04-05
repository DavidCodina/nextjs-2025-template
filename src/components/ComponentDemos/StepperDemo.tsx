'use client'

import * as React from 'react'
import { Button } from '@/components/Button'
import { Stepper, Step, StepContent, CompletedContent } from '@/components'

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Generally, we're going to want to to manually control the `activeIndex`.
// For example, when building a step form, the next activeIndex would get set
// only after the form fields were validated.
//
// Following this pattern of externalization, `isActive`, `isCompleted` and `isLast`
// are also determined externally for Step. Similarly, `show` is determined externally
// for StepContent and CompletedContent. The tradeoff is a little more work when
// consuming, but all associated Stepper components are now merely presentational/dumb
// - no context, no nothing.
//
// This is not how Chakra, Mantine, or MUI do it, but it's actually a much
// less complex pattern, and allows for more fine-grained control on the
// consuming side.
//
///////////////////////////////////////////////////////////////////////////

export function StepperDemo() {
  const [activeIndex, setActiveIndex] = React.useState(0)

  // Omit index because it will be added when mapping.
  const stepData: Omit<React.ComponentProps<typeof Step>, 'index'>[] = [
    {
      label: 'Create account',
      description: 'Enter your details',
      isActive: activeIndex === 0,
      isCompleted: activeIndex > 0
    },
    {
      label: 'Verify email',
      description: 'Confirm your email',
      isActive: activeIndex === 1,
      isCompleted: activeIndex > 1
    },
    {
      label: 'Get access',
      description: 'Complete setup',
      isActive: activeIndex === 2,
      isCompleted: activeIndex > 2
    }
  ]

  const totalSteps = stepData.length

  const handlePrevious = () => {
    setActiveIndex((v) => Math.max(v - 1, 0))
  }

  const handleNext = () => {
    setActiveIndex((v) => Math.min(v + 1, totalSteps))
  }

  // const handleStepClick = (step: number) => {
  //   setActiveIndex(step)
  // }

  /* ======================
    renderStepper()
  ====================== */

  const renderStepper = () => {
    const steps = stepData.map((step, index) => {
      return (
        <Step
          key={index}
          index={index}
          {...step}
          isLast={index === stepData.length - 1}
        />
      )
    })

    ///////////////////////////////////////////////////////////////////////////
    //
    // Wrapping in a Fragment is fine:
    //
    //   const steps = (
    //     <>
    //       {stepData.map((step, index) => {
    //         return (
    //           <Step
    //             key={index}
    //             index={index}
    //             {...step}
    //             isLast={index === stepData.length - 1}
    //           />
    //         )
    //       })}
    //     </>
    //   )
    //
    ///////////////////////////////////////////////////////////////////////////

    return <Stepper className='mb-8'>{steps}</Stepper>
  }

  /* ======================
      renderContent()
  ====================== */

  const renderContent = () => {
    return (
      <>
        <StepContent show={activeIndex === 0}>
          <h3 className='text-primary text-xl font-black'>Step 1</h3>
          This Steppers is inspired by Chakra UI, Mantine and MUI. However, it
          has no context. Moreover, all associated components are
          representational/dumb. Ultimately, this means a litte more work on the
          consuming side, but a much less complex internal implementation.
        </StepContent>

        <StepContent show={activeIndex === 1}>
          <h3 className='text-primary text-xl font-black'>Step 2</h3>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
          neque aut architecto accusantium ea laborum possimus libero optio
          consequuntur, deleniti ex facere explicabo alias repellat ipsa sequi
          placeat vel! Placeat harum quaerat consequuntur excepturi aspernatur
          veritatis facilis repellendus quis. Dicta similique dolorum qui omnis.
          Corrupti quaerat optio eius odio illo!
        </StepContent>

        <StepContent show={activeIndex === 2}>
          <h3 className='text-primary text-xl font-black'>Step 3</h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad error
          voluptatum totam natus vero placeat velit veniam eum, blanditiis modi,
          quod laborum unde quidem similique, quos voluptatem delectus dolore
          optio dolores a eos in. Nam minima at modi, mollitia accusamus omnis
          sunt totam facilis inventore. Tempore itaque harum eaque explicabo?
        </StepContent>

        <CompletedContent show={activeIndex === totalSteps}>
          <h3 className='text-primary text-xl font-black'>Completion!</h3>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
          neque aut architecto accusantium ea laborum possimus libero optio
          consequuntur, deleniti ex facere explicabo alias repellat ipsa sequi
          placeat vel! Placeat harum quaerat consequuntur excepturi aspernatur
          veritatis facilis repellendus quis. Dicta similique dolorum qui omnis.
          Corrupti quaerat optio eius odio illo!
        </CompletedContent>
      </>
    )
  }

  /* ======================
      renderControls()
  ====================== */

  const renderControls = () => {
    return (
      <div className='mt-6 flex justify-center gap-4'>
        <Button
          onClick={handlePrevious}
          disabled={activeIndex === 0}
          style={{ minWidth: 100 }}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={activeIndex === totalSteps}
          style={{ minWidth: 100 }}
        >
          {activeIndex === totalSteps ? 'Done' : 'Next'}
        </Button>
      </div>
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <section className='mx-auto mt-12 max-w-[800px]'>
      {renderStepper()}

      <div className='text-muted-foreground mb-8 text-center text-sm font-medium'>
        Random Intermediate JSX is okay...
      </div>
      {renderContent()}
      {renderControls()}
    </section>
  )
}
