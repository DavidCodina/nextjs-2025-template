'use client'

import { Button, Tooltip } from '@/components'

/* ========================================================================
                                TooltipDemo
======================================================================== */

export const TooltipDemo = () => {
  /* ======================
          return
  ====================== */

  return (
    <Tooltip
      // side='right'
      delayDuration={0}
      // defaultOpen
      trigger={
        <Button
          className='btn-green btn-sm mx-auto mt-20 mb-6 block'
          onClick={() => {
            console.log('Clicked')
          }}
          variant='success'
        >
          Hover Me!
        </Button>
      }
      // [--radix-tooltip-border-color:red] [--radix-tooltip-bg-color:snow]
      contentClassName={`
          max-w-[clamp(0px,400px,calc(100vw-48px))]
        `}
      //  arrow={false}
      closeOnClick={true} // ???
      toggleForceMount
      sideOffset={15}
    >
      <div className='flex items-center gap-1'>
        <span className='text-4xl'>😃</span>
        <span>
          Clamp me with:
          <br />
          <code className='text-pink-500'>{`max-w-[clamp(0px,250px,calc(100vw-48px))]`}</code>
        </span>
      </div>
    </Tooltip>
  )
}
