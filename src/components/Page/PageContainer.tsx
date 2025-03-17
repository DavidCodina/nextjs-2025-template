'use client'

import { ComponentProps } from 'react'

import { cn } from '@/utils'

type ContainerProps = ComponentProps<'div'>

/* ========================================================================
                              PageContainer
======================================================================== */

export const PageContainer = ({
  children,
  className,
  style,
  ...otherProps
}: ContainerProps) => {
  return (
    <div
      className={cn(
        `relative mx-auto w-full flex-1 p-6 2xl:container`,
        className
      )}
      style={style}
      {...otherProps}
    >
      {children}
    </div>
  )
}
