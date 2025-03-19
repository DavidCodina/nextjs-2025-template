'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/utils'

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> & {
  disabled?: boolean
  error?: string
  labelRequired?: boolean
  // Omit touched to prevent success styles.
  touched?: boolean
}

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
flex items-center text-sm leading-none 
font-medium select-none
`

/* ========================================================================

======================================================================== */

function Label({
  className,
  children,
  disabled = false,
  error = '',
  labelRequired,
  // It may seem more conventional to use something like `isValid`, but
  // the combination of `error` and `touched` allow for maximum flexibility.
  touched = false,
  ...otherProps
}: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot='label'
      className={cn(baseClasses, className, {
        // Intentionally placed after className to always have precedence.
        'text-destructive': !!error,
        'text-success': !error && touched,
        'text-muted-foreground pointer-events-none opacity-65': disabled
      })}
      {...otherProps}
    >
      {children}

      {labelRequired && (
        <sup
          className={cn('text-destructive relative -top-1 text-[1.25em]', {
            'text-success': !error && touched,
            'text-[inherit]': disabled
          })}
        >
          *
        </sup>
      )}
    </LabelPrimitive.Root>
  )
}

export { Label }
