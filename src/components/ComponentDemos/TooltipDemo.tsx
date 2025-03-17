'use client'

import { Button } from '@/components/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/tooltip'

/* ========================================================================

======================================================================== */

export const TooltipDemo = () => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className='mx-auto mb-6 flex' asChild>
            <Button variant='primary' size='sm'>
              Hover Me
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <p className='mx-auto max-w-[400px] text-center text-sm'>
        The <code className='text-pink-500'>Tooltip</code> component needs to be
        updated such that it has several color and style variants to choose
        from.
      </p>
    </>
  )
}
