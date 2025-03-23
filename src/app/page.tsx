import { Page, PageContainer, Title } from 'components'
import { ComponentDemos } from '@/components/ComponentDemos'

/* ========================================================================

======================================================================== */

// Todo: Create a grouped version of Select and Slider

// Todo: Test controlled versions of all form fields.

// Todo: add UI for the numeric position of slider thumbs.

// Todo: Test Button's loading spinner.
//# I'm concerned that when it has an svg, then it's not removed while loading.

// Todo: Add not-found.tsx, global-error.tsx, error.tsx

//# https://github.com/shadcn-ui/ui/discussions/4283
//# Maybe rather than forcing it top-down, I can actually
//# create a variant variant that checks itself and then
//# applies its border as needed, removes shadows, etc.
//# Could also just ask v0.

//! Not sure about hover:underline in AccordionTrigger.

//! Find the radix primitive for allowing multiple panels to be open at once
//! on the accordion component.

//! How can we change the offset in toolip and popover.

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
