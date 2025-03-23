'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/utils'

import {
  FIELD_FOCUS_VISIBLE_MIXIN,
  FIELD_DISABLED_MIXIN
} from '@/components/component-constants'

const ariaMixin = `
aria-invalid:ring-destructive/20 
aria-invalid:border-destructive
dark:aria-invalid:ring-destructive/40 
`

//^ The class*='size-' may not work as expected.
const svgMixin = `
[&_svg]:pointer-events-none
[&_svg]:shrink-0
[&_svg:not([class*='size-'])]:size-4
[&_svg:not([class*='text-'])]:text-muted-foreground
`

///////////////////////////////////////////////////////////////////////////
//
// ❌ The default ShadCN implementation used a data-size attribute.
//  This is not a great practice. What should actually be happpening is
// we create size variants here.
// data-[size=default]:h-9
// data-[size=sm]:h-8
//
///////////////////////////////////////////////////////////////////////////

const baseClasses = `
flex items-center justify-between gap-2 
bg-background-light w-full
text-base leading-[1.5] whitespace-nowrap 
px-[0.5em] py-[0.25em] rounded-[0.375em]
border outline-none 
shadow-[0_1px_2px_rgba(0,0,0,0.15)]
data-[placeholder]:text-muted-foreground

*:data-[slot=select-value]:line-clamp-1 
*:data-[slot=select-value]:flex
*:data-[slot=select-value]:items-center 
*:data-[slot=select-value]:gap-2

transition-[color,box-shadow]
${FIELD_FOCUS_VISIBLE_MIXIN}
${FIELD_DISABLED_MIXIN}
${ariaMixin}
${svgMixin}
`

// Todo: Create size variants

/* ========================================================================

======================================================================== */

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'default'
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot='select-trigger'
      //! data-size={size} is stupid! Why not just create a variant?
      data-size={size}
      className={cn(baseClasses, className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className='size-4 opacity-50' />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export { SelectTrigger }
