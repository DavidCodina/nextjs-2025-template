'use client'

import { Button } from '@/components/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover'

/* ========================================================================

======================================================================== */

export const PopoverDemo = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className='mx-auto flex' variant='primary' size='sm'>
            Open popover
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-64'>
          <div className='grid gap-4'>
            <h4 className='text-primary leading-none font-bold'>Details</h4>

            <div className='text-sm'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Recusandae, perspiciatis fugiat voluptatem laborum dolor suscipit
              sunt quidem ex animi vel! Aliquam incidunt odit reiciendis odio
              illum consequatur eos eum autem voluptates, quibusdam laboriosam.
              Mollitia est quisquam minima alias, quia explicabo rerum beatae
              illo hic quasi cum ut deserunt, asperiores tempora.
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
