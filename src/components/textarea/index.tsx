import * as React from 'react'
import { TextareaBase } from './TextareaBase'
import { Label } from '../label'
import { FormText } from '../FormText'
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
  labelText?: LabelChildren
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  renderTextareaBaseOnly?: boolean
  text?: string
  textClassName?: string
  textStyle?: React.CSSProperties
  touched?: boolean
}

const groupBaseClassses = `group`

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
  id = '',
  labelText = '',
  labelClassName = '',
  labelRequired = false,
  labelStyle = {},
  renderTextareaBaseOnly = false,
  text = '',
  textClassName = '',
  textStyle = {},
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
    if (!labelText) {
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
        {labelText}
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
    <div className={cn(groupBaseClassses, groupClassName)} style={groupStyle}>
      {renderLabel()}

      {TextareaBaseComponent}

      <FormText className={textClassName} disabled={disabled} style={textStyle}>
        {text}
      </FormText>

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
