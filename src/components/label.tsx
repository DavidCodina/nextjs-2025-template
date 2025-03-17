'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/utils'

///////////////////////////////////////////////////////////////////////////
//
// The group-data-[disabled=true] arbitrary variant assumes
// a something like this:
//
//   <div data-disabled='true' className='group'>
//     <Label />>
//     <Input />
//   </div>
//
// That will work. However, the default ShadCN also had these classes:
//
//   peer-disabled:cursor-not-allowed
//   peer-disabled:opacity-50
//
// That probably assumes that className="peer" is on the <Input />, but
// For the most part it wouldn't work unless <Label /> came AFTER <Input />.
// While that does happen sometimes with checks and radios, it's kind of confusing,
// and most likely seems like a misunderstanding of how `peer` works.
//
///////////////////////////////////////////////////////////////////////////

const baseClasses = `
flex items-center gap-2 text-sm leading-none 
font-medium select-none
group-data-[disabled=true]:pointer-events-none
group-data-[disabled=true]:opacity-50
`

/* ========================================================================

======================================================================== */

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot='label'
      className={cn(baseClasses, className)}
      {...props}
    />
  )
}

export { Label }
