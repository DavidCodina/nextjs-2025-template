import { CSSProperties, JSX } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

export type TooltipProps = React.ComponentProps<
  typeof TooltipPrimitive.Root
> & {
  trigger: JSX.Element
  contentClassName?: string
  contentStyle?: CSSProperties

  arrow?: boolean
  arrowClassName?: string
  arrowStyle?: CSSProperties

  /** The preferred side the popup should render on (if possible). */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** The amount of offset beween popup and trigger element. */
  sideOffset?: number

  closeOnClick?: boolean
  toggleForceMount?: boolean

  /** The duration from when the pointer enters the trigger until the tooltip gets opened. */
  skipDelayDuration?: number

  // Intentionally omitting align. It's too much complexity for the current use case.
  // If side is 'top' or 'bottom', then 'end' will push content to the left such
  // that the right edge of Content and Trigger are aligned. If side is 'left' or
  // 'right', then 'end' means the bottom of the Trigger. With the current arrow style
  // anything but 'center' would make the arrow look a little wonky.
  // align?: 'start' | 'center' | 'end'

  // Intentionally omitting alignOffset.
  // alignOffset allows for more fine-grained control of how the Content is alinged against Trigger
  // For example, with the current arrow styles we would need at least alignOffset={-1} if align
  // were 'start' or 'end'. But actually, a better solution is to use something like arrowPadding={12}
  // alignOffset?: number

  // Intentionally omitting arrowPadding.
}
