'use client'

import * as React from 'react'
import { cn } from '@/utils'

// https://ui.aceternity.com/tools/box-shadows
const aestheicShadow = `shadow-[0_3px_10px_rgb(0,0,0,0.2)]`

const baseClasses = `
bg-background-light text-foreground
flex flex-col gap-6 rounded-xl border overflow-hidden 
${aestheicShadow}
`

/* ========================================================================

======================================================================== */

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card'
      // text-card-foreground applies the --color-card-foreground to everything
      // except the description, which uses text-muted-foreground.
      // The py-6 on the card generally works well, but if you're adding an image,
      // you will need to use '-mt-6' to offset the space.
      className={cn(baseClasses, className)}
      {...props}
    />
  )
}

export { Card }
