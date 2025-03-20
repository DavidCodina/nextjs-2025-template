'use client'

import * as React from 'react'
import { Checkbox } from '../checkbox'
import { Label } from '../label'
import { FormText } from '../FormText'
import { FormError } from '../FormError'
import { cn } from '@/utils'

type LabelChildren = React.ComponentProps<typeof Label>['children']

// Ultimately, this is derived from the Radix CheckboxPrimitive.Root
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
  labelRequired?: boolean // ???
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
  initialValues?: Value[]
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
  initialValues,
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
    if (Array.isArray(initialValues) && initialValues.length > 0) {
      return initialValues
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
        renderLabel()
  ====================== */

  const renderLabel = (config: {
    id: string
    disabled: boolean | undefined
    labelText?: LabelChildren
    labelClassName?: string
    labelRequired?: boolean
    labelStyle?: React.CSSProperties
  }) => {
    if (!config.labelText) {
      return null
    }

    return (
      <Label
        id={config.id}
        className={cn('text-xs', config.labelClassName)}
        disabled={config.disabled}
        // This will always be the top-level error prop.
        error={error}
        htmlFor={config.id}
        labelRequired={config.labelRequired}
        style={config.labelStyle}
        // This will always be the top-level touched prop.
        touched={touched}
        suppressHydrationWarning
      >
        {config.labelText}
      </Label>
    )
  }

  /* ======================
     renderCheckboxes()
  ====================== */

  const renderCheckboxes = () => {
    const generateUniqueId = () =>
      `${name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

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

      // This is going to create a hydration mismatch wherever
      // it is applied. Use suppressHydrationWarning on those
      // components / JSX elements.
      const uid = checkId || generateUniqueId()

      return (
        <div
          key={index}
          className={cn('mb-2 flex items-center gap-2', checkGroupClassName)}
          style={checkGroupStyle}
        >
          <div className='flex items-center gap-2'>
            <Checkbox
              id={uid}
              className={checkClassName}
              style={checkStyle}
              checked={(() => {
                return values.includes(checkValue)
              })()}
              disabled={disabled || checkDisabled}
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
              renderCheckboxBaseOnly
              error={error}
              touched={touched}
              value={checkValue}
              suppressHydrationWarning
              {...otherCheckboxProps}
            />

            {renderLabel({
              id: uid,
              disabled: disabled || checkDisabled,
              labelText: checkLabelText,
              labelClassName: checkLabelClassName,
              labelRequired: checkLabelRequired,
              labelStyle: checkLabelStyle
            })}
          </div>
        </div>
      )
    })
  }

  /* ======================
          return
  ====================== */

  return (
    <div className={className} style={style} {...otherProps}>
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
