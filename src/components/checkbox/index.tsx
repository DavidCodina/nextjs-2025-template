'use client'

import * as React from 'react'

import { CheckboxBase } from '../CheckboxBase'
import { Label } from '../label'
import { FormText } from '../FormText'
import { FormError } from '../FormError'

import { cn } from '@/utils'

import { FIELD_VALID_MIXIN, FIELD_INVALID_MIXIN } from '../component-constants'
type LabelChildren = React.ComponentProps<typeof Label>['children']

type CheckboxProps = React.ComponentProps<typeof CheckboxBase> & {
  error?: string
  errorClassName?: string
  errorStyle?: React.CSSProperties
  groupClassName?: string
  groupStyle?: React.CSSProperties
  /** Used internally by CheckboxGroup */
  _hideError?: boolean
  labelText?: LabelChildren
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  renderCheckboxBaseOnly?: boolean
  text?: string
  textClassName?: string
  textStyle?: React.CSSProperties
  touched?: boolean
}

const groupBaseClassses = `group`

/* ========================================================================

======================================================================== */

function Checkbox({
  className = '',
  disabled = false,
  error = '',
  errorClassName = '',
  errorStyle = {},
  groupClassName = '',
  groupStyle = {},
  _hideError = false,
  id = '',
  labelText = '',
  labelClassName = '',
  labelRequired = false,
  labelStyle = {},
  renderCheckboxBaseOnly = false,
  text = '',
  textClassName = '',
  textStyle = {},
  touched = false,
  ...otherProps
}: CheckboxProps) {
  // If id is not set, then fallback to using React's useId() hook.
  const uuid = React.useId()
  id = id || uuid

  const maybeValidationMixin = error
    ? FIELD_INVALID_MIXIN
    : touched && !error
      ? FIELD_VALID_MIXIN
      : ''

  const CheckboxBaseComponent = (
    <CheckboxBase
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
        className={cn('text-xs', labelClassName)}
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

  if (renderCheckboxBaseOnly) {
    return CheckboxBaseComponent
  }

  return (
    <div className={cn(groupBaseClassses, groupClassName)} style={groupStyle}>
      <div className='flex items-center gap-2'>
        {CheckboxBaseComponent}
        {renderLabel()}
      </div>

      <FormText className={textClassName} disabled={disabled} style={textStyle}>
        {text}
      </FormText>

      {!_hideError && (
        <FormError
          className={errorClassName}
          disabled={disabled}
          style={errorStyle}
          touched={touched}
        >
          {error}
        </FormError>
      )}
    </div>
  )
}

export { Checkbox }
