'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/utils'

export type PaginationButtonProps = React.ComponentProps<'button'> & {
  onHoverButtonStyle?: React.CSSProperties
  onFocusButtonStyle?: React.CSSProperties
  first?: boolean
  last?: boolean
  next?: boolean
  previous?: boolean
}

/* ========================================================================
                              PaginationButton
======================================================================== */
// first, previous, next and last props should also set the aria labeling.
// See how reactstrap does it...

//# Nice-to-haves:
//# onHoverButtonClassName
//# onHoverItemStyle
//# onHoverItemClassName
//#
//# onFocusButtonClassName
//# onFocusItemStyle
//# onFocusItemClassName

export const PaginationButton = ({
  onHoverButtonStyle = {},
  onFocusButtonStyle = {},
  children,
  disabled = false,

  first = false,
  last = false,
  next = false,
  previous = false,

  className = '',
  style = {},

  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ref,
  ...otherProps
}: PaginationButtonProps) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  ///////////////////////////////////////////////////////////////////////////
  //
  // When style props are passed in for the button, they will necessarily overwrite
  // any class related styles such as .page-link.disabled, .disabled > .page-link { ... }
  //  This can be fixed in one of two ways. Add !important to the associated
  // .disabled / :disabled CSS, or create a disabledStyles object within this component
  // that gets added when disabled prop is true.
  //
  // Currently, PaginationItems are only disabled in first/last previous/next
  // when at the beginning or end of the pagination. However, because of this
  // issue the items don't look disabled.
  //
  ///////////////////////////////////////////////////////////////////////////

  const paginationButtonDisabledStyle: React.CSSProperties = {
    color: '#6c757d',
    pointerEvents: 'none',
    backgroundColor: '#fff',
    // Gotcha: Because border is beind defined with the shorthand property, the
    // same must be done any time styles are passed in using a style object:
    // Console warning: Removing a style property during rerender (border) when a conflicting
    // property is set (borderColor) can lead to styling bugs. To avoid this, don't mix
    // shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.
    border: '1px solid #6c757d' // '#dee2e6'
  }

  style = (function getPaginationButtonStyle() {
    if (disabled) {
      return { ...style, ...paginationButtonDisabledStyle }
    }

    if (isHovering && isFocused) {
      return {
        ...style,
        ...onFocusButtonStyle,
        ...onHoverButtonStyle
      }
    }

    if (isHovering && !isFocused) {
      return { ...style, ...onHoverButtonStyle }
    }

    if (!isHovering && isFocused) {
      return {
        ...style,
        ...onFocusButtonStyle
      }
    }

    return style
  })()

  /* ======================
      renderContent()
  ====================== */

  const renderContent = () => {
    let content = children
    if (first) {
      content = children ? `« ${children}` : '«'
    } else if (last) {
      content = children ? `${children} »` : '»'
    } else if (previous) {
      content = children ? `‹ ${children}` : '‹'
    } else if (next) {
      content = children ? `${children} ›` : '›'
    }
    return content
  }

  /* ======================
          useEffect()
  ====================== */

  useEffect(() => {
    if (disabled) {
      setIsHovering(false)
      setIsFocused(false)
    }
  }, [disabled])

  /* ======================
          return
  ====================== */

  return (
    <button
      {...otherProps}
      className={cn('page-link', className)}
      disabled={disabled}
      onClick={(e) => {
        onClick?.(e)
      }}
      onMouseEnter={(e) => {
        onMouseEnter?.(e)
        setIsHovering(true)
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e)
        setIsHovering(false)
      }}
      onFocus={(e) => {
        onFocus?.(e)
        setIsFocused(true)
      }}
      onBlur={(e) => {
        onBlur?.(e)
        setIsFocused(false)
      }}
      ref={ref}
      style={style}
      type='button'
    >
      {renderContent()}
    </button>
  )
}
