'use client'

import * as React from 'react'

import {
  Select as SelectBase,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
  SelectValueType
} from './SelectBase'

import { Label } from '../label'
import { FormHelp } from '../FormHelp'
import { FormError } from '../FormError'
import { cn } from '@/utils'
import { FIELD_VALID_MIXIN, FIELD_INVALID_MIXIN } from '../component-constants'

type LabelChildren = React.ComponentProps<typeof Label>['children']

type SelectItemType = {
  className?: string
  disabled?: boolean
  label: React.ReactNode
  // textValue?: string // See Radix docs.
  style?: React.CSSProperties
  value: SelectValueType
}

type SelectProps = React.ComponentProps<typeof SelectBase> & {
  className?: string
  error?: string
  errorClassName?: string
  errorStyle?: React.CSSProperties
  groupClassName?: string
  groupStyle?: React.CSSProperties
  help?: string
  helpClassName?: string
  helpStyle?: React.CSSProperties
  id?: string
  items: SelectItemType[]
  label?: LabelChildren
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  placeholder?: React.ReactNode
  sideOffset?: number
  style?: React.CSSProperties
  touched?: boolean
}

/* ========================================================================

======================================================================== */

const Select = ({
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
  items = [],
  onChange,
  placeholder = 'Select...',
  sideOffset = 0,
  style = {},
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
        onChange={(value) => {
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

export { Select, type SelectValueType, type SelectItemType }
