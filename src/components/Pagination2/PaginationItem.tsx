'use client'

import { cn } from '@/utils'
import { PaginationButton, PaginationButtonProps } from './PaginationButton'

export type PaginationItemProps = PaginationButtonProps & {
  active?: boolean
  paginationButtonClassName?: string
  paginationButtonStyle?: React.CSSProperties
}

/* ========================================================================
                              PaginationItem
======================================================================== */

export const PaginationItem = ({
  active = false,
  className = '',
  disabled = false,
  paginationButtonClassName = '',
  paginationButtonStyle = {},
  style = {},
  ...otherButtonProps
}: PaginationItemProps) => {
  /* ======================
          return
  ====================== */

  return (
    <li
      className={cn(
        'page-item',
        className,
        active && 'active',
        disabled && 'disabled'
      )}
      style={style}
    >
      <PaginationButton
        // children, first, last, previous, next, onClick, onHoverButtonStyle, onFocusButtonStyle
        // onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, ref, etc.
        {...otherButtonProps}
        disabled={disabled}
        className={paginationButtonClassName}
        style={paginationButtonStyle}
      />
    </li>
  )
}
