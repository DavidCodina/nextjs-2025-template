'use client'

import * as React from 'react'
import { cn } from '@/utils'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '../sheet'

import { useSidebar } from './SidebarProvider'
import { SIDEBAR_WIDTH_MOBILE } from './SidebarConstants'

type SidebarProps = React.ComponentProps<'div'> & {
  ///////////////////////////////////////////////////////////////////////////
  //
  // This has been removed in favor of `defaultSide` on the SidebarProvider.
  // This allows for the side to be used in configuring tooltip placement in SidebarMenuButton.
  // It can also be used by the SidbarTrigger to determine which icon to use.
  // ❌ side?: 'left' | 'right'
  //
  // This has been removed in favor of `defaultVariant` on the SidebarProvider.
  // The variant is then read within SidebarInset to conditionally render certain styles.
  // This became necessary because the `peer-data-[variant=inset:` modifier within SidebarInset
  // will only work when side="left".
  // ❌ variant?: 'sidebar' | 'floating' | 'inset'
  //
  // This has been removed in favor of `defaultCollapsible` on the SidebarProvider.
  // Additionally, `collapsible` and `setCollapsible` are now exposed through the SidebarProvider.
  // The advantage of moving collapsiblet to the SidebarProvider is that it now becomes immediately
  // available. The disadvantage is that all instances of Sidebar will now share the same collapsible
  // value. Practically, speaking this assumens that Sidebar will only be used ONCE throughout the
  // entire application.
  // ❌ collapsible?: 'offcanvas' | 'icon' | 'none'
  //
  ///////////////////////////////////////////////////////////////////////////
}

/* ========================================================================
                                  Sidebar
======================================================================== */

function Sidebar({
  children,
  className = '',
  style = {},
  ...props
}: SidebarProps) {
  const {
    isMobile,
    state,
    openMobile,
    setOpenMobile,
    collapsible,
    side,
    variant
  } = useSidebar()

  /* ======================
        return 1
  ====================== */
  ///////////////////////////////////////////////////////////////////////////
  //
  // The original ShadCN version of this was as follows:
  //
  // if (collapsible === 'none') {
  //   return (
  //     <div
  //       data-slot='sidebar'
  //       className={cn(
  //         'bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col',
  //         className
  //       )}
  //       style={style}
  //       {...props}
  //     >
  //       {children}
  //     </div>
  //   )
  // }
  //
  // However, it seemed broken. This version is the fixed implementation.
  // Note: collapsible='none' generally seems like a bad idea unless you intend to
  // change it to some other value at some breakpoint (e.g., use isMobile from provider),
  // or you know for a fact that the application is NEVER intended on mobile or tablet resolutions.
  //
  ///////////////////////////////////////////////////////////////////////////

  if (collapsible === 'none') {
    return (
      <div
        className='group text-sidebar-foreground h-dvh w-(--sidebar-width)'
        data-state={state}
        data-variant={variant}
        data-side={side}
      >
        <div
          data-slot='sidebar'
          className={cn(
            'bg-sidebar fixed flex h-dvh w-(--sidebar-width) flex-col group-data-[side=left]:border-r group-data-[side=right]:border-l',
            className
          )}
          style={style}
          {...props}
        >
          {children}
        </div>
      </div>
    )
  }

  /* ======================
        return 2
  ====================== */
  // Added overflow-hidden to prevent SidebarHeader and/or SidebarFooter content from overflowing.
  // When collapsible='icon'. This does not affect tooltips.

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          sheetOverlayClassName=''
          sheetOverlayStyle={{}}
          data-sidebar='sidebar'
          data-slot='sidebar'
          data-mobile='true'
          className={cn(
            'bg-sidebar text-sidebar-foreground w-(--sidebar-width) overflow-hidden p-0 [&>button]:hidden',
            className
          )}
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
              ...style
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className='sr-only'>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className='overlow-hidden flex h-full w-full flex-col'>
            {children}
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  /* ======================
        return 3
  ====================== */

  return (
    <div
      className='group peer text-sidebar-foreground hidden md:block'
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot='sidebar'
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          // This doesn't really make any sense to do here. It's from the original ShadCN
          // implementation, but seems like a mistake. The intention was likely to try to
          // move the element to the right side the container.
          // ❌ 'group-data-[side=right]:rotate-180',

          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
        )}
      />

      <div
        // Added overflow-hidden to prevent SidebarHeader and/or SidebarFooter content from overflowing.
        // When collapsible='icon'. This does not affect tooltips.
        className={cn(
          'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) overflow-hidden transition-[left,right,width] duration-200 ease-linear md:flex',

          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',

          // Adjust the padding for floating and inset variants.
          // Note: AppSidebar has a hardcoded const floatingOffset = '16px'
          // This corresponds to the current 'p-2' value below. If you change
          // the padding here, you will likely need to change the floatingOffset in AppSidebar.

          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className
        )}
        style={style}
        {...props}
      >
        <div
          data-sidebar='sidebar'
          // Added group-data-[variant=floating]:overflow-hidden to prevent SidebarHeader and/or
          // SidebarFooter content from overflowing when collapsible='icon'. This does not affect tooltips.

          className={`bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:overflow-hidden group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export { Sidebar }
