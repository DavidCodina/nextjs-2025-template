import { Page, PageContainer, Title } from 'components'
import { ComponentDemos } from '@/components/ComponentDemos'

/* ========================================================================

======================================================================== */

// Todo: Change all /components components to PascalCase & update components/index.ts
//# Watch out for Vercel Gotcha - name append 'X' temporarily.

// Todo: Review what CSS properties have been added/removed to globals.css
//# since ShadCN initializtion.

// Todo: Add validation logic to UncoontrolledFormDemo.

// Todo: Review whether render*BaseOnly is a good idea.

// Todo: Update to latest Next.js due to recent auth security vulnerability.

// Todo: Review https://react.dev/reference/react-dom/components/input

// Todo: add UI for the numeric position of slider thumbs.

// Todo: Buid out RHF controlled form demo.

// Todo: Add not-found.tsx, global-error.tsx, error.tsx

//# Not sure about hover:underline in AccordionTrigger.

//# Find the radix primitive for allowing multiple panels to be open at once
//# on the accordion component.

//# How can we change the offset in toolip and popover.

//# Button has: aria-invalid:ring-destructive/20
//# Something similar was on the badges, and I removed it.
//# What is it?

//# Test dropdown menu that stays open against sidebar and sheet.

// Bonus: Consider adding special variants in button, badge, and alert of
// light, dark, and light-dark. These will be quasi-custom color variants.

const Home = () => {
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
