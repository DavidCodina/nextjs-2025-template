import { Page, PageContainer, Title } from '@/components'
// import { ComponentDemos } from '@/components/ComponentDemos'

// import { PaginationDemo } from '@/components/Pagination/PaginationDemo'
import { PaginationDemo as PaginationDemo2 } from '@/components/Pagination2/PaginationDemo'
/* ========================================================================

======================================================================== */

//# 1. Add Pagination - This should have variants for color and size like a button.
//# https://www.radix-ui.com/primitives/docs/components/toggle-group
//# Review paginationPlugin.ts and update it to remove --bs. Also
//# make it work in dark mode.
//#
//# Add cn() where relevant.
//#
//# Remove forwardRefs.
//#
//# Change active and focus-visble style to primary.

//# 2. Todo: Sidebar needs CSS fix for the border when both defaultCollapsible='none' and defaultVariant='inset'
//# Also defaultCollapsible='none' Sidebar header is not right.

//# 3. Consider changing the UI for the Sidebar hover to just a primary outline or dashed outline.

//# 4. Todo: add UI for the numeric position of slider thumbs.

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

        {/* <ComponentDemos /> */}
        {/* <PaginationDemo /> */}

        <PaginationDemo2 />
      </PageContainer>
    </Page>
  )
}

export default Home
