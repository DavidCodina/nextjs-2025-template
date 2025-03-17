'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/utils'
import { buttonVariants } from './buttonVariants'

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
    isIcon?: boolean
  }

/* ========================================================================
                                    Button
======================================================================== */

const Button = ({
  asChild = false,
  children,
  className = '',
  disabled = false,
  isIcon = false,
  loading = false,
  size,
  style = {},
  variant,
  ...otherProps
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button'

  /* ======================
          return
  ====================== */

  return (
    <Comp
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
    </Comp>
  )
}

export { Button, buttonVariants }
