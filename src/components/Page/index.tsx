'use client'

import { ComponentProps } from 'react'
import { cn } from '@/utils'
import { PageContainer } from './PageContainer'

type PageProps = ComponentProps<'main'>

/* ========================================================================
                                  Page
======================================================================== */

const Page = ({ children, className, style, ...otherProps }: PageProps) => {
  /* ======================
          return
  ====================== */

  return (
    <>
      <main
        ///////////////////////////////////////////////////////////////////////////
        //
        // Added overflow-x-auto so when AppSidebar has collapsible='none' such that when
        // the main content is squished does not push the sidebar off the right of the viewport.
        //
        // ⚠️ Normally, this would also be added: min-h-screen. However, using just flex-1 here
        // works because both SidebarProvider (flex min-h-svh) and SidebarInset (flex flex-1)
        // manage to set the height to at least 100% of the viewport height. In fact, if we
        // were to set min-h-screen here, it would be too much height for the Sidebar component's
        // inset variant.
        //
        ///////////////////////////////////////////////////////////////////////////
        className={cn(
          `relative mx-auto flex w-full flex-1 flex-wrap overflow-x-auto`,
          className
        )}
        style={{
          ...style
        }}
        {...otherProps}
      >
        {children}
      </main>
    </>
  )
}

export { Page, PageContainer }
