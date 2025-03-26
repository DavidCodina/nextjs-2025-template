'use client'

import * as React from 'react'
import { InputBase } from './InputBase'
import { Label } from '../label'
import { FormHelp } from '../FormHelp'
import { FormError } from '../FormError'
import { cn } from '@/utils'
import { FIELD_VALID_MIXIN, FIELD_INVALID_MIXIN } from '../component-constants'

type LabelChildren = React.ComponentProps<typeof Label>['children']

type InputProps = React.ComponentProps<typeof InputBase> & {
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
  renderInputBaseOnly?: boolean

  touched?: boolean
}

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
  label = '',
  labelClassName = '',
  labelRequired = false,
  labelStyle = {},
  renderInputBaseOnly = false,
  help = '',
  helpClassName = '',
  helpStyle = {},
  touched = false,
  ...otherProps
}: InputProps) => {
  const uid = React.useId()
  id = id || uid

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
      InputBaseComponent
  ====================== */

  const InputBaseComponent = (
    <InputBase
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

  if (renderInputBaseOnly) {
    return InputBaseComponent
  }

  return (
    <div className={groupClassName} style={groupStyle}>
      {renderLabel()}

      {InputBaseComponent}

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
