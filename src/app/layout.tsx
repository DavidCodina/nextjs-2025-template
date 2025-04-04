import '../styles/globals.css'

import { CSSProperties } from 'react'
import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Providers } from 'contexts'
import { Toaster } from '@/components/sonner'

import {
  SidebarTrigger,
  SidebarProvider,
  SidebarFlipper,
  SidebarInset
} from 'components/sidebar'
import { AppSidebar } from 'components/AppSidebar'

/* ======================
        fonts
====================== */

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

/* ======================
        metadata
====================== */

export const metadata: Metadata = {
  title: 'Demo',
  description: 'Demo Next.js App'
}

/* ========================================================================
                                RootLayout
======================================================================== */

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  /* ======================
          return
  ====================== */
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${poppins.className} flex w-full flex-1 flex-col antialiased`}
        style={{
          // Maybe switch to dvh units.
          minHeight: '100vh',
          width: '100%'
        }}
      >
        <Providers>
          {/* The SidebarProvider is consumed here and not with the other providers in order
          to implement the optional 'persisted State' feature with cookies. */}
          <SidebarProvider
            defaultSide='left'
            defaultCollapsible='icon'
            // defaultVariant='inset'
            forceMobile={false}
            // For multiple sidebars in your application, you can use the style prop to set
            // the width of the sidebar. To set the width of the sidebar, you can use
            // the --sidebar-width and --sidebar-width-mobile CSS variables in the style prop.
            // The values must be of type string. They will have precedence over the SIDEBAR_WIDTH
            //  and SIDEBAR_WIDTH_MOBILE constants set in the component files.
            style={
              {
                // '--sidebar-width': '20rem',
                // '--sidebar-width-mobile': '20rem'
              } as CSSProperties
            }
            defaultOpen={defaultOpen}
            // Gotcha: The presence of this prop assumes it's a controlled component
            // being used in conjunction with the `open` prop. Consequently, the normal
            // behavior of the SidebarTrigger will not work. Moreover, if you want to
            // implement a controlled implementation, then the provider must me moved into
            // a client component.
            // onOpenChange={(open) => { }}
          >
            <SidebarFlipper
              AppSidebar={AppSidebar}
              SidebarTrigger={SidebarTrigger}
            >
              <SidebarInset
                // SidebarInset checks the value of variant internally and only applies className and style
                // when variant === 'inset'.
                className='md:border-primary md:max-h-[calc(100vh_-_16px)] md:overflow-y-auto md:border'
                style={{}}
              >
                {children}
              </SidebarInset>
            </SidebarFlipper>
          </SidebarProvider>
          {/* Make sure <Toaster /> is inside of <Providers>, so it has access to the theme. */}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
