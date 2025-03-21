'use client'

import * as React from 'react'
import { RadioGroupBase, RadioGroupItemBase } from '@/components/RadioGroupBase'
import { Label } from '../label'
import { FormText } from '../FormText'
import { FormError } from '../FormError'
import { cn } from '@/utils'

// Ultimately, this is derived from the Radix RadioGroup.Item
// Exporting this is useful for typing state when consuming.
export type RadioValue = React.ComponentProps<
  typeof RadioGroupItemBase
>['value']

type LabelChildren = React.ComponentProps<typeof Label>['children']

export type RadioItem = {
  className?: string
  disabled?: boolean
  id?: string
  groupClassName?: string
  groupStyle?: React.CSSProperties
  labelText?: LabelChildren
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
  'asChild' | 'onValueChange' | 'onChange' | 'required' | 'orientation' | 'dir'
> & {
  error?: string
  errorClassName?: string
  errorStyle?: React.CSSProperties
  items: RadioItem[]
  /** The top-level label for the group of checkboxes - Technically a div. */
  labelText?: LabelChildren
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  /** The name attribute shared by all 'radios'. By default,
   * RadioGroupPrimitive.Root allows this to be undefined.
   * Here, it is required.
   */
  name: string
  // Same type as the original Radix onValueChange, but more intuitive.
  onChange?: (value: RadioValue) => void
  radioGroupBaseClassName?: string
  radioGroupBaseStyle?: React.CSSProperties
  text?: string
  textClassName?: string
  textStyle?: React.CSSProperties
  touched?: boolean
}

/* ========================================================================

======================================================================== */

export const RadioGroup = ({
  className = '',
  disabled = false,
  error = '',
  errorClassName = '',
  errorStyle = {},
  defaultValue,
  items = [],
  labelText = '',
  labelClassName = '',
  labelRequired = false,
  labelStyle = {},
  name = '',
  onChange,
  radioGroupBaseClassName = '',
  radioGroupBaseStyle = {},
  style = {},
  text = '',
  textClassName = '',
  textStyle = {},
  touched = false,
  value,
  ...otherProps
}: RadioGroupProps) => {
  /* ======================
      renderLabel()
  ====================== */

  const renderLabel = () => {
    if (!labelText) {
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
        <div>{labelText}</div>
      </Label>
    )
  }

  /* ======================
        renderRadios()
  ====================== */

  const renderRadios = () => {
    return items.map((item, index) => {
      const generateId = () =>
        `radio-${name}-${index + 1}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

      const {
        id: radioId,
        className: radioClassName,
        style: radioStyle,
        disabled: radioDisabled,
        groupClassName: radioGroupClassName,
        groupStyle: radioGroupStyle,
        labelText: radioLabelText,
        labelClassName: radioLabelClassName,
        labelRequired: radioLabelRequired,
        labelStyle: radioLabelStyle,
        value: radioValue
      } = item

      // This will cause a hytration mismatch. Use suppressHydrationWarning
      // on the associated components/JSX elements.
      const uid = radioId || generateId()

      return (
        <div
          key={index}
          className={cn('flex items-center gap-2', radioGroupClassName)}
          style={radioGroupStyle}
        >
          <RadioGroupItemBase
            className={radioClassName}
            id={uid}
            style={radioStyle}
            suppressHydrationWarning
            value={radioValue}
          />

          {radioLabelText && (
            <Label
              className={cn('text-xs', radioLabelClassName)}
              disabled={disabled || radioDisabled}
              error={error}
              htmlFor={uid}
              labelRequired={radioLabelRequired}
              style={radioLabelStyle}
              suppressHydrationWarning
              touched={touched}
            >
              {radioLabelText}
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
        {...otherProps}
        // In a Radix UI RadioGroup component, when both value and defaultValue props
        // are provided (and both are defined strings), the value prop will always
        // take precedence over the defaultValue.
        defaultValue={defaultValue}
        onValueChange={onChange}
        className={radioGroupBaseClassName}
        style={radioGroupBaseStyle}
        value={value}
      >
        {renderRadios()}
      </RadioGroupBase>

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
