'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

/* ========================================================================

======================================================================== */
// https://www.radix-ui.com/primitives/docs/components/select
// The Radix UI Select component is not built on top of react-select.
// Despite being called a "Select", this component has no actual <select> tag in it.
// The Radix Primitive Select component does not currently support multiple selections.

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot='select' {...props} />
}

export { Select }
