import { Page, PageContainer, Title } from '@/components'
import { ComponentDemos } from '@/components/ComponentDemos'

import { getUsers, getPosts } from '@/lib/actions'

/* ========================================================================

======================================================================== */
//! Review all NextAuth related files/folders.

//! Setup both Vercel and GitHub with necessary secrets, build scripts, and GitHub workflows.

// Todo: Create a Posts and PostDetails page with full CRUD.

// Todo: As an experiment, eventually switch back to the local Postgres database
//# when in development.

// Todo: Review Calendar behavior and best practices/contracts when sending dates to server.

// Todo: Sidebar needs CSS fix for the border when both defaultCollapsible='none' and defaultVariant='inset'
//# Also defaultCollapsible='none' Sidebar header is not right.

// Todo: Build out RHF controlled form demo.

// Todo: Test out caching behavior and invalidateTag behavior.

// Todo: Change all /components components to PascalCase & update components/index.ts
//# Watch out for Vercel Gotcha - name append 'X' temporarily.

// Bonus: Consider adding special variants in button, badge, and alert of
// light, dark, and light-dark. These will be quasi-custom color variants.

const Home = async () => {
  // Anti-pattern: Do not await an async function directly in page.tsx,
  // especially the home page. It will always block rendering.
  // Instead, wrap a child component in a Suspense and either await
  // the async data locally in the child component, or pass down a
  // promise as a prop the the child component and implement use() API.
  // ❌ const session = await getData()

  const posts = await getPosts()

  const users = await getUsers()
  // const firstUser = users.data?.[0]
  // console.log('firstUser:', firstUser)
  // console.log('typeof role:', typeof firstUser?.role)
  // console.log('typeof createdAt:', typeof firstUser?.createdAt)

  console.log('users:', users)
  console.log('posts:', posts)

  return (
    <Page
    // currentPageLoader
    // currentPageLoaderProps={{
    //   className: 'border border-2 border-dashed border-pink-500'
    // }}
    >
      <PageContainer

      ///////////////////////////////////////////////////////////////////////////
      //
      // By default, PageContainer will scroll if content overflows:
      //
      //   <div className='h-12 bg-sky-400' style={{ width: 1200 }} />
      //
      // Pass `overflow-hidden` if you want to prevent the scroll behavior.
      // Alternatively, pass `overflow-x-auto` to Page.
      //
      ///////////////////////////////////////////////////////////////////////////
      >
        <Title
          as='h2'
          style={{
            marginBottom: 50,
            textAlign: 'center'
          }}
        >
          Home
        </Title>

        <ComponentDemos />
      </PageContainer>
    </Page>
  )
}

export default Home
