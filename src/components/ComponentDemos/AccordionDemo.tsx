'use client'

import * as React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/accordion'

/* ========================================================================

======================================================================== */

export const AccordionDemo = () => {
  return (
    <Accordion
      type='single'
      collapsible
      className='mx-auto mb-6 max-w-[600px] rounded-xl border bg-(--background-light) shadow'
    >
      <AccordionItem value='item-1'>
        {/* [&>svg]:text-primary */}
        <AccordionTrigger className='text-primary cursor-pointer px-2 font-bold hover:no-underline'>
          Is it accessible?
        </AccordionTrigger>
        <AccordionContent className='px-2'>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger className='text-primary cursor-pointer px-2 font-bold hover:no-underline'>
          Is it styled?
        </AccordionTrigger>
        <AccordionContent className='px-2'>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger className='text-primary cursor-pointer px-2 font-bold hover:no-underline'>
          Is it animated?
        </AccordionTrigger>
        <AccordionContent className='px-2'>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
