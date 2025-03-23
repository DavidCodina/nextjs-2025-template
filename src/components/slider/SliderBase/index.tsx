'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/utils'

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
  onValueCommit,
  value,
  min = 0,
  max = 100,
  ...otherProps
}: React.ComponentProps<typeof SliderPrimitive.Root>) => {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  /* ======================
          return
  ====================== */

  return (
    <SliderPrimitive.Root
      data-slot='slider'
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(rootBaseClasses, className)}
      onValueCommit={(value) => {
        onValueCommit?.(value)
      }}
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

      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot='slider-thumb'
          key={index}
          className={thumbBaseClasses}
        />
      ))}
    </SliderPrimitive.Root>
  )
}
