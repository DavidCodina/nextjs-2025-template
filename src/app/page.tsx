import { Page, PageContainer, Title } from 'components'
import { ComponentDemos } from '@/components/ComponentDemos'

/* ========================================================================

======================================================================== */

// Todo: test <body> when element exceeds viewport width.
//# Set a max-width on body of 100vw if there's an issue.
//# May also need to set overflow-clip.

// Todo: Potentially add a size variant to Stepper.

// Todo: Review and Update Card.

//# Consider changing the UI for the Sidebar hover to just a primary outline or dashed outline.

// Todo: add UI for the numeric position of slider thumbs.

// Todo: Add inner container to Dialog to make it responsive.

// Todo: Change all /components components to PascalCase & update components/index.ts
//# Watch out for Vercel Gotcha - name append 'X' temporarily.

// Todo: Review https://react.dev/reference/react-dom/components/input

// Todo: Build out RHF controlled form demo.

// Todo: Review Calendar behavior and best practices/contracts when
//# sending dates to server.

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

        <ComponentDemos />
      </PageContainer>
    </Page>
  )
}

export default Home
