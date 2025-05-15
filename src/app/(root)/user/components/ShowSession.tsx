'use client'
import { useSession } from 'next-auth/react'

/* ========================================================================
                                
======================================================================== */

export const ShowSession = () => {
  const { data: session, status /*, update */ } = useSession()

  /* ======================

  ====================== */

  const renderSession = () => {
    if (status === 'loading') {
      return (
        <h3 className='text-primary text-center text-3xl font-black'>
          Loading...
        </h3>
      )
    }

    if (status === 'authenticated') {
      return (
        <div className='bg-background-light rounded-lg border p-4 shadow'>
          <h3 className='text-primary text-2xl font-black'>
            Session From useSession():
          </h3>
          <pre className='mb-4'>
            <code className='text-pink-500'>
              {JSON.stringify(session, null, 2)}
            </code>
          </pre>

          <h3 className='text-primary text-2xl font-black'>Status:</h3>

          <p className='text-pink-500'>
            <code>{status}</code>
          </p>
        </div>
      )
    }

    if (status === 'unauthenticated') {
      return (
        <div className='bg-background-light rounded-lg border p-4 shadow'>
          <h3 className='text-primary text-2xl font-black'>
            Status: Unauthenticated
          </h3>

          <p className='text-pink-500'>
            <code>{status}</code>
          </p>
        </div>
      )
    }

    return null
  }

  /* ======================

  ====================== */

  return renderSession()
}
