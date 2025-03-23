'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@/utils'

// Exporting this is useful for typing state when consuming.
export type RadioValue = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
>['value']

type RadioGroupBaseProps = Omit<
  React.ComponentProps<typeof RadioGroupPrimitive.Root>,
  'onValueChange' | 'onChange'
> & {
  // Same type as the original Radix onValueChange, but more intuitive.
  onChange?: (value: RadioValue) => void
}

/* ========================================================================

======================================================================== */
// This was originally the RadioGroup component from ShadCN.
// It was renamed to RadioGroupBase to avoid conflicts with
// with the newer RadioGroup component, which uses RadioGroupBase
// internally. While it's still possible to compose Radio Groups with
// RadioGroupBase and RadioGroupItemBase, prefer the newer RadioGroup
// component, which abstracts away many of the implementation details.
//
// ⚠️ Internally, the Radix primitive RadioGroup does implement an
// <input type='radio'>. However, it's not directly accessible.
// This means that any attempt to integrate react-hook-form
// with this component or any component built on top of it will
// necessarily require an RHF Controller component.

export const RadioGroupBase = ({
  className,
  onChange,
  ...otherProps
}: RadioGroupBaseProps) => {
  return (
    <RadioGroupPrimitive.Root
      data-slot='radio-group'
      className={cn('flex flex-col gap-2', className)}
      onValueChange={(value) => {
        onChange?.(value)
      }}
      {...otherProps}
    />
  )
}
