'use client'

import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { Button } from '@/components/button'

/* ========================================================================

======================================================================== */

export const InputDemo = () => {
  return (
    <section className='mx-auto max-w-[800px] space-y-6 rounded-xl border bg-(--background-light) p-6 shadow'>
      <div
        // data-disabled='true' will be checked by the label and apply disabled styles
        // to it. For this to work, 'group' must also be applied to <div> container.
        // data-disabled='true'
        className='group'
      >
        <Label className='mb-2' htmlFor='first-name'>
          First Name
        </Label>
        <Input
          // disabled
          id='first-name'
          name='first_name'
          type='text'
          placeholder='First Name...'
        />
      </div>

      <div>
        <Label className='mb-2' htmlFor='last-name'>
          Last Name
        </Label>
        <Input
          id='last-name'
          name='last_name'
          type='text'
          placeholder='Last Name...'
        />
      </div>

      <div>
        <Label className='mb-2' htmlFor='picture'>
          Picture
        </Label>
        <Input id='picture' name='picture' type='file' />
      </div>

      <div>
        <Label className='mb-2' htmlFor='email'>
          Email
        </Label>
        <div className='flex items-center gap-2'>
          <Input id='email' name='email' type='email' placeholder='Email...' />
          <Button type='submit' variant='success'>
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  )
}
