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

const _ariaMixin = `
aria-invalid:ring-destructive/20
aria-invalid:border-destructive
dark:aria-invalid:ring-destructive/40
`

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

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(baseClasses, className)}
      {...props}
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

export { Checkbox }
