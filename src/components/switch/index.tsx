'use client'

import * as React from 'react'
import { SwitchBase } from './SwitchBase'
import { Label } from '../label'
import { FormText } from '../FormText'
import { FormError } from '../FormError'
import { cn } from '@/utils'
import { FIELD_VALID_MIXIN, FIELD_INVALID_MIXIN } from '../component-constants'

type LabelChildren = React.ComponentProps<typeof Label>['children']

type SwitchProps = React.ComponentProps<typeof SwitchBase> & {
  error?: string
  errorClassName?: string
  errorStyle?: React.CSSProperties
  groupClassName?: string
  groupStyle?: React.CSSProperties
  labelText?: LabelChildren
  labelOnText?: LabelChildren
  labelOffText?: LabelChildren
  labelClassName?: string
  labelRequired?: boolean
  labelStyle?: React.CSSProperties
  renderSwitchBaseOnly?: boolean
  text?: string
  textClassName?: string
  textStyle?: React.CSSProperties
  touched?: boolean
}

/* ===================================d=====================================

======================================================================== */

export const Switch = ({
  checked: controlledChecked,
  className = '',
  defaultChecked,
  disabled = false,
  error = '',
  errorClassName = '',
  errorStyle = {},
  groupClassName = '',
  groupStyle = {},
  id = '',
  labelText = '',
  labelOnText = '',
  labelOffText = '',
  labelClassName = '',
  labelRequired = false,
  labelStyle = {},
  onCheckedChange,
  renderSwitchBaseOnly = false,
  text = '',
  textClassName = '',
  textStyle = {},
  touched = false,
  ...otherProps
}: SwitchProps) => {
  // If id is not set, then fallback to using React's useId() hook.
  const uuid = React.useId()
  id = id || uuid

  /* ======================
        state & refs
  ====================== */

  // The checked state is used internally to manage the display onText/offText.
  // checked state must be updated when onCheckedChange() is called and when
  // controlledChecked changes.
  const [checked, setChecked] = React.useState(() => {
    if (typeof controlledChecked === 'boolean') {
      return controlledChecked
    }
    if (typeof defaultChecked === 'boolean') {
      return defaultChecked
    }
    return false
  })

  const firstRenderRef = React.useRef(true)

  /* ======================

  ====================== */

  const maybeValidationMixin = error
    ? FIELD_INVALID_MIXIN
    : touched && !error
      ? FIELD_VALID_MIXIN
      : ''

  const SwitchBaseComponent = (
    <SwitchBase
      id={id}
      checked={controlledChecked}
      className={cn(maybeValidationMixin, className)}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onCheckedChange={(checked) => {
        setChecked(checked)
        onCheckedChange?.(checked)
      }}
      {...otherProps}
    />
  )

  /* ======================
        useEffect()
  ====================== */

  React.useEffect(() => {
    if (firstRenderRef.current === true) {
      firstRenderRef.current = false
      return
    }

    if (
      typeof controlledChecked === 'boolean' &&
      controlledChecked !== checked
    ) {
      setChecked(controlledChecked)
    }

    // Omit checked from the dependency array.
  }, [controlledChecked]) // eslint-disable-line

  /* ======================
        renderLabel()
  ====================== */

  const renderLabel = () => {
    const onText = labelOnText || labelText
    const offText = labelOffText || labelText

    if (!onText || !offText) {
      return null
    }

    return (
      <Label
        className={cn('text-xs', labelClassName)}
        disabled={disabled}
        error={error}
        htmlFor={id}
        labelRequired={labelRequired}
        style={labelStyle}
        touched={touched}
      >
        {checked ? onText : offText}
      </Label>
    )
  }

  /* ======================
          return
  ====================== */

  if (renderSwitchBaseOnly) {
    return SwitchBaseComponent
  }

  return (
    <div className={cn('', groupClassName)} style={groupStyle}>
      <div className='flex items-center gap-2'>
        {SwitchBaseComponent}
        {renderLabel()}
      </div>

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
