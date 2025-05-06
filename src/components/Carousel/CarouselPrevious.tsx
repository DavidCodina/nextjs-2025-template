'use client'

import * as React from 'react'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/utils'
import { useCarousel } from './CarouselContext'

type CarouselPreviousProps = React.ComponentProps<'button'> & {
  size?: number
}

const baseClasses = `
absolute items-center justify-center bg-white text-black
rounded-full border border-black cursor-pointer
`

/* ========================================================================
                        
======================================================================== */

export const CarouselPrevious = ({
  className = '',
  size = 24,
  style = {},
  ...props
}: CarouselPreviousProps) => {
  const { orientation, prev, canScrollPrev } = useCarousel()

  /* ======================
          return
  ====================== */

  return (
    <button
      className={cn(
        baseClasses,
        orientation === 'horizontal'
          ? 'top-1/2 left-2 -translate-y-1/2'
          : 'top-2 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      data-slot='carousel-previous'
      disabled={!canScrollPrev}
      onClick={prev}
      style={style}
      type='button'
      {...props}
    >
      {/* <svg
        fill='currentColor'
        style={{ width: size, height: size }}
        viewBox='0 0 16 16'
      >
        <path
          fillRule='evenodd'
          d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5'
        />
      </svg> */}

      <ArrowLeft style={{ width: size, height: size }} />

      <span className='sr-only'>Previous slide</span>
    </button>
  )
}
