import * as React from 'react'
import { cn } from '@/utils'
import {
  FIELD_BOX_SHADOW_MIXIN,
  FIELD_FOCUS_VISIBLE_MIXIN,
  FIELD_DISABLED_MIXIN,
  FIELD_VALID_MIXIN,
  FIELD_INVALID_MIXIN
} from '@/components/component-constants'

const fileMixin = `
file:text-primary-foreground 
file:bg-primary
file:border-r
file:border-border
file:text-base
file:font-medium
file:px-[0.5em]
file:py-[0.25em]
file:inline-flex
`
// Removed this. Not needed.
// const selectionMixin = `selection:bg-primary selection:text-primary-foreground`

// The padding, and border radius match that of the button component.
const baseClasses = `
flex bg-background-light
w-full min-w-0 
text-base leading-[1.5]
[&:not([type='file'])]:px-[0.5em]
[&:not([type='file'])]:py-[0.25em]
rounded-[0.375em]
border outline-none
placeholder:text-muted-foreground
transition-[color,box-shadow]
${fileMixin}
${FIELD_BOX_SHADOW_MIXIN}
${FIELD_FOCUS_VISIBLE_MIXIN}
${FIELD_DISABLED_MIXIN}
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

type InputBaseProps = React.ComponentProps<'input'> & {
  error?: string
  fieldSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  touched?: boolean
}

/* ========================================================================

======================================================================== */

function InputBase({
  className,
  disabled = false,
  error = '',
  fieldSize,
  touched = false,
  ...otherProps
}: InputBaseProps) {
  void fieldSize //# Temporary

  /* ======================
    maybeValidationMixin
  ====================== */

  const maybeValidationMixin = disabled
    ? `
    file:text-white
    file:bg-neutral-400
    file:border-neutral-400
    `
    : error // i.e., !disabled && error
      ? `
      ${FIELD_INVALID_MIXIN}
      file:text-destructive-foreground
      file:bg-destructive
      file:border-destructive
      `
      : touched // i.e., !disabled && !error && touched
        ? `
         ${FIELD_VALID_MIXIN}
         file:text-success-foreground
         file:bg-success
         file:border-success
        `
        : ``

  /* ======================
          return
  ====================== */

  return (
    <input
      data-slot='input'
      disabled={disabled}
      // maybeValidationMixin is intentionally last to
      // give precedence over the consumer className.
      className={cn(baseClasses, className, maybeValidationMixin)}
      {...otherProps}
    />
  )
}

export { InputBase }
