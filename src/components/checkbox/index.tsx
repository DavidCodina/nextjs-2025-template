'use client'

import * as React from 'react'
import { CheckboxBase } from '../CheckboxBase'
import { Label } from '../label'
import { FormHelp } from '../FormHelp'
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
  label?: LabelChildren
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  renderCheckboxBaseOnly?: boolean

  help?: string
  helpClassName?: string
  helpStyle?: React.CSSProperties
  touched?: boolean
}

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
  label = '',
  labelClassName = '',
  labelRequired = false,
  labelStyle = {},
  renderCheckboxBaseOnly = false,
  help = '',
  helpClassName = '',
  helpStyle = {},
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
    if (!label) {
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
        {label}
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
    <div className={groupClassName} style={groupStyle}>
      <div className='flex items-center gap-2'>
        {CheckboxBaseComponent}
        {renderLabel()}
      </div>

      <FormHelp className={helpClassName} disabled={disabled} style={helpStyle}>
        {help}
      </FormHelp>

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
