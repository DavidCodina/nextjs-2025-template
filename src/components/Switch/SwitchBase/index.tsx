'use client'

import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/utils'
import {
  FIELD_BOX_SHADOW_MIXIN,
  FIELD_DISABLED_MIXIN,
  FIELD_FOCUS_VISIBLE_MIXIN
} from '../../component-constants'

type SwitchBaseProps = Omit<
  React.ComponentProps<typeof SwitchPrimitive.Root>,
  'onChange' | 'onCheckedChange' | 'onBlur'
> & {
  // Same as onCheckedChange, but the naming is more intuitive.
  onChange?: ((checked: boolean) => void) | undefined
  onBlur?: ((checked: boolean) => void) | undefined
}

const rootBaseClasses = `
inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full
border border-transparent cursor-pointer
transition-all outline-none
data-[state=checked]:bg-primary
data-[state=unchecked]:bg-neutral-300
dark:data-[state=unchecked]:bg-accent
${FIELD_BOX_SHADOW_MIXIN}
${FIELD_FOCUS_VISIBLE_MIXIN}
${FIELD_DISABLED_MIXIN}
`

const thumbBaseClasses = `
block bg-background-light size-4 pointer-events-none  
rounded-full ring-0 transition-transform
data-[state=unchecked]:translate-x-0
dark:data-[state=unchecked]:bg-foreground
data-[state=checked]:translate-x-[calc(100%-2px)]
dark:data-[state=checked]:bg-primary-foreground
`

/* ========================================================================

======================================================================== */

export const SwitchBase = ({
  className,
  onChange,
  onBlur,
  ...otherProps
}: SwitchBaseProps) => {
  return (
    <SwitchPrimitive.Root
      {...otherProps}
      data-slot='switch'
      className={cn(rootBaseClasses, className)}
      onCheckedChange={(checked) => {
        onChange?.(checked)
      }}
      onBlur={(e) => {
        const dataState = e.target.getAttribute('data-state')
        onBlur?.(dataState === 'checked')
      }}
    >
      <SwitchPrimitive.Thumb
        data-slot='switch-thumb'
        className={cn(thumbBaseClasses)}
      />
    </SwitchPrimitive.Root>
  )
}
