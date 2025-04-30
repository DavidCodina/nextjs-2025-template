'use client'

import { useState, useEffect, use } from 'react'
import { RefreshCw } from 'lucide-react'
import { JokeProps } from './types'

/* ========================================================================

======================================================================== */

export const Joke = ({ jokePromise, onRefresh }: JokeProps) => {
  const res = use(jokePromise)
  const [mounted, setMounted] = useState(false)

  /* ======================
          useEffect()
  ====================== */
  // Don't render the joke until the component is mounted.
  // This prevents a Next.js hydration mismatch error whereby
  // the joke on the server executed version differs from the
  // joke on the client rendered version.

  useEffect(() => {
    setMounted(true)
  }, [])

  /* ======================
          return
  ====================== */

  if (!jokePromise || !mounted) {
    return null
  }

  return (
    <div className='border-dark relative mx-auto mb-6 max-w-[600px] rounded-lg border bg-white p-4 text-sm shadow-md'>
      <button
        className='absolute top-1 right-1 cursor-pointer'
        onClick={onRefresh}
      >
        <RefreshCw className='size-4' />
      </button>
      {res.data.value}
    </div>
  )
}
