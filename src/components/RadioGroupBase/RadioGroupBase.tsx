'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@/utils'

/* ========================================================================

======================================================================== */
// This was originally the RadioGroup component from ShadCN.
// It was renamed to RadioGroupBase to avoid conflicts with
// with the newer RadioGroup component, which uses RadioGroupBase
// internally. While it's still possible to compose Radio Groups with
// RadioGroupBase and RadioGroupItemBase, prefer the newer RadioGroup
// component, which abstracts away many of the implementation details.

export const RadioGroupBase = ({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) => {
  return (
    <RadioGroupPrimitive.Root
      data-slot='radio-group'
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}
