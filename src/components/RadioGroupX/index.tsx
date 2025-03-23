'use client'

import * as React from 'react'
import {
  RadioGroupBase,
  RadioGroupItemBase,
  type RadioValue
} from '@/components/RadioGroupBaseX'
import { Label } from '../label'
import { FormHelp } from '../FormHelp'
import { FormError } from '../FormError'
import { cn } from '@/utils'

type LabelChildren = React.ComponentProps<typeof Label>['children']

export type RadioItemType = {
  className?: string
  disabled?: boolean
  id?: string
  groupClassName?: string
  groupStyle?: React.CSSProperties
  label?: LabelChildren
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  style?: React.CSSProperties
  value: RadioValue
}

// Gotcha: simply overwriting the onChange below is not
// sufficient. You MUST omit the original `onChange` or
// Typescript will get very confused at some point.
type RadioGroupProps = Omit<
  React.ComponentProps<typeof RadioGroupBase>,
  'asChild' | 'required' | 'orientation' | 'dir'
> & {
  error?: string
  errorClassName?: string
  errorStyle?: React.CSSProperties
  help?: string
  helpClassName?: string
  helpStyle?: React.CSSProperties
  items: RadioItemType[]
  /** The top-level label for the group of checkboxes - Technically a div. */
  label?: LabelChildren
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  /** The name attribute shared by all 'radios'. By default,
   * RadioGroupPrimitive.Root allows this to be undefined.
   * Here, it is required.
   */
  name: string
  radioGroupBaseClassName?: string
  radioGroupBaseStyle?: React.CSSProperties
  touched?: boolean
}

/* ========================================================================

======================================================================== */

const RadioGroup = ({
  className = '',
  defaultValue,
  disabled = false,
  error = '',
  errorClassName = '',
  errorStyle = {},
  help = '',
  helpClassName = '',
  helpStyle = {},
  items = [],
  label = '',
  labelClassName = '',
  labelRequired = false,
  labelStyle = {},
  radioGroupBaseClassName = '',
  radioGroupBaseStyle = {},
  style = {},
  touched = false,
  value,
  ...otherProps
}: RadioGroupProps) => {
  const uid = React.useId()

  /* ======================
      renderLabel()
  ====================== */

  const renderLabel = () => {
    if (!label) {
      return null
    }

    return (
      <Label
        asChild
        className={cn('mb-2', labelClassName)}
        disabled={disabled}
        error={error}
        labelRequired={labelRequired}
        style={labelStyle}
        touched={touched}
      >
        <div>{label}</div>
      </Label>
    )
  }

  /* ======================
        renderRadios()
  ====================== */

  const renderRadios = () => {
    return items.map((item, index) => {
      const {
        id: _radioId,
        className: radioClassName,
        style: radioStyle,
        disabled: radioDisabled,
        groupClassName: radioGroupClassName,
        groupStyle: radioGroupStyle,
        label: radioLabel,
        labelClassName: radioLabelClassName,
        labelRequired: radioLabelRequired,
        labelStyle: radioLabelStyle,
        value: radioValue
      } = item

      const radioId = _radioId || `${uid}-${index + 1}`

      return (
        <div
          key={index}
          className={cn('flex items-center gap-2', radioGroupClassName)}
          style={radioGroupStyle}
        >
          <RadioGroupItemBase
            className={radioClassName}
            id={radioId}
            style={radioStyle}
            value={radioValue}
          />

          {radioLabel && (
            <Label
              className={cn('text-xs', radioLabelClassName)}
              disabled={disabled || radioDisabled}
              error={error}
              htmlFor={radioId}
              labelRequired={radioLabelRequired}
              style={radioLabelStyle}
              touched={touched}
            >
              {radioLabel}
            </Label>
          )}
        </div>
      )
    })
  }

  /* ======================
          return
  ====================== */

  return (
    <div className={cn('', className)} style={style}>
      {renderLabel()}

      <RadioGroupBase
        {...otherProps} // i.e., name gets passed through and propogates to children inputs
        // In a Radix UI RadioGroup component, when both value and defaultValue props
        // are provided (and both are defined strings), the value prop will always
        // take precedence over the defaultValue.
        defaultValue={defaultValue}
        className={radioGroupBaseClassName}
        style={radioGroupBaseStyle}
        value={value}
      >
        {renderRadios()}
      </RadioGroupBase>

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

export { RadioGroup, RadioValue }
