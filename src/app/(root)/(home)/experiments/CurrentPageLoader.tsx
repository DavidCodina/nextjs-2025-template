'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Spinner } from '@/components'

/* ========================================================================

======================================================================== */
//! Watch out when you install this at the level of the layout. The behavior may change.
//! Obviously, this won't work if you manually enter the URL, whereas loading.tsx will.

//# Switch to using data-href, so we can include elements that use programmatic navigation.
//# In fact, we may only want to use data-href to avoid inadvertantly opting in.

///////////////////////////////////////////////////////////////////////////
//
// ⚠️ Whatever level you apply this at, it assumes that you're not already using a loading.tsx.
//
// Usage:
//
//   <Page>
//     <CurrentPageLoader />
//     <PageContainer>
//       <div className='flex justify-center gap-4'>
//         <Button className='' asChild size='sm'><Link href='/'>Go Home <Navigation /></Link></Button>
//         <Button className='' asChild size='sm'><Link href='/about'>Go To About <Navigation /></Link></Button>
//       </div>
//     </PageContainer>
//   </Page>
//
///////////////////////////////////////////////////////////////////////////

export const CurrentPageLoader = () => {
  // pathname will omit the query params and hash part.
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)
  const [previousPath, setPreviousPath] = useState('')
  const isNavigatingRef = useRef(false)
  const toRef = useRef('')

  /* ======================
        useEffect()
  ====================== */

  useEffect(() => {
    if (previousPath !== '' && previousPath !== pathname) {
      isNavigatingRef.current = false
      toRef.current = ''
      setIsNavigating(false)
    }

    setPreviousPath(pathname)
  }, [pathname, previousPath])

  /* ======================
         useEffect()
  ====================== */

  useEffect(() => {
    // console.log('useEffect ran...')

    const handleClick = (e: MouseEvent) => {
      const target = e.target

      ///////////////////////////////////////////////////////////////////////////
      //
      // Normally, it's preferable to use currentTarget over target.
      // However, in this case currentTarget will always be document.
      //
      // Unfortunately, target itself can be obscured if, for example, there's
      // an <svg> in the element and it doesn't have pointer-events-none.
      // Consequently, we use e.target.closest('a'), which checks the current
      // element and its ancestors. Ultimately, we will switch to checking
      // for something like data-href.
      //
      // Gotcha: Don't use !(target instanceof HTMLElement). <svg> is an instance
      // of SVGSVGElement. <polygon> is an instanceof SVGPolygonElement, etc.
      //
      ///////////////////////////////////////////////////////////////////////////
      if (!target || !(target instanceof Element)) {
        return
      }

      const element = target.closest('a')
      if (!element) {
        return
      }

      //! Also possibly !element.download, !e.metaKey, !e.ctrlKey, and !e.shiftKey (?).
      if (element.target === '_blank') {
        return
      }

      const hasHref =
        element.hasAttribute('href') &&
        typeof element.getAttribute('href') === 'string'
          ? true
          : false

      if (!hasHref) {
        return
      }

      const href = element.getAttribute('href') as string
      const hrefStartsWithSlash = href.startsWith('/')

      if (!hrefStartsWithSlash) {
        return
      }

      // Return early if you're already on that page.
      if (isNavigatingRef.current === false && href === pathname) {
        // console.log('Already on that page.')
        return
      }

      // Return early if you're already going to that page.
      if (
        isNavigatingRef.current === true &&
        element.getAttribute('href') === toRef.current
      ) {
        // console.log('Already going to that page.')
        return
      }

      // Cancel Spinner when an href to current page is clicked.
      if (isNavigatingRef.current === true && href === pathname) {
        //console.log('Cancelling Spinner...')
        isNavigatingRef.current = false
        setIsNavigating(false)
        return
      }

      isNavigatingRef.current = true
      toRef.current = element.getAttribute('href') || ''
      setIsNavigating(true)
    }

    // ⚠️ Will this also work on mobile presses with presses?
    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [pathname])

  /* ======================
          return
  ====================== */

  if (!isNavigating) {
    return null
  }

  return (
    <div
      // ⚠️ pointer-events-none allows the page to still be clickable.
      // However, certain things like alert() will block the transition.
      // Ultimately, we may choose to remove pointer-events-none.
      className='pointer-events-none absolute inset-0 z-51 flex items-center justify-center bg-black/10'
    >
      <Spinner />
    </div>
  )
}
