import { Page, PageContainer, Title } from 'components'
import { ComponentDemos } from '@/components/ComponentDemos'

/* ========================================================================

======================================================================== */

// Todo: Review butttonVariants. Initially I made a huge comment on how
//# [&_svg:not([class*='size-'])]:size-4 didn't work. However, it actually
//# did work in the Toggle component.

//# Consider changing the UI for the Sidebar hover to just a primary outline or dashed outline.

// Todo: Do global search on *-input to see where it's used and replace.

// Todo: add UI for the numeric position of slider thumbs.

// Todo: Add inner container to Dialog to make it responsive.

// Todo: Change all /components components to PascalCase & update components/index.ts
//# Watch out for Vercel Gotcha - name append 'X' temporarily.

// Todo: Review https://react.dev/reference/react-dom/components/input

// Todo: Build out RHF controlled form demo.

//# Not sure about hover:underline in AccordionTrigger.

//# Test dropdown menu that stays open against sidebar and sheet.

//# Add Pagination
//# This should have variants for color and size like a button.
// https://www.radix-ui.com/primitives/docs/components/toggle-group

// Bonus: Consider adding special variants in button, badge, and alert of
// light, dark, and light-dark. These will be quasi-custom color variants.

const Home = () => {
  // Anti-pattern: Do not await an async function directly in page.tsx,
  // especially the home page. It will always block rendering. Use
  // Suspense and child component instead.
  // ❌ const session = await getData()

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
          Home
        </Title>
        <ComponentDemos />=
      </PageContainer>
    </Page>
  )
}

export default Home
