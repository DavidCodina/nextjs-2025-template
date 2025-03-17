import { Page, PageContainer, Title } from 'components'
// import { AccordionDemo } from 'components/accordion/AccordionDemo'
// import { AlertDemo } from 'components/alert/AlertDemo'
// import { AlertDialogDemo } from 'components/alert-dialog/AlertDialogDemo'
// import { BadgeDemo } from 'components/badge/BadgeDemo'
// import { ButtonDemo } from 'components/button/ButtonDemo'
// import { CardDemo } from 'components/card/CardDemo'
// import { CollapsibleDemo } from 'components/collapsible/CollapsibleDemo'
// import { DialogDemo } from 'components/dialog/DialogDemo'
// import { DropdownMenuDemo } from 'components/dropdown-menu/DropdownMenuDemo'
// import { SeparatorDemo } from 'components/separator/SeparatorDemo'
// import { PopoverDemo } from 'components/popover/PopoverDemo'
// import { SheetDemo } from 'components/sheet/SheetDemo'
// import { SkeletonDemo } from 'components/skeleton/SkeletonDemo'
// import { SonnerDemo } from 'components/sonner/SonnerDemo'
// import { TabsDemo } from 'components/tabs/TabsDemo'

import { ComponentDemos } from '@/components/ComponentDemos'

/* ========================================================================

======================================================================== */

//# Add src/hooks
//# Add in utils
//# Add not-found.tsx, global-error.tsx, error.tsx

//# How would I go about creating a button group?
//# https://github.com/shadcn-ui/ui/discussions/4283
//# Maybe rather than forcing it top-down, I can actually
//# create a variant variant that checks itself and then
//# applies its border as needed, removes shadows, etc.
//# Could also just ask v0.

//! Not sure about hover:underline in AccordionTrigger.

//! Find the radix primitive for allowing multiple panels to be open at once
//! on the accordion component.

//! How can we change the offset in toolip and popover.

//# Test the Button's loading spinner.
//# I'm concerned that when it has an svg, then it's not removed while loading.

//# Button has: aria-invalid:ring-destructive/20
//# Something similar was on the badges, and I removed it.
//# What is it?

//# How can we enable backdrop click to close the dialog?

//# Test dropdown menu that stays open against sidebar and sheet.

// Bonus: Consider adding special variants in button, badge, and alert of
// light, dark, and light-dark. These will be quasi-custom color variants.

const Home = () => {
  return (
    <Page>
      <PageContainer
        style={
          {
            // minHeight: '200vh' ,
            // border: '2px dashed red'
          }
        }
      >
        <Title
          // ref={titleRefCallback}
          // ref={titleRef}
          as='h2'
          style={{
            marginBottom: 50,
            textAlign: 'center'
          }}
          // className='dark:text-red-500'
          // color='red'
        >
          Home
        </Title>

        <ComponentDemos />

        {/* <AccordionDemo /> */}

        {/* <AlertDemo /> */}

        {/* <AlertDialogDemo /> */}

        {/* <BadgeDemo /> */}

        {/* <ButtonDemo /> */}

        {/* <CardDemo /> */}

        {/* <CollapsibleDemo /> */}

        {/* <DialogDemo /> */}

        {/* <DropdownMenuDemo /> */}

        {/* <PopoverDemo /> */}

        {/* <SeparatorDemo /> */}

        {/* <SheetDemo /> */}

        {/* <SkeletonDemo /> */}

        {/* <SonnerDemo /> */}

        {/* <TabsDemo /> */}
      </PageContainer>
    </Page>
  )
}

export default Home
