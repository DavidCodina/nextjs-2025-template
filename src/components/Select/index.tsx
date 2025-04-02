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
import { Label } from '@/components/label'
import { FormHelp } from '@/components/FormHelp'
import { FormError } from '@/components/FormError'
import { cn } from '@/utils'

type LabelChildren = React.ComponentProps<typeof Label>['children']

type FieldSize = React.ComponentProps<typeof SelectTrigger>['fieldSize']

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
  fieldSize?: FieldSize
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
  onBlur?: (value: SelectValueType) => void
  placeholder?: React.ReactNode
  renderSelectBase?: (selectBase: React.JSX.Element) => React.JSX.Element
  sideOffset?: number
  style?: React.CSSProperties
  touched?: boolean
}

/* ========================================================================

======================================================================== */

const Select = ({
  className = '',
  defaultValue,
  disabled = false,
  error = '',
  errorClassName = '',
  errorStyle = {},
  fieldSize,
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
  onBlur,
  onChange,
  placeholder = 'Select...',
  renderSelectBase,
  sideOffset = 0,
  style = {},
  touched = false,
  value: controlledValue,
  ...otherProps
}: SelectProps) => {
  const uid = React.useId()
  id = id || uid

  /* ======================
      state & refs
  ====================== */

  // It's very difficult to get the actual value from the Select component other
  // than on mount and onChange. The value state is used internally to store that
  // value, which can then be used by onBlur. However, we have to add a useEffect
  // and a state setter within onChange to make sure everythign stays in sync.
  const [value, setValue] = React.useState<SelectValueType>(() => {
    if (controlledValue && typeof controlledValue === 'string') {
      return controlledValue
    }

    if (defaultValue && typeof defaultValue === 'string') {
      return defaultValue
    }
    return ''
  })

  const selectContainerRef = React.useRef<HTMLDivElement>(null)
  const selectContentRef = React.useRef<HTMLDivElement>(null)
  const firstRenderRef = React.useRef(true)

  /* ======================
        useEffect()
  ====================== */
  // Every time controlledValue changes, conditionally call
  // setValue(controlledValue)

  React.useEffect(() => {
    if (firstRenderRef.current === true) {
      firstRenderRef.current = false
      return
    }

    if (typeof controlledValue !== 'undefined' && controlledValue !== value) {
      setValue(controlledValue)
    }
  }, [controlledValue]) // eslint-disable-line

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
      SelectBaseComponent
  ====================== */

  const SelectBaseComponent = (
    <SelectBase
      defaultValue={defaultValue}
      disabled={disabled}
      onChange={(value) => {
        setValue(value)
        onChange?.(value)
      }}
      value={controlledValue}
      {...otherProps}
    >
      <SelectTrigger
        id={id}
        className={className}
        disabled={disabled}
        error={error}
        fieldSize={fieldSize}
        onBlur={() => {
          setTimeout(() => {
            // The onBlur should only run when the element that gets
            // focus is outside of the select container.
            // This creates the effect of a group blur.
            // In other words, it prevents blur behavior from occurring
            // when focus switches from the trigger to the menu.
            const selectContainer = selectContainerRef.current
            const selectContent = selectContentRef.current
            const activeElement = document.activeElement

            // The selectContent check is needed because the menu is likely portaled in.
            if (
              (selectContainer && selectContainer.contains(activeElement)) ||
              (selectContent && selectContent.contains(activeElement))
            ) {
              return
            }

            onBlur?.(value)
          }, 0)
        }}
        style={style}
        touched={touched}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent ref={selectContentRef} sideOffset={sideOffset}>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}

          {renderSelectItems()}
        </SelectGroup>
      </SelectContent>
    </SelectBase>
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

  return (
    <div
      id='my-select-container'
      className={groupClassName}
      ref={selectContainerRef}
      style={groupStyle}
    >
      {renderLabel()}

      {typeof renderSelectBase === 'function'
        ? renderSelectBase(SelectBaseComponent)
        : SelectBaseComponent}

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
