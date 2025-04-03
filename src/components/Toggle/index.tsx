'use client'

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'

///////////////////////////////////////////////////////////////////////////
//
// Like Button size variants and form control fieldSize variants,
// the size variant here has been modified to be intrinsically based on
// padding, which itself is derived from em units (i.e., the font size).
//
// The original ShadCN implementation did this:
//
//   [&_svg:not([class*='size-'])]:size-4
//
// This means, give the <svg> size-4 unless the <svg> has a className
// of 'size-*'. This does actually work, proving that Tailwind can handle
// that kind of arbitrary variant. However, it also means that using
// className='h-6 w-6' will NOT work. Thus, while it's better than nothing,
// you have to know to use `size-*` classes. Otherwise, you'll get blocked
// by specificity.
//
///////////////////////////////////////////////////////////////////////////

const svgMixin = `
[&_svg]:not([class*='size-'])]:pointer-events-none
[&_svg:not([class*='size-'])]:size-[1.25em]
[&_svg]:shrink-0
`
const disabledMixin = `disabled:pointer-events-none disabled:opacity-50`

// Note: The actual ring color is variant specific (e.g., focus-visible:border-ring).
const focusVisibleMixin = `
focus-visible:ring-ring/50
focus-visible:ring-[3px]
`

const baseClasses = `
inline-flex items-center justify-center gap-[0.5em] shrink-0
px-[0.5em] py-[0.25em]
font-semibold whitespace-nowrap cursor-pointer
select-none rounded-[0.375em] 
outline-none transition-[color,box-shadow]
${svgMixin}
${focusVisibleMixin}
${disabledMixin}
`

const toggleVariants = cva(baseClasses, {
  variants: {
    variant: {
      // Note: The default and outline variant won't look good when the
      // actual background container aslo background-light. For that reason,
      // accent and outline-accent were added.
      default: `
      bg-transparent text-muted-foreground
      not-data-[state=on]:hover:bg-background-light/50 hover:text-foreground
      focus-visible:border-ring
      data-[state=on]:bg-background-light
      data-[state=on]:text-foreground
      `,

      accent: `
      bg-transparent text-muted-foreground
      not-data-[state=on]:hover:bg-accent/50 hover:text-foreground
      focus-visible:border-ring
      data-[state=on]:bg-accent
      data-[state=on]:text-foreground
      `,

      outline: `
        bg-transparent text-muted-foreground border shadow-xs
        not-data-[state=on]:hover:bg-background-light/50 hover:text-foreground
        focus-visible:border-ring
        data-[state=on]:bg-background-light
        data-[state=on]:text-foreground
        `,

      'outline-accent': `
        bg-transparent text-muted-foreground border shadow-xs
        not-data-[state=on]:hover:bg-accent/50 hover:text-foreground
        focus-visible:border-ring
        data-[state=on]:bg-accent
        data-[state=on]:text-foreground
        `
    },

    size: {
      xs: 'text-xs leading-[1.5]',
      sm: 'text-sm leading-[1.5]',
      md: 'text-base leading-[1.5]',
      lg: 'text-lg leading-[1.5]',
      xl: 'text-xl leading-[1.5]'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
})

/* ========================================================================

======================================================================== */

const Toggle = ({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) => {
  return (
    <TogglePrimitive.Root
      data-slot='toggle'
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
