import { Page, PageContainer, Title } from 'components'
import { ComponentDemos } from '@/components/ComponentDemos'

/* ========================================================================

======================================================================== */

// Todo: Change all /components components to PascalCase & update components/index.ts
//# Watch out for Vercel Gotcha - name append 'X' temporarily.

// Todo: add UI for the numeric position of slider thumbs.

// Todo: Fix hovering on close button of toast sometimes removes border!

// Todo: Add inner container to Dialog to make it responsive.

// Todo: Review https://react.dev/reference/react-dom/components/input

// Todo: Build out RHF controlled form demo.

//# Not sure about hover:underline in AccordionTrigger.

//# Test dropdown menu that stays open against sidebar and sheet.

//# Add Pagination

//# Add Toggle / ToggleGroup (ShadCN).
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

        <ComponentDemos />
      </PageContainer>
    </Page>
  )
}

export default Home
