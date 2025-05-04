'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '@/utils'

type ModalOverlayProps = React.ComponentProps<typeof Dialog.Overlay>

/* ========================================================================

======================================================================== */

export const ModalOverlay = ({
  className = '',
  style = {},
  children,
  ...otherProps
}: ModalOverlayProps) => {
  return (
    <Dialog.Overlay
      className={cn('radix-modal-overlay', className)}
      data-slot='modal-overlay'
      style={style}
      {...otherProps}
    >
      {children}
    </Dialog.Overlay>
  )
}
