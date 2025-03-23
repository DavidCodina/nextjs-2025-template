import * as React from 'react'
import { TextareaBase } from './TextareaBase'
import { Label } from '../label'
import { FormHelp } from '../FormHelp'
import { FormError } from '../FormError'
import { cn } from '@/utils'
import { FIELD_VALID_MIXIN, FIELD_INVALID_MIXIN } from '../component-constants'

type LabelChildren = React.ComponentProps<typeof Label>['children']

type TextareaProps = React.ComponentProps<'textarea'> & {
  error?: string
  errorClassName?: string
  errorStyle?: React.CSSProperties
  groupClassName?: string
  groupStyle?: React.CSSProperties
  help?: string
  helpClassName?: string
  helpStyle?: React.CSSProperties
  label?: LabelChildren
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  renderTextareaBaseOnly?: boolean
  touched?: boolean
}

/* ========================================================================

======================================================================== */

export const Textarea = ({
  className = '',
  disabled = false,
  error = '',
  errorClassName = '',
  errorStyle = {},
  groupClassName = '',
  groupStyle = {},
  help = '',
  helpClassName = '',
  helpStyle = {},
  id = '',
  label = '',
  labelClassName = '',
  labelRequired = false,
  labelStyle = {},
  renderTextareaBaseOnly = false,
  touched = false,
  ...otherProps
}: TextareaProps) => {
  // If id is not set, then fallback to using React's useId() hook.
  const uuid = React.useId()
  id = id || uuid

  const maybeValidationMixin = error
    ? FIELD_INVALID_MIXIN
    : touched && !error
      ? FIELD_VALID_MIXIN
      : ''

  const TextareaBaseComponent = (
    <TextareaBase
      id={id}
      className={cn(maybeValidationMixin, className)}
      disabled={disabled}
      {...otherProps}
    />
  )

  /* ======================
        renderLabel()
  ====================== */

  const renderLabel = () => {
    if (!label) {
      return null
    }

    return (
      <Label
        className={cn('mb-1', labelClassName)}
        disabled={disabled}
        error={error}
        htmlFor={id}
        labelRequired={labelRequired}
        style={labelStyle}
        touched={touched}
      >
        {label}
      </Label>
    )
  }

  /* ======================
          return
  ====================== */

  if (renderTextareaBaseOnly) {
    return TextareaBaseComponent
  }

  return (
    <div className={groupClassName} style={groupStyle}>
      {renderLabel()}

      {TextareaBaseComponent}

      <FormHelp className={helpClassName} disabled={disabled} style={helpStyle}>
        {help}
      </FormHelp>

      <FormError
        className={errorClassName}
        disabled={disabled}
        style={errorStyle}
        touched={touched}
      >
        {error}
      </FormError>
    </div>
  )
}
