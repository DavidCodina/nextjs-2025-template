import { Page, PageContainer, Title } from 'components'
import { ComponentDemos } from '@/components/ComponentDemos'

/* ========================================================================

======================================================================== */

// Todo: add UI for the numeric position of slider thumbs.

// Todo: Add not-found.tsx, global-error.tsx, error.tsx

// Todo: Change all /components components to PascalCase & update components/index.ts
//# Watch out for Vercel Gotcha - name append 'X' temporarily.

// Todo: Review what CSS properties have been added/removed to globals.css
//# since ShadCN initializtion.

// Todo: Add validation logic to UncoontrolledFormDemo.

// Todo: Review whether render*BaseOnly is a good idea.

// Todo: Review https://react.dev/reference/react-dom/components/input

// Todo: Buid out RHF controlled form demo.

//# Not sure about hover:underline in AccordionTrigger.

// Todo: Find the radix primitive for allowing multiple panels to be open at once
//# on the accordion component.

//# How can we change the offset in toolip and popover.

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
