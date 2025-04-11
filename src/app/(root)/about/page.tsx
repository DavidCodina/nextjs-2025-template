// import { Suspense } from 'react'
import {
  Page,
  PageContainer,
  // Spinner,
  Title
} from 'components'
// import { DataComponent } from './DataComponent'
// import { sleep } from '@/utils'

/* ========================================================================

======================================================================== */

const About = async () => {
  //  await sleep(1000 * 2)
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
          About
        </Title>
      </PageContainer>

      {/* It might actually make sense to bake this into the PageContainer.
      But what happens if you have another child with its own Suspense. */}
      {/* <Suspense
        fallback={
          <div
            className='pointer-events-none absolute inset-0 z-51 flex items-center justify-center bg-black/25'
          >
            <Spinner />
          </div>
        }
      >
        <DataComponent />
      </Suspense> */}
    </Page>
  )
}

export default About
