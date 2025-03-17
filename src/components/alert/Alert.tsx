'use client'

import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'
import { AlertTitle } from './AlertTitle'
import { AlertDescription } from './AlertDescription'
import { alertVariants } from './alertVariants'

type AlertProps = React.ComponentProps<'div'> &
  VariantProps<typeof alertVariants>

/* ========================================================================

======================================================================== */

const Alert = ({
  children,
  className = '',
  style = {},
  variant,
  ...otherProps
}: AlertProps) => {
  /* ======================
          return
  ====================== */

  return (
    <div
      {...otherProps}
      data-slot='alert'
      role='alert'
      className={cn(alertVariants({ variant }), className)}
      style={style}
    >
      {children}
    </div>
  )
}

export { Alert, AlertTitle, AlertDescription }
