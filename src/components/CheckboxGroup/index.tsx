'use client'

import * as React from 'react'
import { Checkbox } from '../checkbox'
import { Label } from '../label'
import { FormHelp } from '../FormHelp'
import { FormError } from '../FormError'
import { cn } from '@/utils'

type LabelChildren = React.ComponentProps<typeof Label>['children']

// Ultimately, this is derived from the Radix Checkbox.Root
// The readonly string[] case specifically exists to support <input type="file">
// Exporting this is useful for typing state when consuming.
export type CheckboxValue = React.ComponentProps<typeof Checkbox>['value']

export type CheckboxItem = {
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  groupClassName?: string
  groupStyle?: React.CSSProperties
  id?: string

  label?: LabelChildren
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  /** value is required. Why? When using CheckboxGroup, you're likely interested in
   * the associated values and not merely whether the checkbox was checked.
   */
  value: CheckboxValue
}

// Gotcha: simply overwriting the onChange below is not
// sufficient. You MUST omit the original `onChange` or
// Typescript will get very confused at some point.
type CheckboxGroupProps = Omit<React.ComponentProps<'div'>, 'onChange'> & {
  disabled?: boolean
  error?: string
  errorClassName?: string
  errorStyle?: React.CSSProperties
  defaultValue?: CheckboxValue[]
  items: CheckboxItem[]
  /** The top-level label for the group of checkboxes - Technically a div. */
  label?: LabelChildren
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  /** The name attribute shared by all check inputs. */
  name: string
  onChange?: (values: CheckboxValue[]) => void

  help?: string
  helpClassName?: string
  helpStyle?: React.CSSProperties
  touched?: boolean
  value?: CheckboxValue[]
}

/* ========================================================================

======================================================================== */

export const CheckboxGroup = ({
  className = '',
  disabled = false,
  error = '',
  errorClassName = '',
  errorStyle = {},
  defaultValue,
  items = [],
  label = '',
  labelClassName = '',
  labelRequired = false,
  labelStyle = {},
  name = '',
  onChange,
  style = {},
  help = '',
  helpClassName = '',
  helpStyle = {},
  touched = false,
  value: controlledValue,
  ...otherProps
}: CheckboxGroupProps) => {
  /* ======================
        state & refs
  ====================== */
  ///////////////////////////////////////////////////////////////////////////
  //
  // Here we need state to track the array of checked values.
  // However, this means that resetting value must result from either
  // unmounting/remounting the component, or through a controlled implementation
  // that resets it externally. This may seem to be introducing potential problems
  // by using state here. For example, if the consuming component is drilling into
  // the DOM through a ref, then changing the internal <input type="checkbox" />
  // value, this will create a dissonance between the React state and the DOM.
  // That said, after a lot of experimentation, it just doesn't seem like Radix
  // form field primitives are designed to be reset through using refs.
  //
  // What they are designed for is to be reset through a controlled implementation.
  // In practice, that means that using state here should not actually be a problem.
  //
  ///////////////////////////////////////////////////////////////////////////

  const [value, setValue] = React.useState<CheckboxValue[]>(() => {
    if (Array.isArray(controlledValue)) {
      return controlledValue
    }

    if (Array.isArray(defaultValue) && defaultValue.length > 0) {
      return defaultValue
    }
    return []
  })

  const firstRenderRef = React.useRef(true)

  /* ======================
        useEffect()
  ====================== */
  // Whenever value changes, call onChange().

  React.useEffect(() => {
    if (firstRenderRef.current === true) {
      return
    }
    onChange?.(value)
    // Omit onChange from the dependency array.
  }, [value]) // eslint-disable-line

  /* ======================
        useEffect()
  ====================== */
  // Every time controlledValue changes, conditionally call
  // setValue(controlledValue as Value[]) based on deep comparison.

  React.useEffect(() => {
    if (firstRenderRef.current === true) {
      return
    }

    ///////////////////////////////////////////////////////////////////////////
    //
    // Could do this to avoid ESLint complaining about the missing `value` dependency,
    // but running the if check on the outside is generally a better practice.
    //
    //   setValue((prev) => {
    //     if (JSON.stringify(controlledValue) !== JSON.stringify(prev)) {
    //       return controlledValue as Value[]
    //     }
    //     return prev
    //   })
    //
    ///////////////////////////////////////////////////////////////////////////

    // Note: Calling JSON.stringify([undefined]) will restult in '[null]'.
    // Then when you parse it back you will have null for the first element.
    // This is one of the quirks of JSON.stringify(). However, in this case,
    // it shouldn't be an issue.
    if (
      typeof controlledValue !== 'undefined' &&
      Array.isArray(controlledValue) &&
      JSON.stringify(controlledValue) !== JSON.stringify(value)
    ) {
      setValue(controlledValue as CheckboxValue[])
    }
  }, [controlledValue]) // eslint-disable-line

  /* ======================
        useEffect()
  ====================== */
  // Update firstRenderRef

  React.useEffect(() => {
    if (firstRenderRef.current === true) {
      firstRenderRef.current = false
      return
    }
  }, [])

  /* ======================
      renderGroupLabel()
  ====================== */

  const renderGroupLabel = () => {
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
        label: checkLabel,
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
                return value.includes(checkValue)
              })()}
              className={checkClassName}
              disabled={disabled || checkDisabled}
              error={error}
              // Used to suppress error message UI in favor of a single group error message.
              _hideError
              id={checkId}
              label={checkLabel}
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
                  setValue((prev) => [...prev, checkValue])
                } else {
                  setValue((prev) => prev.filter((v) => v !== checkValue))
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
