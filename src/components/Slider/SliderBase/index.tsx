'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/utils'

type SliderBaseProps = Omit<
  React.ComponentProps<typeof SliderPrimitive.Root>,
  'onValueCommit' | 'onBlur' | 'onChange' | 'onValueChange'
> & {
  onChange?: ((value: number[]) => void) | undefined
  onCommit?: ((value: number[]) => void) | undefined
  onBlur?: ((value: number[]) => void) | undefined
}

const rootBaseClasses = `
relative flex w-full items-center
touch-none select-none
data-[disabled]:opacity-50
data-[orientation=vertical]:h-full
data-[orientation=vertical]:min-h-44
data-[orientation=vertical]:w-auto
data-[orientation=vertical]:flex-col
`

const trackBaseClasses = `
bg-accent relative grow overflow-hidden rounded-full
data-[orientation=horizontal]:h-1.5
data-[orientation=horizontal]:w-full
data-[orientation=vertical]:h-full
data-[orientation=vertical]:w-1.5
`

const rangeBaseClasses = `
absolute bg-primary
data-[orientation=horizontal]:h-full
data-[orientation=vertical]:w-full
`

const thumbBaseClasses = `
block size-4 shrink-0
border-primary bg-background-light
rounded-full border shadow
transition-[color,box-shadow]
ring-primary/50 hover:ring-4
focus-visible:ring-4 focus-visible:outline-hidden
disabled:pointer-events-none disabled:opacity-65
`

/* ========================================================================

======================================================================== */

export const SliderBase = ({
  className,
  defaultValue,
  onBlur,
  onChange,
  onCommit,
  ref,
  value: controlledValue,
  min = 0,
  max = 100,
  ...otherProps
}: SliderBaseProps) => {
  /* ======================
      state & refs
  ====================== */

  const [value, setValue] = React.useState(() => {
    if (Array.isArray(controlledValue) && controlledValue.length > 1) {
      return controlledValue
    }

    if (Array.isArray(defaultValue) && defaultValue.length > 1) {
      return defaultValue
    }
    return [min, max]
  })

  const firstRenderRef = React.useRef(true)

  const sliderRef = React.useRef<HTMLSpanElement>(null)

  // const value = React.useMemo(
  //   () =>
  //     Array.isArray(controlledValue)
  //       ? controlledValue
  //       : Array.isArray(defaultValue)
  //         ? defaultValue
  //         : [min, max],
  //   [controlledValue, defaultValue, min, max]
  // )

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
    if (
      typeof controlledValue !== 'undefined' &&
      Array.isArray(controlledValue) &&
      JSON.stringify(controlledValue) !== JSON.stringify(value)
    ) {
      setValue(controlledValue)
    }
  }, [controlledValue]) // eslint-disable-line

  /* ======================
          return
  ====================== */

  return (
    <SliderPrimitive.Root
      className={cn(rootBaseClasses, className)}
      data-slot='slider'
      defaultValue={defaultValue}
      min={min}
      max={max}
      ref={(node) => {
        if (ref && 'current' in ref) {
          ref.current = node
        } else if (typeof ref === 'function') {
          ref?.(node)
        }
        sliderRef.current = node
      }}
      onBlur={() => {
        // Use setTimeout to create a new macrotask.
        setTimeout(() => {
          // The onBlur should only run when the element that gets
          // focus is outside of the slider container.
          // This creates the effect of a group blur.
          // By default, the slider would blur on each thumb.
          const slider = sliderRef.current
          const activeElement = document.activeElement
          if (slider && slider.contains(activeElement)) {
            return
          }
          onBlur?.(value)
        }, 0)
      }}
      onValueCommit={(value) => {
        setValue(value)
        onCommit?.(value)
      }}
      onValueChange={(value) => {
        onChange?.(value)
      }}
      value={controlledValue}
      {...otherProps}
    >
      <SliderPrimitive.Track
        data-slot='slider-track'
        className={cn(trackBaseClasses)}
      >
        <SliderPrimitive.Range
          data-slot='slider-range'
          className={cn(rangeBaseClasses)}
        />
      </SliderPrimitive.Track>

      {Array.from({ length: value.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot='slider-thumb'
          key={index}
          className={thumbBaseClasses}
        />
      ))}
    </SliderPrimitive.Root>
  )
}
