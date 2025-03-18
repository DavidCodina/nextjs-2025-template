'use client'

import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/select'

import { Slider } from '@/components/slider'
import { Label } from '@/components/label'
import { Button } from '@/components/button'

/* ========================================================================

======================================================================== */

export const FormDemo = () => {
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
          disabled
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
        <Label className='mb-2' htmlFor='percent'>
          Percent
        </Label>
        <Slider
          defaultValue={[50]}
          id='percent'
          max={100}
          name='percent'
          step={1}
          onValueCommit={(value) => {
            console.log('Slider value committed:', value)
          }}
        />
      </div>

      <div>
        <Label className='mb-2' htmlFor='message'>
          Message
        </Label>
        <Textarea id='message' name='message' placeholder='Message here...' />
      </div>

      <div>
        <Label className='mb-2' htmlFor='fruits'>
          Select One
        </Label>
        <Select
          onValueChange={(value) => {
            console.log('Select value:', value)
          }}
        >
          <SelectTrigger className=''>
            <SelectValue placeholder='Select Fruit...' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value='apple'>Apple</SelectItem>
              <SelectItem value='banana'>Banana</SelectItem>
              <SelectItem value='blueberry'>Blueberry</SelectItem>
              <SelectItem value='grapes'>Grapes</SelectItem>
              <SelectItem value='pineapple'>Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
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
