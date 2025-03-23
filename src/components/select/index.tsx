'use client'

import * as React from 'react'

import {
  Select as SelectBase,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue
} from './SelectBase'

import { Label } from '../label'
import { FormHelp } from '../FormHelp'
import { FormError } from '../FormError'
import { cn } from '@/utils'
import { FIELD_VALID_MIXIN, FIELD_INVALID_MIXIN } from '../component-constants'

type LabelChildren = React.ComponentProps<typeof Label>['children']

export type SelectValue = React.ComponentProps<typeof SelectItem>['value']

export type SelectItem = {
  className?: string
  disabled?: boolean
  label: React.ReactNode
  // textValue?: string // See Radix docs.
  style?: React.CSSProperties
  value: SelectValue
}

type SelectProps = Omit<
  React.ComponentProps<typeof SelectBase>,
  'onChange' | 'onValueChange'
> & {
  className?: string
  error?: string
  errorClassName?: string
  errorStyle?: React.CSSProperties
  groupClassName?: string
  groupStyle?: React.CSSProperties
  items: SelectItem[]
  label?: LabelChildren
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  // onChange is the same type as onValueChange, but the
  // naming convention is more intuitive.
  onChange?: (value: SelectValue) => void

  placeholder?: React.ReactNode
  id?: string
  sideOffset?: number
  style?: React.CSSProperties
  help?: string
  helpClassName?: string
  helpStyle?: React.CSSProperties
  touched?: boolean
}

/* ========================================================================

======================================================================== */

export const Select = ({
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
  items = [],
  onChange,
  placeholder = 'Select...',
  style = {},
  sideOffset = 0,
  help = '',
  helpClassName = '',
  helpStyle = {},
  touched = false,
  ...otherProps
}: SelectProps) => {
  const uid = React.useId()
  id = id || uid

  const maybeValidationMixin = error
    ? FIELD_INVALID_MIXIN
    : touched && !error
      ? FIELD_VALID_MIXIN
      : ''

  /* ======================
      renderSelectItems()
  ====================== */

  const renderSelectItems = () => {
    return items.map((item, index) => {
      const { label: itemLabel, value: itemValue, ...otherItemProps } = item

      return (
        <SelectItem key={index} value={itemValue} {...otherItemProps}>
          {itemLabel}
        </SelectItem>
      )
    })
  }

  /* ======================
    renderSelectComponent()
  ====================== */

  const renderSelectComponent = () => {
    return (
      <SelectBase
        disabled={disabled}
        onValueChange={(value) => {
          onChange?.(value)
        }}
        {...otherProps}
      >
        <SelectTrigger
          id={id}
          className={cn(maybeValidationMixin, className)}
          style={style}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent sideOffset={sideOffset}>
          <SelectGroup>
            {label && <SelectLabel>{label}</SelectLabel>}

            {renderSelectItems()}
          </SelectGroup>
        </SelectContent>
      </SelectBase>
    )
  }

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

  return (
    <div className={groupClassName} style={groupStyle}>
      {renderLabel()}

      {renderSelectComponent()}

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
