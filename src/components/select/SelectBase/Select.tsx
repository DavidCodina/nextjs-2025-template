'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

/* ========================================================================

======================================================================== */
// https://www.radix-ui.com/primitives/docs/components/select
// The Radix UI Select component is not built on top of react-select.
// The Radix Primitive Select component does not currently support multiple selections.
//
// ⚠️ Internally, the Radix primitive Select does implement a <select>.
// This means that any attempt to integrate react-hook-form
// with this component or any component built on top of it will
// necessarily require an RHF Controller component.

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot='select' {...props} />
}

export { Select }
