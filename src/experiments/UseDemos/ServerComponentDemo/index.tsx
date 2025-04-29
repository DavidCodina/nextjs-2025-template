import { Suspense } from 'react'
import { getDataAction } from './getDataAction'
import { ClientComponent } from './ClientComponent'

/* ========================================================================

======================================================================== */

export const ServerComponentDemo = async () => {
  const getDataPromise = getDataAction()

  return (
    <Suspense
      fallback={
        <div className='text-primary text-center text-2xl font-bold'>
          Loading...
        </div>
      }
    >
      <ClientComponent getDataPromise={getDataPromise} />
    </Suspense>
  )
}
