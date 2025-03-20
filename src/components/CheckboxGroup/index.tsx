'use client'

import * as React from 'react'
import { Checkbox } from '../checkbox'
import { Label } from '../label'
import { FormText } from '../FormText'
import { FormError } from '../FormError'
import { cn } from '@/utils'

type LabelChildren = React.ComponentProps<typeof Label>['children']

// Ultimately, this is derived from the Radix Checkbox.Root
type Value = React.ComponentProps<typeof Checkbox>['value']

type Item = {
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  groupClassName?: string
  groupStyle?: React.CSSProperties
  id?: string
  labelText?: LabelChildren
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  /** value is required. Why? When using CheckboxGroup, you're likely interested in
   * the associated values and not merely whether the box was checked.
   */
  value: Value
}

type CheckboxGroupProps = React.ComponentProps<'div'> & {
  disabled?: boolean
  error?: string
  errorClassName?: string
  errorStyle?: React.CSSProperties
  defaultValues?: Value[]
  items: Item[]
  /** The top-level label for the group of checkboxes - Technically a div. */
  labelText?: LabelChildren
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  /** The name attribute shared by all check inputs. */
  name: string
  onChange?: (values: Value[]) => void
  text?: string
  textClassName?: string
  textStyle?: React.CSSProperties
  touched?: boolean
}

/* ========================================================================

======================================================================== */

export const CheckboxGroup = ({
  className = '',
  disabled = false,
  error = '',
  errorClassName = '',
  errorStyle = {},
  defaultValues,
  items = [],
  labelText = '',
  labelClassName = '',
  labelRequired = false,
  labelStyle = {},
  name = '',
  onChange,
  style = {},
  text = '',
  textClassName = '',
  textStyle = {},
  touched = false,
  ...otherProps
}: CheckboxGroupProps) => {
  /* ======================
        state & refs
  ====================== */

  const [values, setValues] = React.useState<Value[]>(() => {
    if (Array.isArray(defaultValues) && defaultValues.length > 0) {
      return defaultValues
    }
    return []
  })

  const firstRenderRef = React.useRef(true)

  /* ======================
        useEffect()
  ====================== */
  // Whenever values changes, call onChange().

  React.useEffect(() => {
    if (firstRenderRef.current === true) {
      firstRenderRef.current = false
      return
    }
    onChange?.(values)
    // Omit onChange from the dependency array.
  }, [values]) // eslint-disable-line

  /* ======================
      renderGroupLabel()
  ====================== */

  const renderGroupLabel = () => {
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
     renderCheckboxes()
  ====================== */

  const renderCheckboxes = () => {
    return items.map((item, index) => {
      // value will also be on <button value="..." />
      // but that's tricker to access.

      const {
        id: checkId,
        className: checkClassName,
        style: checkStyle,
        disabled: checkDisabled,
        groupClassName: checkGroupClassName,
        groupStyle: checkGroupStyle,
        labelText: checkLabelText,
        labelClassName: checkLabelClassName,
        labelRequired: checkLabelRequired,
        labelStyle: checkLabelStyle,
        value: checkValue,
        ...otherCheckboxProps
      } = item

      return (
        <div
          key={index}
          className={cn('mb-2 flex items-center gap-2', checkGroupClassName)}
          style={checkGroupStyle}
        >
          <div className='flex items-center gap-2'>
            <Checkbox
              checked={(() => {
                return values.includes(checkValue)
              })()}
              className={checkClassName}
              disabled={disabled || checkDisabled}
              error={error}
              // Used to suppress error message UI in favor of a single group error message.
              _hideError
              id={checkId}
              labelText={checkLabelText}
              labelClassName={checkLabelClassName}
              labelRequired={checkLabelRequired}
              labelStyle={checkLabelStyle}
              name={name}
              // ⚠️ This is currently implemented under the assumption that each
              // checkbox value will be unique. If the values could potentially be
              // the same, then each value in values would need to be unique.
              // For example: { label: labelText, value: value}
              onCheckedChange={(isChecked) => {
                if (isChecked) {
                  setValues((prev) => [...prev, checkValue])
                } else {
                  setValues((prev) => prev.filter((v) => v !== checkValue))
                }
              }}
              style={checkStyle}
              touched={touched}
              value={checkValue}
              {...otherCheckboxProps}
            />
          </div>
        </div>
      )
    })
  }

  /* ======================
          return
  ====================== */

  return (
    <div
      className={cn(
        {
          'cursor-not-allowed': disabled
        },
        className
      )}
      style={style}
      {...otherProps}
    >
      {renderGroupLabel()}
      {renderCheckboxes()}

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
