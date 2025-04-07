'use client'

import * as React from 'react'

type Variant = 'default' | 'primary' | 'secondary'

export type StepperContextValue = {
  alternativeLabel: boolean
  /** The viewport width under which the separators are removed. */
  separatorBreakpoint: number
  variant: Variant
}

export const StepperContext = React.createContext({} as StepperContextValue)

type StepperProviderProps = {
  alternativeLabel?: boolean
  separatorBreakpoint?: number
  children: React.ReactNode
  variant?: Variant
}

/* ========================================================================

======================================================================== */

export const StepperProvider = ({
  alternativeLabel = false,
  separatorBreakpoint = Infinity,
  children,
  variant = 'default'
}: StepperProviderProps) => {
  /* ======================
          return
  ====================== */

  return (
    <StepperContext.Provider
      value={{
        alternativeLabel,
        separatorBreakpoint,
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
