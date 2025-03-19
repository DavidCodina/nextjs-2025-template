import * as React from 'react'
import { InputBase } from '../InputBase'
import { Label } from '../label'
import { FormText } from '../FormText'
import { FormError } from '../FormError'
import { cn } from '@/utils'
import { FIELD_INVALID_MIXIN } from '../component-constants'

type InputProps = React.ComponentProps<typeof InputBase> & {
  error?: string
  errorClassName?: string
  errorStyle?: React.CSSProperties
  groupClassName?: string
  groupStyle?: React.CSSProperties
  labelText?: string // Could be React.ReactNode, but string is okay for now.
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  renderInputBaseOnly?: boolean
  text?: string
  textClassName?: string
  textStyle?: React.CSSProperties
  touched?: boolean
}

const groupBaseClassses = `group`

/* ========================================================================

======================================================================== */

export const Input = ({
  className = '',
  disabled = false,

  error = '',
  errorClassName = '',
  errorStyle = {},

  groupClassName = '',
  groupStyle = {},
  id = '',

  labelText = '',
  labelClassName = '',
  labelRequired = false,
  labelStyle = {},

  renderInputBaseOnly = false,

  text = '',
  textClassName = '',
  textStyle = {},

  touched = false,
  ...otherProps
}: InputProps) => {
  void touched

  // If id is not set, then fallback to using React's useId() hook.
  const uuid = React.useId()
  id = id || uuid

  const maybeFieldInvalidMixin = error ? FIELD_INVALID_MIXIN : ''

  const InputBaseComponent = (
    <InputBase
      id={id}
      className={cn(maybeFieldInvalidMixin, className)}
      disabled={disabled}
      {...otherProps}
    />
  )

  /* ======================
          return
  ====================== */

  if (renderInputBaseOnly) {
    return InputBaseComponent
  }

  return (
    <div className={cn(groupBaseClassses, groupClassName)} style={groupStyle}>
      {labelText && (
        <Label
          className={cn('mb-1', labelClassName)}
          disabled={disabled}
          error={error}
          htmlFor={id}
          labelRequired={labelRequired}
          style={labelStyle}
        >
          {labelText}
        </Label>
      )}

      {InputBaseComponent}

      <FormText className={textClassName} disabled={disabled} style={textStyle}>
        {text}
      </FormText>

      <FormError
        className={errorClassName}
        disabled={disabled}
        style={errorStyle}
      >
        {error}
      </FormError>
    </div>
  )
}
