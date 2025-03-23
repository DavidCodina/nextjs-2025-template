'use client'

import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/utils'
import { buttonVariants } from './buttonVariants'

///////////////////////////////////////////////////////////////////////////
//
// Gotcha: The original ShadCN implementation implemented Slot for the
// asChild feature. However, the Radix Slot has trade-offs. If the child
// content is more than just {children}, then you'll get an error when
// using asChild. For example:
//
//   <Button asChild className='mx-auto flex' variant='success' size='sm'>
//     <span>Click Me</span>
//   </Button>
//
// ❌ Error: React.Children.only expected to receive a single React element child.
//
// Thus whenever possible, prefer an actual polymorphic implementation.
// Here's the basic setup:
//
//   type ButtonOwnProps<T extends ElementType = ElementType> = { as?: T }
//
//   type ButtonProps<T extends ElementType> = ButtonOwnProps<T> &
//     Omit<ComponentProps<T>, keyof ButtonOwnProps<T>>
//
//   const defaultElement = 'button'
//
//   export const PolymorphicButton = < T extends ElementType = typeof defaultElement >({ as, children, ...otherProps}: ButtonProps<T>) => {
//     const Component = as || defaultElement
//     return <Component {...otherProps}>{children}</Component>
//   }
//
// Polymorphic Usage:
//
//   <Button
//     as='a'
//     href='https://www.google.com'
//     rel='noopener noreferrer'
//     size='sm'
//     target='_blank'
//    variant='success'
//   > Click Me</Button>
//
// See here for more info:
//
//   https://stevekinney.github.io/react-and-typescript/polymorphic-components
//   https://fem-react-typescript.vercel.app/Polymorphic%20components.md
//
///////////////////////////////////////////////////////////////////////////

type ButtonOwnProps<T extends React.ElementType = React.ElementType> = {
  as?: T
  loading?: boolean
  isIcon?: boolean
} & VariantProps<typeof buttonVariants>

type ButtonProps<T extends React.ElementType> = ButtonOwnProps<T> &
  Omit<React.ComponentProps<T>, keyof ButtonOwnProps<T>>

const defaultElement = 'button'

/* ========================================================================
                                    Button
======================================================================== */
//# Restructure the internal children of Button.
//# There should be a left side and right side.

const Button = <T extends React.ElementType = typeof defaultElement>({
  as,
  children,
  className = '',
  disabled = false,
  isIcon = false,
  loading = false,
  size,
  style = {},
  variant,
  ...otherProps
}: ButtonProps<T>) => {
  const Component = as || defaultElement

  /* ======================
          return
  ====================== */

  return (
    <Component
      {...otherProps}
      disabled={disabled || loading}
      data-slot='button'
      className={cn(
        buttonVariants({ variant, size }),
        {
          'p-1 [&_svg]:size-full': isIcon
        },
        className
      )}
      style={style}
    >
      {loading && <Loader2 className='animate-spin' />}
      {children}
    </Component>
  )
}

export { Button, buttonVariants }
