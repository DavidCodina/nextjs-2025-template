import * as React from 'react'
import { cn } from '@/utils'
import {
  FIELD_FOCUS_VISIBLE_MIXIN,
  FIELD_DISABLED_MIXIN
} from '../component-constants'

// Same as Input
const ariaMixin = `
aria-invalid:ring-destructive/20
dark:aria-invalid:ring-destructive/40
aria-invalid:border-destructive
`

// What is field-sizing-content
const baseClasses = `
flex bg-(--background-light)
w-full min-w-0 min-h-16 
text-base leading-[1.5]
px-[0.5em] py-[0.25em]
rounded-[0.375em]
border outline-none
placeholder:text-muted-foreground
shadow-[0_1px_2px_rgba(0,0,0,0.15)]
transition-[color,box-shadow]
field-sizing-content
${FIELD_FOCUS_VISIBLE_MIXIN}
${FIELD_DISABLED_MIXIN}
${ariaMixin}
`

/* ========================================================================

======================================================================== */

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(baseClasses, className)}
      {...props}
    />
  )
}

export { Textarea }
