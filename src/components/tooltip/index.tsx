'use client'

import { useState, useRef } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { TooltipProps } from './types'
import { TooltipContent } from './TooltipContent'
import { TooltipProvider } from './TooltipProvider'
import { TooltipTrigger } from './TooltipTrigger'

/* ========================================================================
                                ToolTip
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// https://www.radix-ui.com/primitives/docs/components/tooltip
// A popup that displays information related to an element when
// the element receives keyboard focus or the mouse hovers over it.
//
//   Tab    : Opens/closes the tooltip without delay.
//   Space  : If open, closes the tooltip without delay.
//   Enter  : If open, closes the tooltip without delay.
//   Escape : If open, closes the tooltip without delay.
//
// The Tooltip can be kept open using toggleForceMount. Getting this to behave correctly
// was very tricky. It entails using e.preventDefault() onClick AND onMouseDown, e.preventDefault()
// within onPointerDownOutside() AND toggling forceMount from within the trigger click handler.
// The following are some articles on the topic, but neither of them actually came up with a
// satisfactory solution.
//
//   https://github.com/radix-ui/primitives/issues/2029
//   "Tooltips generally should close on activation (be it pointer or keyboard)
//   so we use onClick for that."
//
//   https://github.com/radix-ui/primitives/issues/1077
//
//
// See here for more info on Tooltips vs Popovers:
//
//   https://ux.stackexchange.com/questions/88844/when-should-i-use-a-popover-vs-a-tooltip
//
// I also learned a lot from the discussion of why the tooltip intentionally doesn't work
// on mobile/tablets:
//
//   https://github.com/radix-ui/primitives/issues/1573
//   https://github.com/radix-ui/primitives/issues/955#issuecomment-960610209
//
///////////////////////////////////////////////////////////////////////////

const Tooltip = ({
  arrow = true,
  arrowClassName = '',
  arrowStyle = {},

  children,
  closeOnClick = true,
  contentClassName = '',
  contentStyle = {},

  defaultOpen = false,
  delayDuration = 0, // 700 is the Radix default, but this is too long.
  skipDelayDuration = 300,
  side = 'top',
  sideOffset = 10,

  toggleForceMount = false, // i.e. like tooltip + popover.
  trigger,
  ...otherProps
}: TooltipProps) => {
  const [forceMount, setForceMount] = useState<true | undefined>()
  const triggerRef = useRef<any>(null)
  closeOnClick = toggleForceMount ? false : closeOnClick

  /* ======================
      handleForceMount()
  ====================== */

  const handleForceMount = () => {
    if (!toggleForceMount) {
      return
    }
    if (!forceMount) {
      setForceMount(true)
      return
    }

    setForceMount(undefined)
  }

  /* ======================
          return
  ====================== */

  return (
    <TooltipProvider
      // The duration from when the mouse enters a tooltip trigger until the tooltip opens.
      delayDuration={delayDuration}
      // How much time a user has to enter another trigger without incurring a delay again.
      skipDelayDuration={skipDelayDuration}
    >
      <TooltipPrimitive.Root
        data-slot='tooltip'
        defaultOpen={defaultOpen}
        {...otherProps} // i.e., open, onOpenChange, disableHoverableContent
      >
        <TooltipTrigger
          asChild
          ref={triggerRef}
          onClick={(e) => {
            // Gotcha: Must be done here AND e.preventDefault() inside onPointerDownOutside().
            // Plus you also NEED onMouseDown={(e) => { e.preventDefault() }
            if (closeOnClick === false) {
              e.preventDefault()
            }
            handleForceMount()
          }}
          onMouseDown={(e) => {
            if (closeOnClick === false) {
              e.preventDefault()
            }
          }}
        >
          {trigger}
        </TooltipTrigger>

        <TooltipContent
          arrow={arrow}
          arrowClassName={arrowClassName}
          arrowStyle={arrowStyle}
          forceMount={forceMount}
          side={side}
          sideOffset={sideOffset}
          onPointerDownOutside={(e) => {
            if (triggerRef.current?.contains(e.target)) {
              e.preventDefault()
            }
          }}
          className={contentClassName}
          style={contentStyle}
        >
          {children}
        </TooltipContent>
      </TooltipPrimitive.Root>
    </TooltipProvider>
  )
}

export { Tooltip }
