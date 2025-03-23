import { Page, PageContainer, Title } from 'components'
import { ComponentDemos } from '@/components/ComponentDemos'

/* ========================================================================

======================================================================== */
// Random change for update...

// Todo: Change all /components components to PascalCase & update components/index.ts

// Todo: Test controlled versions of all form fields.

// Todo: add UI for the numeric position of slider thumbs.

// Todo: Update valid/invalid styles for Checkbox, CheckboxGroup and RadioGroup.

// Todo: Test Button's loading spinner.
//# I'm concerned that when it has an svg, then it's not removed while loading.

// Todo: Build out controlled form demo.

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
