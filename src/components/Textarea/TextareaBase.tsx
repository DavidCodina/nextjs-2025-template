import * as React from 'react'
import { cn } from '@/utils'
import {
  FIELD_BOX_SHADOW_MIXIN,
  FIELD_FOCUS_VISIBLE_MIXIN,
  FIELD_DISABLED_MIXIN,
  FIELD_VALID_MIXIN,
  FIELD_INVALID_MIXIN
} from '@/components/component-constants'

type TextareaBaseProps = React.ComponentProps<'textarea'> & {
  error?: string
  touched?: boolean
}

// What is field-sizing-content
const baseClasses = `
flex bg-background-light
w-full min-w-0 min-h-16 
text-base leading-[1.5]
px-[0.5em] py-[0.25em]
rounded-[0.375em]
border outline-none
placeholder:text-muted-foreground
transition-[color,box-shadow]
field-sizing-content
${FIELD_BOX_SHADOW_MIXIN}
${FIELD_FOCUS_VISIBLE_MIXIN}
${FIELD_DISABLED_MIXIN}
`

/* ========================================================================

======================================================================== */

export const TextareaBase = ({
  className,
  disabled = false,
  error = '',
  touched = false,
  ...otherProps
}: TextareaBaseProps) => {
  /* ======================
    maybeValidationMixin
  ====================== */

  const maybeValidationMixin = disabled
    ? ``
    : error // i.e., !disabled && error
      ? `${FIELD_INVALID_MIXIN}`
      : touched // i.e., !disabled && !error && touched
        ? `${FIELD_VALID_MIXIN}`
        : ``

  /* ======================
          return
  ====================== */

  return (
    <textarea
      data-slot='textarea'
      disabled={disabled}
      // maybeValidationMixin is intentionally last to
      // give precedence over the consumer className.
      className={cn(baseClasses, className, maybeValidationMixin)}
      {...otherProps}
    />
  )
}
