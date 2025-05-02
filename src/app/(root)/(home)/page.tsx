import { Page, PageContainer, Title } from 'components'
// import { ComponentDemos } from '@/components/ComponentDemos'
// import Link from 'next/link'
//import { Navigation } from 'lucide-react'

/* ========================================================================

======================================================================== */

//# Compare utils against 2024 Next.js version.

//# Comprare hooks against 2024 Next.js version.

//# Move all test-experiments over from Vitest to Jest.

//* 1. I have an AspectRatio component, but also include the ShadCN version.

//# 2. Compare Placeholder to Skeleton.

//# 3. Review FontIcon

//# 4. Update Moda/Dialog: Add inner container to Dialog to make it responsive.

//# 5. Review NumberFormatter

//# 6. Add in Breadcrumbs and compare to older version.

//# 7. What is this?
//# Add a [not( ... )] abritrary modifier to correct for the fact that
//# last:mb-6 on CardContent will generate a higher specificity.

//# 8. Todo: Sidebar needs CSS fix for the border when both defaultCollapsible='none' and defaultVariant='inset'
//# Also defaultCollapsible='none' Sidebar header is not right.

//# 9. Consider changing the UI for the Sidebar hover to just a primary outline or dashed outline.

//# 10. Todo: add UI for the numeric position of slider thumbs.

//# 11. Add Pagination - This should have variants for color and size like a button.
//# https://www.radix-ui.com/primitives/docs/components/toggle-group

//# Possibly add in todos demo, using local Postgres.
//# This would then allow me to test out caching behavior
//# and invalidateTag behavior.

// Todo: Change all /components components to PascalCase & update components/index.ts
//# Watch out for Vercel Gotcha - name append 'X' temporarily.

// Todo: Review https://react.dev/reference/react-dom/components/input

// Todo: Build out RHF controlled form demo.

// Todo: Review Calendar behavior and best practices/contracts when sending dates to server.

//# Test dropdown menu that stays open against sidebar and sheet.

// Bonus: Consider adding special variants in button, badge, and alert of
// light, dark, and light-dark. These will be quasi-custom color variants.

const Home = () => {
  // Anti-pattern: Do not await an async function directly in page.tsx,
  // especially the home page. It will always block rendering.
  // Instead, wrap a child component in a Suspense and either await
  // the async data locally in the child component, or pass down a
  // promise as a prop the the child component and implement use() API.
  // ❌ const session = await getData()

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

        {/* <div className='flex flex-wrap items-center justify-center gap-4'>
          <Button asChild size='sm'>
            <Link href='/'>
              Go Home <Navigation />
            </Link>
          </Button>

          <Button asChild size='sm'>
            <Link href='/about'>Go To About (Normal)</Link>
          </Button>

          <Button asChild size='sm'>
            <Link href='/about' data-href='/about'>
              Go To About (opt in)
            </Link>
          </Button>

          <Button size='sm' data-href='/about'>
            Go To About (opt in)
          </Button>

          <div
            className='flex cursor-pointer items-center justify-center rounded-lg border border-red-700 bg-red-500 px-2 py-1 text-sm leading-[1.5] font-bold text-white'
            data-href='/about' // Not even a button!
          >
            Go To About (opt in)
          </div>
        </div> */}

        {/* <ComponentDemos /> */}
      </PageContainer>
    </Page>
  )
}

export default Home
