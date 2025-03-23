'use client'

import * as React from 'react'
import { cn } from '@/utils'

// https://ui.aceternity.com/tools/box-shadows
const aestheicShadow = `shadow-[0_3px_10px_rgb(0,0,0,0.2)]`

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
      className={cn(
        `bg-card text-card-foreground flex flex-col gap-6 overflow-hidden rounded-xl border py-6 ${aestheicShadow}`,
        className
      )}
      {...props}
    />
  )
}

export { Card }
