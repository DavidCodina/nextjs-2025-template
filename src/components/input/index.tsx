import * as React from 'react'
import { cn } from '@/utils'

const fileMixin = `
file:text-foreground 
file:bg-neutral-200
file:border-r
file:border-border
dark:file:bg-neutral-700
file:text-base
file:font-medium
file:px-[0.5em]
file:py-[0.25em]
file:inline-flex
`
// Removed this. Not needed.
// const selectionMixin = `selection:bg-primary selection:text-primary-foreground`

const disabledMixin = `
disabled:pointer-events-none
disabled:cursor-not-allowed
disabled:opacity-65
`

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
shadow-[0_1px_2px_rgba(0,0,0,0.15)]
transition-[color,box-shadow]
${fileMixin}
${disabledMixin}
`

// Note: the shadow and the focus ring are independent.
const focusMixin = `
focus-visible:shadow-none
focus-visible:border-blue-500/65
focus-visible:ring-[3px]
focus-visible:ring-blue-500/30
dark:focus-visible:border-blue-400/65
dark:focus-visible:ring-blue-500/40
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

/* ========================================================================

======================================================================== */

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(baseClasses, focusMixin, ariaMixin, className)}
      {...props}
    />
  )
}

export { Input }
