'use client'

import * as React from 'react'
import { SliderBase } from './SliderBase'
import { Label } from '../label'
import { FormHelp } from '../FormHelp'
import { FormError } from '../FormError'
import { cn } from '@/utils'

type LabelChildren = React.ComponentProps<typeof Label>['children']

type SliderProps = React.ComponentProps<typeof SliderBase> & {
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
  renderSliderBaseOnly?: boolean
  touched?: boolean
}

/* ========================================================================

======================================================================== */

function Slider({
  className,
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
  renderSliderBaseOnly = false,
  touched = false,
  ...otherProps
}: SliderProps) {
  const uuid = React.useId()
  id = id || uuid

  /* ======================
    maybeValidationMixin
  ====================== */
  // In this case, FIELD_INVALID_MIXIN & FIELD_VALID_MIXIN no difference here.

  const maybeValidationMixin = disabled
    ? `
    pointer-events-none opacity-65
    [&_[data-slot=slider-range]]:bg-neutral-400
    [&_[data-slot=slider-thumb]]:border-neutral-400
    `
    : error // i.e., !disabled && error
      ? `
      [&_[data-slot=slider-range]]:bg-destructive
      [&_[data-slot=slider-thumb]]:ring-destructive/40
      [&_[data-slot=slider-thumb]]:border-destructive
      `
      : touched // i.e., !disabled && !error && touched
        ? `
         [&_[data-slot=slider-range]]:bg-success
         [&_[data-slot=slider-thumb]]:ring-success/40
         [&_[data-slot=slider-thumb]]:border-success
        `
        : ``

  /* ======================
    SliderBaseComponent
  ====================== */

  const SliderBaseComponent = (
    <SliderBase
      disabled={disabled}
      className={cn(maybeValidationMixin, className)}
      id={id}
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
        className={cn('mb-2', labelClassName)}
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

  if (renderSliderBaseOnly) {
    return SliderBaseComponent
  }

  return (
    <div className={groupClassName} style={groupStyle}>
      {renderLabel()}

      {SliderBaseComponent}

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

export { Slider }
