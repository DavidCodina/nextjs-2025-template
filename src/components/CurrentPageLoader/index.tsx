'use client'
import { useEffect } from 'react'
import { useAppContextSelector } from 'contexts'
import { Spinner } from '@/components'
import { cn } from '@/utils'

export type CurrentPageLoaderProps = React.ComponentProps<'div'>

const baseClasses = `
flex items-center justify-center
absolute inset-0 pointer-events-none
bg-black/10
z-51
`
/* ========================================================================

======================================================================== */
// https://github.com/vercel/next.js/discussions/52568
// https://github.com/vercel/next.js/discussions/41934

///////////////////////////////////////////////////////////////////////////
//
// This component works in conjunction with the following AppContext logic:
//
//   const router = useRouter()
//   const [_routePending, startRouteTransition] = useTransition()
//   const [routePending, setRoutePending] = useState(false)
//   const handleRouteChange = useCallback((route: string) => { startRouteTransition(() => { router.push(route) }) }, [router])
//
//   // Defer the routePending state for an additional 250ms. This generally
//   // prevents the loading spinner flicker when the page loads immediately.
//
//   useEffect(() => {
//     let routPendingTimeout: NodeJS.Timeout
//     if (_routePending === true) {
//       routPendingTimeout = setTimeout(() => { setRoutePending(_routePending) }, 250)
//     } else {
//       setRoutePending(_routePending)
//     }
//     return () => { clearTimeout(routPendingTimeout) }
//   }, [_routePending])
//
/////////////////////////
//
// Usage:
//
//   <Button asChild size='sm'>
//     <Link href='/about'>Go To About <Navigation /></Link>
//   </Button>
//
//   <Button size='sm' data-href='/about'>
//     Go To About with data-href='/about' <Navigation />
//   </Button>
//
// In both cases, the navigating components can be implemented directly within
// a server component. The Button implementation works because we're not actually
// passing an onClick handler to it. Instead, handleClick is added to document when
// CurrentPageLoader client component mounts.
//
// Thast said, if the CurrentPageLoader is not implemented then the first instance will
// still work, but the second instance will not.
//
// This component is best implemented within the <Page /> component definition.
// That way, it will only fill up the space inside of the Page itself - i.e.,
// it will respect the presence of a Sidebar.
//
///////////////////////////////////////////////////////////////////////////

export const CurrentPageLoader = ({
  className = '',
  ...otherProps
}: CurrentPageLoaderProps) => {
  const routePending = useAppContextSelector('routePending')
  const handleRouteChange = useAppContextSelector('handleRouteChange')

  /* ======================
        useEffect()
  ====================== */

  useEffect(() => {
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
      // element and its ancestors.
      //
      // Gotcha: Don't use !(target instanceof HTMLElement). <svg> is an instance
      // of SVGSVGElement. <polygon> is an instanceof SVGPolygonElement, etc.
      //
      ///////////////////////////////////////////////////////////////////////////
      if (!target || !(target instanceof Element)) {
        return
      }

      const element = target.closest('[data-href]') || target.closest('a')
      if (!element || !(element instanceof HTMLElement)) {
        return
      }

      if (
        element instanceof HTMLAnchorElement &&
        (element.target === '_blank' || element.hasAttribute('download'))
      ) {
        return
      }

      const hasHref =
        (element?.hasAttribute('data-href') &&
          typeof element.getAttribute('data-href') === 'string') ||
        (element.hasAttribute('href') &&
          typeof element.getAttribute('href') === 'string')

      if (!hasHref) {
        return
      }

      const href =
        element.getAttribute('data-href') || element.getAttribute('href') || ''

      const hrefStartsWithSlash = href.startsWith('/')

      if (!hrefStartsWithSlash) {
        return
      }

      e.preventDefault()
      handleRouteChange(href)
    }

    document.addEventListener('click', handleClick)
    return () => {
      // console.log('Removing event listener...')
      document.removeEventListener('click', handleClick)
    }
  }, [handleRouteChange])

  if (!routePending) {
    return null
  }

  /* ======================
          return
  ====================== */

  return (
    <div
      aria-label='Loading'
      {...otherProps}
      // ⚠️ pointer-events-none allows the page to still be clickable.
      // However, certain things like alert() will block the transition.
      // Ultimately, we may choose to remove pointer-events-none.
      className={cn(baseClasses, className)}
      data-slot='current-page-loader'
    >
      <Spinner />
    </div>
  )
}
