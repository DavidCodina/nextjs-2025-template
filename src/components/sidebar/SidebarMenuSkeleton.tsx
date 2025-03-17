'use client'

import * as React from 'react'
import { cn } from '@/utils'
import { Skeleton } from '@/components/skeleton'

/* ========================================================================

======================================================================== */
// The SidebarMenuSkeleton component is used to render a skeleton for a SidebarMenu.
// You can use this to show a loading state when using React Server Components, SWR or react-query.

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      data-slot='sidebar-menu-skeleton'
      data-sidebar='menu-skeleton'
      className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className='size-4 rounded-md'
          data-sidebar='menu-skeleton-icon'
        />
      )}
      <Skeleton
        className='h-4 max-w-(--skeleton-width) flex-1'
        data-sidebar='menu-skeleton-text'
        style={
          {
            '--skeleton-width': width
          } as React.CSSProperties
        }
      />
    </div>
  )
}

export { SidebarMenuSkeleton }
