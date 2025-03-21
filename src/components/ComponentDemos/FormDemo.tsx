'use client'

import { useState } from 'react'

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
import { RadioGroup } from '@/components/RadioGroup'
import { Switch } from '@/components/switch'
import { CheckboxGroup } from '@/components/CheckboxGroup'
import React from 'react'

type CheckboxItems = React.ComponentProps<typeof CheckboxGroup>['items']

type RadioItems = React.ComponentProps<typeof RadioGroup>['items']

/* ========================================================================

======================================================================== */
//# Add an onChange handler to each and log values onsubmit.
//# Then add in a bunch of other attributes.

export const FormDemo = () => {
  const [formKey, setFormKey] = useState(0)

  // const [checkboxGroupValue, setCheckboxGroupValue] = useState<string[]>([
  //   'green',
  //   'blue'
  // ])

  /* ======================
      handleSubmit()()
  ====================== */

  const handleSubmit = () => {
    ///////////////////////////////////////////////////////////////////////////
    //
    // Trying to get values and/or reset values through refs is extremely tedious.
    // The fact is that Radix primitives just don't seem to be designed to be
    // consumed in this way. Initially, I really tried to get each value through
    // refs. The breaking point was the Slider component. The only place to find
    // the value(s) is by drilling into the DOM to find each input. It's just
    // way too complicated. If you try to access inner input elements through refs
    // to force a reset, you’re essentially fighting against the component’s
    // encapsulated state. The Select doesn't even have a <select> in it! In contrast,
    // Checkbox includes a native <input type="checkbox" />, which can sometimes
    // be easier to manipulate directly, but even then, the synchronization between
    // the DOM’s native state and the rendered state in the Radix component isn't guaranteed.
    //
    //
    // A better solution is to simply track all the values in local state.
    // And if you're doing that, then your halfway to a controlled implementation,
    // which is probably the easiest way to go because it doesn't entail hacks to
    // reset the form, etc.
    //
    ///////////////////////////////////////////////////////////////////////////

    //# const values = {}
    //# console.log(values)

    ///////////////////////////////////////////////////////////////////////////
    //
    // Trying to reset the form fields through refs gets tricky.
    // This is what I had to do for the first few inputs:
    //
    //   if (firstNameRef.current) firstNameRef.current.value = ''
    //   if (lastNameRef.current) lastNameRef.current.value = ''
    //   if (singleCheckRef.current) {
    //     const isChecked =
    //       singleCheckRef.current.getAttribute('data-state') === 'checked' ? true : false
    //     if (isChecked) { singleCheckRef.current.click() }
    //   }
    //
    // However, it would get even more complex with CheckboxGroup and RadioGroup.
    // The best solution is probably just to remount the form. One way to reset the
    // from would be to call setShowForm(false),then reset it here with:
    // useLayoutEffect(() => { if (!showForm) { setShowForm(true) } }, [showForm])
    // A cleaner solution is to use a key prop.
    //
    ///////////////////////////////////////////////////////////////////////////

    setFormKey((prev) => prev + 1)
  }

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

        // error='This is invalid!'
        // text='(A hardcoded invalid example)'
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
        // error=''
        id='last-name'
        labelText='Last Name'
        labelRequired={true}
        name='last_name'
        placeholder='Last Name...'
        // text='(A hardcoded valid example)'
        // touched={true}
        type='text' //! What happens if we make this 'checkbox' or 'radio'?
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
        value='Single Checkbox checked!'
        // touched
        // error='This must be checked!'
        // text='Do it bitch!'
      />
    )
  }

  /* ======================
    renderCheckboxGroup()
  ====================== */

  const renderCheckboxGroup = () => {
    const checkboxItems: CheckboxItems = [
      { labelText: 'Red', value: 'red' },
      { labelText: 'Orange', value: 'orange' },
      { labelText: 'Yellow', value: 'yellow' },
      { labelText: 'Green', value: 'green' },
      { labelText: 'Blue', value: 'blue' },
      { labelText: 'Purple', value: 'purple' }
    ]

    return (
      <CheckboxGroup
        //# If something is checked, but disabled, should we change the checkbox color?
        //# Same for valid/invalid ?
        // disabled
        // error='At least one item must be checked.'
        defaultValue={['red', 'orange']}
        items={checkboxItems}
        labelText='Checkbox Colors'
        name='checkbox-colors'
        onChange={(value) => {
          console.log('CheckboxGroup value:', value)

          // setCheckboxGroupValue(value as string[])
        }}
        // value={checkboxGroupValue}

        // text='Pick one or more...'
        // touched
      />
    )
  }

  /* ======================
      renderRadioGroup()
  ====================== */

  const renderRadioGroup = () => {
    const radioItems: RadioItems = [
      { labelText: 'Red', value: 'red' },
      { labelText: 'Orange', value: 'orange' },
      { labelText: 'Yellow', value: 'yellow' },
      { labelText: 'Green', value: 'green' },
      { labelText: 'Blue', value: 'blue' },
      { labelText: 'Purple', value: 'purple' }
    ]

    return (
      <RadioGroup
        //# If something is checked, but disabled, should we change the radio color?
        //# Same for valid/invalid ?
        // disabled
        defaultValue={radioItems[0].value}
        // error='An item must be selected.'
        items={radioItems}
        labelText='Radio Colors'
        name='radio-colors'
        onChange={(value) => {
          console.log('RadioGroup value:', value)
        }}

        ///////////////////////////////////////////////////////////////////////////
        //
        // className and style are applied to the top-level <div>
        // RadioGroupBase is a child of that <div>.
        // For cases when you want to style the RadioGroupBase directly,
        // use radioGroupBaseClassName and radioGroupBaseStyle. Primarily,
        // this would be useful for increading the gap between the child
        // <div>s that containe both the radio and the label.
        //
        ///////////////////////////////////////////////////////////////////////////

        // radioGroupBaseClassName=''
        // radioGroupBaseStyle={{ outline: '2px dashed deeppink' }}
        // text='Pick one.'
        // touched
      />
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
          defaultValue={[25, 75]}
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

        <Input id='email' name='email' type='email' placeholder='Email...' />
      </div>
    )
  }

  /* ======================
          renderForm()
    ====================== */

  const renderForm = () => {
    return (
      <form
        className='mx-auto max-w-[800px] space-y-6 rounded-xl border bg-(--background-light) p-6 shadow'
        key={formKey}
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
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

        <Button
          className='flex w-full'
          type='button'
          variant='success'
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    )
  }

  /* ======================
          return
  ====================== */

  return renderForm()
}
