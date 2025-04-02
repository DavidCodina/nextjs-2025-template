'use client'

import { useState } from 'react'
import { Input } from '@/components/Input'
import { Textarea } from '@/components/Textarea'

import { Select, SelectItemType, SelectValueType } from '@/components/Select'

import { Slider } from '@/components/Slider'
import { Checkbox, CheckedState } from '@/components/Checkbox'
import { Label } from '@/components/label'
import { Button } from '@/components'
import { RadioGroup, RadioItemType, RadioValue } from '@/components/RadioGroup'
import { Switch } from '@/components/Switch'
import {
  CheckboxGroup,
  CheckboxValue,
  CheckboxItemType
} from '@/components/CheckboxGroup'
import React from 'react'

/* ========================================================================

======================================================================== */

export const UncontrolledFormDemo = () => {
  const [formKey, setFormKey] = useState(0)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [singleCheck, setSingleCheck] = useState<CheckedState>(false)
  const [checkboxGroupValue, setCheckboxGroupValue] = useState<CheckboxValue[]>(
    []
  )
  const [radioGroupValue, setRadioGroupValue] = useState<RadioValue>('')
  const [switchChecked, setSwitchChecked] = useState(false)
  const [rangeSliderValue, setRangeSliderValue] = useState<number[]>([50])
  const [textareaValue, setTextareaValue] = useState('')
  const [selectValue, setSelectValue] = useState<SelectValueType>('')
  const [file, setFile] = useState<File | null>(null)
  const [email, setEmail] = useState('')

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

    const values = {
      firstName,
      lastName,
      singleCheck,
      checkboxGroupValue,
      radioGroupValue,
      switchChecked,
      rangeSliderValue,
      textareaValue,
      selectValue,
      file,
      email
    }

    console.log('Submitted values:', values)

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
    setFirstName('')
    setLastName('')
    setSingleCheck(false)
    setCheckboxGroupValue([])
    setRadioGroupValue('')
    setSwitchChecked(false)
    setRangeSliderValue([50])
    setTextareaValue('')
    setSelectValue('')
    setFile(null)
    setEmail('')
  }

  /* ======================
      renderFirstName()
  ====================== */

  const renderFirstName = () => {
    return (
      <Input
        autoCapitalize='none'
        autoComplete='off'
        autoCorrect='off'
        // disabled
        // error='This is invalid!'
        id='first-name'
        // groupClassName='mb-6'
        label={<span>First Name</span>}
        labelRequired={true}
        name='first_name'
        onChange={(e) => {
          setFirstName(e.target.value)
        }}
        placeholder='First Name...'
        // renderInputBaseOnly
        spellCheck={false}
        // help='(A hardcoded invalid example)'
        // helpClassName='text-xs'
        type='text'
      />
    )
  }

  /* ======================
      renderLastName()
  ====================== */

  const renderLastName = () => {
    return (
      <Input
        autoCapitalize='none'
        autoComplete='off'
        autoCorrect='off'
        // disabled
        // error=''
        id='last-name'
        label='Last Name'
        labelRequired={true}
        name='last_name'
        onChange={(e) => {
          setLastName(e.target.value)
        }}
        placeholder='Last Name...'
        spellCheck={false}
        // help='(A hardcoded valid example)'
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
        defaultChecked={singleCheck}
        // disabled
        // error='This must be checked!'
        id='singe-check'
        label='Agree To Terms'
        // labelRequired
        name='single-check'
        onChange={(isChecked) => {
          setSingleCheck(isChecked)
        }}
        // help='Do it!'
        // touched
        value='Single Checkbox checked!'
      />
    )
  }

  /* ======================
    renderCheckboxGroup()
  ====================== */

  const renderCheckboxGroup = () => {
    const checkboxItems: CheckboxItemType[] = [
      { label: 'Red', value: 'red' },
      { label: 'Orange', value: 'orange' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Green', value: 'green' },
      { label: 'Blue', value: 'blue' },
      { label: 'Purple', value: 'purple' }
    ]

    return (
      <CheckboxGroup
        //# If something is checked, but disabled, should we change the checkbox color?
        //# Same for valid/invalid ?
        // defaultValue={['red', 'orange']}
        // disabled
        // error='At least one item must be checked.'
        items={checkboxItems}
        label='Checkbox Colors'
        name='checkbox-colors'
        onChange={(value) => {
          setCheckboxGroupValue(value)
        }}
        // help='Pick one or more...'
        // touched
      />
    )
  }

  /* ======================
      renderRadioGroup()
  ====================== */

  const renderRadioGroup = () => {
    const radioItems: RadioItemType[] = [
      { label: 'Red', value: 'red' },
      { label: 'Orange', value: 'orange' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Green', value: 'green' },
      { label: 'Blue', value: 'blue' },
      { label: 'Purple', value: 'purple' }
    ]

    return (
      <RadioGroup
        //# If something is checked, but disabled, should we change the radio color?
        //# Same for valid/invalid ?
        defaultValue={radioGroupValue}
        // disabled

        // error='An item must be selected.'
        items={radioItems}
        label='Radio Colors'
        name='radio-colors'
        onChange={(value) => {
          setRadioGroupValue(value)
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

        // radioGroupBaseStyle={{ outline: '2px dashed deeppink' }}
        // radioGroupBaseClassName=''
        // help='Pick one.'
        // touched
      />
    )
  }

  /* ======================
        renderSwitch()
  ====================== */

  const renderSwitch = () => {
    return (
      <Switch
        defaultChecked={switchChecked}
        // disabled
        // error='This is invalid!'
        id='airplane-mode'
        // label='Airplane Mode'

        labelOn='Airplane Mode On'
        labelOff='Airplane Mode Off'
        onChange={(isChecked) => {
          setSwitchChecked(isChecked)
        }}
        // help='Switch me!'
        // touched
      />
    )
  }

  /* ======================
      renderRangeSlider()
  ====================== */

  const renderRangeSlider = () => {
    return (
      <Slider
        // defaultValue is only used on initializattion. Even though
        // rangeSliderValue changes often afterward, that shouldn't matter.
        defaultValue={rangeSliderValue} // Or for multiple thumbs: [25, 75]
        // disabled
        // error='This is invalid!'
        id='percent'
        label='Percent'
        labelRequired
        max={100}
        name='percent'
        // onCommit is only practical in an uncontrolled implementation.
        onCommit={(value) => {
          setRangeSliderValue(value)
        }}
        // step={10} // Default is 1.
        // help='Slide me!'
        // touched={true}
      />
    )
  }

  /* ======================
      renderTextarea()
  ====================== */

  const renderTextarea = () => {
    return (
      <Textarea
        autoCapitalize='none'
        autoComplete='off'
        autoCorrect='off'
        // disabled
        // error='This is invalid!'
        id='message'
        label={'Message'}
        labelRequired={true}
        name='message'
        onChange={(e) => {
          setTextareaValue(e.target.value)
        }}
        placeholder='Message here...'
        // renderTextareaBaseOnly
        spellCheck={false}
        help='Write a thoughtful message...'
        // touched={true}
      />
    )
  }

  /* ======================
        renderSelect()
  ====================== */

  const renderSelect = () => {
    //# Test disabled, className, style
    const selectItems: SelectItemType[] = [
      {
        label: 'Apple',
        value: 'apple'
        // className: 'font-bold text-red-500'
      },
      {
        label: 'Banana',
        value: 'banana'
        // className: 'font-bold text-yellow-500'
      },
      {
        label: 'Blueberry',
        value: 'blueberry'
        // disabled: true
        // style: { outline: '2px dashed deeppink' }
      },
      {
        label: 'Grapes',
        value: 'grapes'
        // className: 'font-bold text-purple-500'
      },
      {
        label: 'Pineapple',
        value: 'pineapple'
        // className: 'font-bold text-orange-500'
      }
    ]

    return (
      <Select
        // disabled
        // error='This is invalid!'
        // errorClassName='font-bold text-right'
        // className='outline-2 outline-pink-500 outline-dashed' // Assigned to SelectTrigger

        // groupClassName='outline-2 outline-pink-500 outline-dashed'
        // groupStyle={{ outline: '2px dashed deeppink' }}
        id='fruits'
        items={selectItems}
        label='Select One'
        // labelClassName='font-bold'
        onChange={(value) => {
          setSelectValue(value)
        }}
        // placeholder={
        //   <span className='rounded-full bg-blue-100 px-2'>Select Fruit...</span>
        // }

        // renderSelectBase={(selectBase) => {
        //   return (
        //     <div className='relative outline-red-500 outline-dashed'>
        //       {selectBase}
        //     </div>
        //   )
        // }}

        // sideOffset={20}
        // style={{ outline: '2px dashed deeppink' }}  // Assigned to SelectTrigger
        // help='Pick a fruit...'
        // helpClassName='font-bold'
        // touched
      />
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
        <Input
          id='picture'
          name='picture'
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              setFile(file)
            }
          }}
          type='file'
        />
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

        <Input
          autoCapitalize='none'
          autoComplete='off'
          autoCorrect='off'
          id='email'
          name='email'
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          placeholder='Email...'
          spellCheck={false}
          type='email'
        />
      </div>
    )
  }

  /* ======================
          return
  ====================== */

  return (
    <form
      className='bg-background-light mx-auto max-w-[800px] space-y-6 rounded-xl border p-6 shadow'
      key={formKey}
      onSubmit={(e) => {
        e.preventDefault()
      }}
      noValidate
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
