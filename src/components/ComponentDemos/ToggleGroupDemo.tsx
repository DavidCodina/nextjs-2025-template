'use client'

import { ToggleGroup, ToggleGroupItem } from '@/components/ToggleGroup'

import { Rocket, Omega, Zap } from 'lucide-react'
/* ========================================================================

======================================================================== */

export function ToggleGroupDemo() {
  return (
    <section className='mt-12 flex items-center justify-center gap-2'>
      <ToggleGroup
        // ⚠️ background color and border should go on the
        // ToggleGroupItem components - not the ToggleGroup
        // Note: The ToggleGroup container's border-radius is
        // calcualted dynamically based on the size prop.
        // className='shadow-[0px_3px_6px_rgba(0,0,0,0.15)]'
        type='multiple'
        size='md'
        variant='outline'
      >
        <ToggleGroupItem value='item1'>
          <Rocket />
          Item 1
        </ToggleGroupItem>
        <ToggleGroupItem value='item2'>
          <Omega />
          Item 2
        </ToggleGroupItem>
        <ToggleGroupItem value='item3'>
          <Zap />
          Item 3
        </ToggleGroupItem>
      </ToggleGroup>
    </section>
  )
}
