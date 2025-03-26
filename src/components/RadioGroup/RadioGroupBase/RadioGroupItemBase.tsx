'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { CircleIcon } from 'lucide-react'
import { cn } from '@/utils'

import {
  FIELD_BOX_SHADOW_MIXIN,
  FIELD_DISABLED_MIXIN,
  FIELD_FOCUS_VISIBLE_MIXIN
} from '@/components/component-constants'

// The text color matters because it affects the icon's outer border color.
// and the fill color.
const baseClasses = `
bg-background-light text-primary size-4 shrink-0 rounded-full border aspect-square
transition-[box-shadow] outline-none
${FIELD_BOX_SHADOW_MIXIN}
${FIELD_FOCUS_VISIBLE_MIXIN}
${FIELD_DISABLED_MIXIN}
`

/* ========================================================================

======================================================================== */
// This was originally the RadioGroupItem component from ShadCN.
// It was renamed to RadioGroupItemBase following the change of
// RadioGroup to RadioGroupBase. While it's still possible to compose
// Radio Groups with RadioGroupBase and RadioGroupItemBase, prefer the
// newer RadioGroupcomponent, which abstracts away many of the
// implementation details.

export const RadioGroupItemBase = ({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) => {
  return (
    <RadioGroupPrimitive.Item
      data-slot='radio-group-item'
      className={cn(baseClasses, className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot='radio-group-indicator'
        className='relative flex items-center justify-center'
      >
        <CircleIcon className='absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-current' />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}
