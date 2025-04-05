'use client'

import * as React from 'react'
import { Button } from '@/components/Button'
import {
  StepperProvider,
  Stepper,
  Step,
  StepContent,
  CompletedContent
} from '@/components/Stepper'

/* ========================================================================

======================================================================== */

export function StepperDemo() {
  //# Ultimately activeStep should be managed internally and set
  //# by the trigger buttons, but this works for now.
  const [activeStep, setActiveStep] = React.useState(0)
  const totalSteps = 3 // ???

  const handlePrevious = () => {
    setActiveStep((v) => Math.max(v - 1, 0))
  }

  const handleNext = () => {
    setActiveStep((v) => Math.min(v + 1, totalSteps))
  }

  const handleStepClick = (step: number) => {
    setActiveStep(step)
  }

  /* ======================
        renderStepper()
  ====================== */

  const renderStepper = () => {
    return (
      <Stepper className='mb-8'>
        <Step
          label='Create account'
          description='Enter your details'
          //# Do we want the step itself to be clickable?
          //# I don't think Chakra does this.
          onClick={() => handleStepClick(0)}
        />
        <Step
          label='Verify email'
          description='Confirm your email'
          onClick={() => handleStepClick(1)}
        />
        <Step
          label='Get access'
          description='Complete setup'
          onClick={() => handleStepClick(2)}
        />
      </Stepper>
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <section className='mx-auto mt-12 max-w-[800px]'>
      <StepperProvider activeStep={activeStep}>
        {renderStepper()}

        <StepContent step={0}>
          <h3 className='text-primary text-xl font-black'>Step 1</h3>
          This is a work in progress... It's inspired by Steppers in Chakra UI
          and Mantine. The core behavior is there, but it's still very basic.
        </StepContent>

        <StepContent step={1}>
          <h3 className='text-primary text-xl font-black'>Step 2</h3>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
          neque aut architecto accusantium ea laborum possimus libero optio
          consequuntur, deleniti ex facere explicabo alias repellat ipsa sequi
          placeat vel! Placeat harum quaerat consequuntur excepturi aspernatur
          veritatis facilis repellendus quis. Dicta similique dolorum qui omnis.
          Corrupti quaerat optio eius odio illo!
        </StepContent>

        <StepContent step={2}>
          <h3 className='text-primary text-xl font-black'>Step 3</h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad error
          voluptatum totam natus vero placeat velit veniam eum, blanditiis modi,
          quod laborum unde quidem similique, quos voluptatem delectus dolore
          optio dolores a eos in. Nam minima at modi, mollitia accusamus omnis
          sunt totam facilis inventore. Tempore itaque harum eaque explicabo?
        </StepContent>

        <CompletedContent>
          <h3 className='text-primary text-xl font-black'>Completion!</h3>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
          neque aut architecto accusantium ea laborum possimus libero optio
          consequuntur, deleniti ex facere explicabo alias repellat ipsa sequi
          placeat vel! Placeat harum quaerat consequuntur excepturi aspernatur
          veritatis facilis repellendus quis. Dicta similique dolorum qui omnis.
          Corrupti quaerat optio eius odio illo!
        </CompletedContent>

        <div className='mt-6 flex justify-center gap-4'>
          <Button
            onClick={handlePrevious}
            disabled={activeStep === 0}
            style={{ minWidth: 100 }}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={activeStep === totalSteps}
            style={{ minWidth: 100 }}
          >
            {/* {activeStep === totalSteps - 2 ? 'Finish' : 'Next'} */}
            Next
          </Button>
        </div>
      </StepperProvider>
    </section>
  )
}
