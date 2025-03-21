'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'
import { cn } from '@/utils'

import {
  FIELD_BOX_SHADOW_MIXIN,
  FIELD_DISABLED_MIXIN,
  FIELD_FOCUS_VISIBLE_MIXIN
} from '../component-constants'

const baseClasses = `
peer
bg-(--background-light) size-4 shrink-0 rounded-[4px] border
${FIELD_BOX_SHADOW_MIXIN}
transition-shadow outline-none
data-[state=checked]:bg-primary
data-[state=checked]:text-primary-foreground
data-[state=checked]:border-primary
${FIELD_DISABLED_MIXIN}
${FIELD_FOCUS_VISIBLE_MIXIN}
`

/* ========================================================================

======================================================================== */
// This was originally the Checkbox component from ShadCN.
// It was renamed to CheckboxBase to avoid conflicts with
// with the newer Checkbox component, which uses CheckboxBase
// internally. While it's still possible to compose a Checkbox with
// CheckboxBase, prefer the newer Checkbox (or CheckboxGroup) component,
// which add additional features like labels, error messages, help text, etc.
//
// ⚠️ Internally, the Radix primitive Checkbox does implement an
// <input type='checkbox'>. However, it's not directly accessible.
// This means that any attempt to integrate react-hook-form
// with this component or any component built on top of it will
// necessarily require an RHF Controller component.

function CheckboxBase({
  className,
  ...otherProps
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(baseClasses, className)}
      {...otherProps}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='flex items-center justify-center text-current transition-none'
      >
        <CheckIcon className='size-3.5' />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { CheckboxBase }
