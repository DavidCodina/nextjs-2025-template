'use client'

import React, {
  PropsWithChildren,
  useRef,
  useEffect,
  useTransition
} from 'react'

import {
  createContext,
  useContextSelector
  // useContextScheduler
} from 'use-context-selector'

import { useRouter, usePathname } from 'next/navigation'

export interface AppContextValue {
  test: string
  routePending: boolean
  handleRouteChange: (route: string) => void
  // [key: string]: any
}

/* ========================================================================

======================================================================== */

export const AppContext = createContext({} as AppContextValue)

export const AppProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname()
  const previousPath = useRef<string | null>('')

  const router = useRouter()
  const [routePending, startRouteTransition] = useTransition()

  // Works in conjunction with TransitionLoader component.
  const handleRouteChange = (route: string) => {
    startRouteTransition(() => {
      router.push(route)
    })
  }

  /* ======================
        useEffect()
  ====================== */

  useEffect(() => {
    return () => {
      previousPath.current = pathname
      // console.log('previousPath.current:', previousPath.current)
    }
  }, [pathname])

  /* ======================
          return
  ====================== */

  return (
    <AppContext.Provider
      value={{
        test: 'Testing 123...',
        routePending,
        handleRouteChange
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

///////////////////////////////////////////////////////////////////////////
//
// Usage:
//
//  ✅ const showMenu    = useAppContextSelector('showMenu')
//  ✅ const setShowMenu = useAppContextSelector('setShowMenu')
//
///////////////////////////////////////////////////////////////////////////

export const useAppContextSelector = <T extends keyof AppContextValue>(
  key: T
) => {
  const value = useContextSelector(AppContext, (state) => state[key])
  return value
}
