'use client'

import * as React from 'react'

export type StepperContextValue = {
  variant: 'default' | 'primary' | 'secondary'
}
export const StepperContext = React.createContext({} as StepperContextValue)

/* ========================================================================

======================================================================== */

export const StepperProvider = ({
  children,
  variant = 'default'
}: {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary'
}) => {
  /* ======================
          return
  ====================== */

  return (
    <StepperContext.Provider
      value={{
        variant
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
