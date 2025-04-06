'use client'

import * as React from 'react'
import { Button } from '@/components/Button'
import { Stepper, Step, StepContent, CompletedContent } from '@/components'
import { Mail, UserPlus, KeyRound, Info } from 'lucide-react'

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Generally, we'll want to to manually control the `activeIndex`.
// For example, when building a step form, the next `activeIndex` would
// get set only after the form fields were validated.
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
      label: 'Step 1',
      description: 'Create Account',
      isActive: activeIndex === 0,
      isCompleted: false,
      icon: <UserPlus />,
      isValid: undefined,
      isLoading: false
    },
    {
      label: 'Step 2',
      description: 'Confirm Email',
      isActive: activeIndex === 1,
      isCompleted: activeIndex > 1,
      icon: <Mail />,
      isValid: undefined,
      isLoading: false
    },
    {
      label: 'Step 3',
      description: 'Access Content',
      isActive: activeIndex === 2,
      isCompleted: activeIndex > 2,
      icon: <KeyRound />,
      isValid: undefined,
      isLoading: false
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

    return (
      <Stepper
        // In the absence of an actual `size` variant, we can set size
        // by setting text-* on the `Stepper` itself. This works because
        // every Step button and everything inside of each Step that would
        // matter is based on em units.
        className='mb-8 text-base'
        variant='primary'
      >
        {steps}
      </Stepper>
    )
  }

  /* ======================
      renderContent()
  ====================== */

  const renderContent = () => {
    return (
      <>
        <StepContent show={activeIndex === 0}>
          <h3 className='text-primary text-xl font-black'>Step 1</h3>
          <p className='mb-4'>
            This <code className='text-pink-500'>Stepper</code> is inspired by
            Chakra UI, Mantine and MUI. However, all associated components are
            representational/dumb. Ultimately, this means a litte more work on
            the consuming side, but a much less complex internal implementation.
          </p>

          <p>
            Generally, you're going to want to have external control over the{' '}
            <code className='text-pink-500'>activeIndex</code>. Following that
            pattern, it just made sense to externalize other things like{' '}
            <code className='text-pink-500'>isActive</code>,{' '}
            <code className='text-pink-500'>isCompleted</code>,{' '}
            <code className='text-pink-500'>isValid</code> etc.
          </p>
        </StepContent>

        <StepContent show={activeIndex === 1}>
          <h3 className='text-primary mb-2 text-xl font-black'>Step 2</h3>
          <p className='mb-4'>
            <Info className='text-primary mr-1 inline' /> Icons are optional.
            The default behavior is to show the step (i.e.,{' '}
            <code className='size-[1em] text-pink-500'>index + 1</code>), or a
            check when <code className='text-pink-500'>isCompleted</code>.
          </p>

          <p>
            There is a <code className='text-pink-500'>variant</code> prop on{' '}
            <code className='text-pink-500'>Stepper</code> (defaut | primary |
            secondary), but no <code className='text-pink-500'>size</code> prop.
            To adjust size, set a <code className='text-pink-500'>text-*</code>{' '}
            Tailwind sizing class on{' '}
            <code className='text-pink-500'>Stepper</code>. From there, the
            relevant styles will inherit a new value through{' '}
            <code className='text-pink-500'>em</code> units.
          </p>
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
        Intermediate JSX is okay...
      </div>
      {renderContent()}
      {renderControls()}
    </section>
  )
}
