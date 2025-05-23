import type { Metadata } from 'next'
import { AlertCircle } from 'lucide-react'

import { auth } from '@/auth'
import { Alert, Page, PageContainer, Title } from '@/components'
import { ShowSession } from './components/ShowSession'
import { getCurrentUser } from '@/actions'

export const metadata: Metadata = {
  title: 'User',
  description: 'The User Page'
}

/* ========================================================================
                                  PageUser
======================================================================== */

const PageUser = async () => {
  const session = await auth()
  const expires = session?.expires

  const {
    data: currentUser,
    success: currentUserSuccess,
    code
  } = await getCurrentUser()

  /* ======================

  ====================== */

  const isValidSession = (() => {
    let isValidSession = false

    if (typeof expires === 'string') {
      const expiresTimestamp = new Date(expires).getTime()
      const now = Date.now() // The current time in milliseconds since the Unix Epoch
      isValidSession = now < expiresTimestamp
    }
    return isValidSession
  })()

  /* ======================

  ====================== */

  const expiresLocaleDateString =
    typeof expires === 'string'
      ? new Date(expires).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      : ''

  /* ======================
      renderCurrentUser()
  ====================== */

  const renderCurrentUser = () => {
    if (!currentUser || currentUserSuccess === false) {
      let message = 'The request for the current user failed.'

      if (code === 'UNAUTHORIZED') {
        message =
          'You must be authenticated in order to access current user data.'
      } else if (code === 'NOT_FOUND') {
        message = `Could not find the current user.`
      }

      return (
        <Alert
          leftSection={<AlertCircle className='size-6' />}
          title={'Error'}
          variant='destructive'
          className='mx-auto max-w-5xl'
        >
          {message}
        </Alert>
      )
    }

    return (
      <div className='bg-background-light mx-auto mb-6 max-w-5xl rounded-lg border p-4 shadow'>
        <h3 className='text-primary text-2xl font-black'>
          User From getCurrentUser():
        </h3>

        <pre className='mb-4'>
          <code className='text-pink-500'>
            {JSON.stringify(currentUser, null, 2)}
          </code>
        </pre>
      </div>
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <Page>
      <PageContainer>
        <Title
          as='h2'
          style={{
            marginBottom: 50,
            textAlign: 'center'
          }}
        >
          User
        </Title>

        <div className='bg-background-light mx-auto mb-6 max-w-5xl rounded-lg border p-4 shadow'>
          <h3 className='text-primary text-2xl font-black'>
            Session From auth():
          </h3>
          <pre className='mb-4'>
            <code className='text-pink-500'>
              {JSON.stringify(session, null, 2)}
            </code>
          </pre>

          <h3 className='text-primary text-2xl font-black'>isValidSession:</h3>

          {expiresLocaleDateString && (
            <p>The session will expire on: {expiresLocaleDateString}</p>
          )}

          <p className='text-pink-500'>
            <code className='text-sm'>
              isValidSession: {isValidSession ? 'true' : 'false'}
            </code>
          </p>
        </div>

        <ShowSession />

        {renderCurrentUser()}
      </PageContainer>
    </Page>
  )
}

export default PageUser
