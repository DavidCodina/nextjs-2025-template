'use client'

import * as React from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/utils'
import { useCarousel } from './CarouselContext'

type CarouselNextProps = React.ComponentProps<'button'> & {
  size?: number
}

const baseClasses = `
absolute flex items-center justify-center bg-white text-black
rounded-full border border-black cursor-pointer
`

/* ========================================================================
                        
======================================================================== */

export const CarouselNext = ({
  className = '',
  size = 24,
  style = {},
  ...props
}: CarouselNextProps) => {
  const { orientation, next, canScrollNext } = useCarousel()

  /* ======================
            return
    ====================== */

  return (
    <button
      className={cn(
        baseClasses,
        orientation === 'horizontal'
          ? 'top-1/2 right-2 -translate-y-1/2'
          : 'bottom-2 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      data-slot='carousel-next'
      disabled={!canScrollNext}
      onClick={next}
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
          d='M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8'
        />
      </svg> */}

      <ArrowRight style={{ width: size, height: size }} />

      <span className='sr-only'>Next slide</span>
    </button>
  )
}
