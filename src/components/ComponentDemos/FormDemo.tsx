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
import { Checkbox } from '@/components/checkbox'
import { Label } from '@/components/label'
import { Button } from '@/components/button'
import { RadioGroup, RadioGroupItem } from '@/components/radio-group'
import { Switch } from '@/components/switch'
import { CheckboxGroup } from '@/components/CheckboxGroup'
import React from 'react'

type Items = React.ComponentProps<typeof CheckboxGroup>['items']

/* ========================================================================

======================================================================== */

export const FormDemo = () => {
  /* ======================
      renderFirstName()
  ====================== */

  const renderFirstName = () => {
    return (
      <Input
        // disabled
        id='first-name'
        // groupClassName='mb-6'
        labelText={<span>First Name</span>}
        labelRequired={true}
        name='first_name'
        // renderInputBaseOnly
        type='text'
        placeholder='First Name...'
        error='This is invalid!'
        text='(A hardcoded invalid example)'
        // textClassName='text-xs'
      />
    )
  }

  /* ======================
      renderLastName()
  ====================== */

  const renderLastName = () => {
    return (
      <Input
        // disabled
        id='last-name'
        labelText='Last Name'
        labelRequired={true}
        name='last_name'
        touched={true}
        type='text'
        placeholder='Last Name...'
        error=''
        text='(A hardcoded valid example)'
      />
    )
  }

  /* ======================
    renderSingleCheckbox()
  ====================== */

  const renderSingleCheckbox = () => {
    return (
      <Checkbox
        // disabled
        id='singe-check'
        labelText='Agree To Terms'
        // labelRequired
        name='single-check'
        // touched
        // error='This must be checked!'
        // text='Do it bitch!'
      />
    )
  }

  /* ======================
    renderCheckboxGroup()
  ====================== */

  const items: Items = [
    { labelText: 'Red', value: 'red' },
    { labelText: 'Orange', value: 'orange' },
    { labelText: 'Yellow', value: 'yellow' },
    { labelText: 'Green', value: 'green' },
    { labelText: 'Blue', value: 'blue' },
    { labelText: 'Purple', value: 'purple' }
  ]

  const renderCheckboxGroup = () => {
    return (
      <CheckboxGroup
        //# If something is checked, but disabled, should we change the checkbox color?
        //# Same for valid/invalid ?
        // disabled
        // error='At least one item must be checked.'
        // initialValues={['red', 'orange']}
        items={items}
        labelText='Colors'
        name='colors'
        onChange={(values) => {
          console.log(' values:', values)
        }}
        // text='Pick one or more...'
        // touched
      />
    )
  }

  /* ======================
      renderRadioGroup()
  ====================== */

  const renderRadioGroup = () => {
    return (
      <div>
        <Label className='mb-2'>Choose One:</Label>

        <RadioGroup defaultValue='option-one'>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='option-one' id='option-one' />
            <label
              htmlFor='option-one'
              className='cursor-pointer text-xs leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Option One
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='option-two' id='option-two' />
            <label
              htmlFor='option-two'
              className='cursor-pointer text-xs leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Option Two
            </label>
          </div>
        </RadioGroup>
      </div>
    )
  }

  /* ======================
        renderSwitch()
  ====================== */

  const renderSwitch = () => {
    return (
      <div className='flex items-center space-x-2'>
        <Switch id='airplane-mode' />
        <Label htmlFor='airplane-mode'>Airplane Mode</Label>
      </div>
    )
  }

  /* ======================
      renderRangeSlider()
  ====================== */

  const renderRangeSlider = () => {
    return (
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
    )
  }

  /* ======================
      renderTextarea()
  ====================== */

  const renderTextarea = () => {
    return (
      <Textarea
        // disabled
        id='message'
        labelText={'Message'}
        labelRequired={true}
        // error='This is invalid!'
        // touched={true}
        name='message'
        text='Write a thoughtful message...'
        placeholder='Message here...'
        // renderTextareaBaseOnly
      />
    )
  }

  /* ======================
        renderSelect()
  ====================== */

  const renderSelect = () => {
    return (
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
    )
  }

  /* ======================
      renderFileInput()
  ====================== */

  const renderFileInput = () => {
    return (
      <div>
        <Label className='mb-2' htmlFor='picture'>
          Picture
        </Label>
        <Input id='picture' name='picture' type='file' />
      </div>
    )
  }

  /* ======================
      renderEmail()
  ====================== */

  const renderEmail = () => {
    return (
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
    )
  }

  /* ======================
          return
  ====================== */
  return (
    <section className='mx-auto max-w-[800px] space-y-6 rounded-xl border bg-(--background-light) p-6 shadow'>
      {renderFirstName()}

      {renderLastName()}

      {renderSingleCheckbox()}

      {renderCheckboxGroup()}

      {renderRadioGroup()}

      {renderSwitch()}

      {renderRangeSlider()}

      {renderTextarea()}

      {renderSelect()}

      {renderFileInput()}

      {renderEmail()}
    </section>
  )
}
