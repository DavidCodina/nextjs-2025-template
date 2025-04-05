'use client'

import * as React from 'react'

export type StepperContextValue = {
  activeStep: number
  totalSteps: number | undefined
  setTotalSteps: React.Dispatch<React.SetStateAction<number | undefined>>
}
export const StepperContext = React.createContext({} as StepperContextValue)

/* ========================================================================

======================================================================== */

export const StepperProvider = ({
  activeStep = 0,
  children
}: {
  activeStep: number
  children: React.ReactNode
}) => {
  const [totalSteps, setTotalSteps] = React.useState<number>()

  /* ======================
          return
  ====================== */

  return (
    <StepperContext.Provider
      value={{
        activeStep,
        totalSteps,
        setTotalSteps
      }}
    >
      {children}
    </StepperContext.Provider>
  )
}

/* ======================

====================== */

export const useStepperContext = () => {
  const context = React.useContext(StepperContext)
  if (context === undefined) {
    throw new Error('useStepperContext must be used within a StepperContext')
  }
  return context
}
