'use client'

import * as React from 'react'
import { cn } from '@/utils'

/* ========================================================================

======================================================================== */
// The SidebarMenuSub component is used to render a submenu within a SidebarMenu.
// Use <SidebarMenuSubItem /> and <SidebarMenuSubButton /> to render a submenu item.

function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot='sidebar-menu-sub'
      data-sidebar='menu-sub'
      className={cn(
        'border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  )
}

export { SidebarMenuSub }
