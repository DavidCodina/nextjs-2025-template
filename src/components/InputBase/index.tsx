import * as React from 'react'
import { cn } from '@/utils'
import {
  FIELD_BOX_SHADOW_MIXIN,
  FIELD_FOCUS_VISIBLE_MIXIN,
  FIELD_DISABLED_MIXIN
} from '../component-constants'

const fileMixin = `
file:text-primary-foreground 
file:bg-primary
file:border-r
file:border-border
file:text-base
file:font-medium
file:px-[0.5em]
file:py-[0.25em]
file:inline-flex
`
// Removed this. Not needed.
// const selectionMixin = `selection:bg-primary selection:text-primary-foreground`

// The padding, and border radius match that of the button component.
const baseClasses = `
flex bg-(--background-light)
w-full min-w-0 
text-base leading-[1.5]
[&:not([type='file'])]:px-[0.5em]
[&:not([type='file'])]:py-[0.25em]
rounded-[0.375em]
border outline-none

placeholder:text-muted-foreground
transition-[color,box-shadow]
${fileMixin}
${FIELD_BOX_SHADOW_MIXIN}
${FIELD_FOCUS_VISIBLE_MIXIN}
${FIELD_DISABLED_MIXIN}
`

const ariaMixin = `
aria-invalid:ring-destructive/20
dark:aria-invalid:ring-destructive/40
aria-invalid:border-destructive
`

// Todo: Add CVA variant of sizes. This should match that of Button.
// Like button, the size of the input will be derived from the font size.

// size: {
//   xs: 'text-xs leading-[1.5]',
//   sm: 'text-sm leading-[1.5]',
//   md: 'text-base leading-[1.5]',
//   lg: 'text-lg leading-[1.5]',
//   xl: 'text-xl leading-[1.5]'
// }

//# Actually, `size` might not be the best name for this prop.
//# It's better  not to override the defualt meaning of size.
type InputBaseProps = Omit<React.ComponentProps<'input'>, 'size' | 'value'> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  value?: string
}

/* ========================================================================

======================================================================== */

function InputBase({ className, size, ...otherProps }: InputBaseProps) {
  void size //# Temporary
  return (
    <input
      data-slot='input'
      className={cn(baseClasses, ariaMixin, className)}
      {...otherProps}
    />
  )
}

export { InputBase }
