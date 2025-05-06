'use client'

import * as React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from '@/utils'

import { CarouselContext } from './CarouselContext'
import { CarouselApi, CarouselOptions, CarouselPlugin } from './types'

export type CarouselProps = React.ComponentProps<'div'> & {
  options?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

/* ========================================================================
                        
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
//   - I'm not loving Embla Carousel's easing, and there doesn't seem to be a way to change it.
//
//   - I do like how <CarouselPrevious /> & <CarouselNext /> are actually components
//     that we add to the instance, rather than options that we pass in. This leads
//     to more work on the consuming side, but also more flexibility.
//
//   - It would be nice to have a customNext and customPrevious prop that for CarouselPrevious,
//     and CarouselNext, respectively. I've skipped that for now.
//
//   - Also could include and auto feature.
//
//   - There's also a way to make Embla Carousel have a gallery.
//
///////////////////////////////////////////////////////////////////////////

//# Test ref of Carousel. It should be the div.
//# Review Embla docs.
//# Review CarouselVerticalDemo
//# Review the entire carousel indicators feature.
//# See if there's a way to change the easing.

export const Carousel = ({
  orientation = 'horizontal',
  options,
  setApi,
  plugins,
  style = {},
  className = '',
  children,
  ...props
}: CarouselProps) => {
  /* ======================
            state
    ====================== */

  const [carouselRef, api] = useEmblaCarousel(
    {
      ...options,
      axis: orientation === 'horizontal' ? 'x' : 'y'
    },
    plugins
  )

  // Passed into CarouselContext.Provider then consumed by CarouselPrevious: disabled={!canScrollPrev}
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  // Passed into CarouselContext.Provider then consumed by CarouselNext: disabled={!canScrollNext}
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  //* Added...
  // In the examples, I've seen thus far, api?.scrollSnapList() can be used to
  // deduce how many slides there are, which can then be used to map out the indicators.
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  //* Added...
  // Set selectedIndex within onSelect to be consumed by Indicator component
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  /* ======================
          onSelect()
  ====================== */
  // Consumed in useEffect() below when api (i.e., useEmblaCarousel api) changes.
  // In particular, it sets canScrollPrev and canScrollNext state.

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) {
      return
    }

    //* Added - for Indicator feature/component
    // Set selectedIndex to be consumed by Indicator component.
    setSelectedIndex(api.selectedScrollSnap())

    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  /* ======================
          prev
  ====================== */
  // Used in handleKeyDown()
  // Also passed into the CarouselContext.Provider then consumed by CarouselPrevious.

  const prev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  /* ======================
          next
  ====================== */
  // Used in handleKeyDown()
  // Also passed into the CarouselContext.Provider  then consumed by CarouselNext.

  const next = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  /* ======================
          scrollTo
  ====================== */
  //* Added this...

  // https://codesandbox.io/p/sandbox/embla-carousel-arrows-dots-react-z5fbs?file=%2Fsrc%2Fjs%2FEmblaCarousel.js%3A16%2C3-18%2C6
  const scrollTo = React.useCallback(
    (index: number) => {
      // The 2nd arg is jump. However, rather than scrolling from 1 to 3
      // instead of merely skipping 2, what it actually does is replace
      // 1 with 3, completely bypassing the scroll animation. :(
      api?.scrollTo(index)
    },
    [api]
  )

  /* ======================
        handleKeyDown()
  ====================== */

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        next()
      }
    },
    [next, prev]
  )

  /* ======================
        useEffect()
  ====================== */
  // This may be for a controlled implementation.

  React.useEffect(() => {
    if (!api || !setApi) {
      return
    }
    setApi(api)
  }, [api, setApi])

  /* ======================
          useEffect()
  ====================== */

  React.useEffect(() => {
    if (!api) {
      return
    }

    onSelect(api)
    // Presumably api.on() automatically passes an instance of api as an arg (???).
    api.on('reInit', onSelect)
    api.on('select', onSelect)

    return () => {
      api?.off('select', onSelect)
    }
  }, [api, onSelect])

  /* ======================
         useEffect() 
  ====================== */
  //* Added this...

  // This useEffect() sets the scrollSnaps state, which is used to
  // determine how many slides there are when mapping out the
  // associated indicator.

  React.useEffect(() => {
    if (!api) {
      return
    }

    // console.log('Setting scrollSnaps to:', api?.scrollSnapList())
    setScrollSnaps(api?.scrollSnapList())
  }, [setScrollSnaps, api])

  /* ======================
            return
  ====================== */

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        options,
        orientation:
          orientation || (options?.axis === 'y' ? 'vertical' : 'horizontal'),
        prev,
        next,
        scrollTo, //* Added
        canScrollPrev,
        canScrollNext,
        selectedIndex, //* Added
        scrollSnaps //* Added
        // plugins: [] // optional
        // setApi: (_api) => {} // optional
      }}
    >
      <div
        aria-roledescription='carousel'
        className={cn('relative', className)}
        data-slot='carousel'
        onKeyDownCapture={handleKeyDown}
        role='region'
        style={style}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}
