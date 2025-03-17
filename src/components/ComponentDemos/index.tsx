'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/tabs'
import { AccordionDemo } from './AccordionDemo'
import { AlertDemo } from './AlertDemo'
import { AlertDialogDemo } from './AlertDialogDemo'
import { BadgeDemo } from './BadgeDemo'
import { ButtonDemo } from './ButtonDemo'
import { CardDemo } from './CardDemo'
import { CollapsibleDemo } from './CollapsibleDemo'
import { DialogDemo } from './DialogDemo'
import { DropdownMenuDemo } from './DropdownMenuDemo'
import { PopoverDemo } from './PopoverDemo'
import { SeparatorDemo } from './SeparatorDemo'
import { SheetDemo } from './SheetDemo'
import { SkeletonDemo } from './SkeletonDemo'
import { TabsDemo } from './TabsDemo'
import { TooltipDemo } from './TooltipDemo'

/* ========================================================================

======================================================================== */

export const ComponentDemos = () => {
  return (
    <Tabs defaultValue='accordion' className='mx-auto mb-6 gap-6'>
      <TabsList className='grid w-full grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
        <TabsTrigger value='accordion'>Accordion</TabsTrigger>
        <TabsTrigger value='alert'>Alert</TabsTrigger>
        <TabsTrigger value='alert-dialog'>Alert Dialog</TabsTrigger>
        <TabsTrigger value='badge'>Badge</TabsTrigger>
        <TabsTrigger value='button'>Button</TabsTrigger>
        <TabsTrigger value='card'>Card</TabsTrigger>
        <TabsTrigger value='collapsible'>Collapsible</TabsTrigger>
        <TabsTrigger value='dialog'>Dialog</TabsTrigger>
        <TabsTrigger value='dropdown-menu'>Dropdown Menu</TabsTrigger>
        <TabsTrigger value='popover'>Popover</TabsTrigger>
        <TabsTrigger value='separator'>Separator</TabsTrigger>
        <TabsTrigger value='sheet'>Sheet</TabsTrigger>
        <TabsTrigger value='skeleton'>Skeleton</TabsTrigger>
        <TabsTrigger value='tabs'>Tabs</TabsTrigger>
        <TabsTrigger value='tooltip'>Tooltip</TabsTrigger>
      </TabsList>

      {/* ================= */}

      <TabsContent value='accordion'>
        <AccordionDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='alert'>
        <AlertDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='alert-dialog'>
        <AlertDialogDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='badge'>
        <BadgeDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='button'>
        <ButtonDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='card'>
        <CardDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='collapsible'>
        <CollapsibleDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='dialog'>
        <DialogDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='dropdown-menu'>
        <DropdownMenuDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='popover'>
        <PopoverDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='separator'>
        <SeparatorDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='sheet'>
        <SheetDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='skeleton'>
        <SkeletonDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='tabs'>
        <TabsDemo />
      </TabsContent>

      {/* ================= */}

      <TabsContent value='tooltip'>
        <TooltipDemo />
      </TabsContent>
    </Tabs>
  )
}
