'use client'

import { ComponentProps } from 'react'
import { Button } from '@/components/button'

import {
  Rocket,
  Omega,
  Zap,
  CircleUserRound,
  CircleCheck,
  Music4
} from 'lucide-react'

type ButtonVariant = ComponentProps<typeof Button>['variant']

const customColors: ButtonVariant[] = [
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'destructive'
]

const customLightColors: ButtonVariant[] = [
  'primary-light',
  'secondary-light',
  'info-light',
  'success-light',
  'warning-light',
  'destructive-light'
]

const tailwindColors: ButtonVariant[] = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone'
]

/* ========================================================================
                              ButtonDemo
======================================================================== */

export const ButtonDemo = () => {
  const renderCustomColorButtons = () => {
    return createButtons(customColors)
  }

  const renderCustomLightColorButtons = () => {
    return createButtons(customLightColors)
  }

  const renderTailwindColorButtons = () => {
    return createButtons(tailwindColors)
  }

  /* ======================

  ====================== */

  return (
    <>
      <section className='mx-auto mb-6 space-y-4 rounded-lg border bg-(--background-light) p-4 shadow'>
        <h2 className='text-primary mb-4 font-bold'>Custom Color Variants:</h2>
        {renderCustomColorButtons()}
      </section>

      <section className='mx-auto mb-6 space-y-4 rounded-lg border bg-(--background-light) p-4 shadow'>
        <h2 className='text-primary mb-4 font-bold'>
          Custom Color Variants (light):
        </h2>

        <p className='mb-6'>
          These are not actual additional custom colors. However, the variants
          represent the <em>forced</em> light versions of custom colors.
        </p>
        {renderCustomLightColorButtons()}
      </section>

      <section className='mx-auto mb-6 space-y-4 rounded-lg border bg-(--background-light) p-4 shadow'>
        <h2 className='text-primary mb-4 font-bold'>
          Tailwind Color Variants:
        </h2>
        {renderTailwindColorButtons()}
      </section>

      <section className='mx-auto mb-6 space-y-4 rounded-lg border bg-(--background-light) p-4 shadow'>
        <h2 className='text-primary mb-4 font-bold'>Buttons With SVGs:</h2>

        <div className='flex flex-wrap items-center justify-center gap-4'>
          <Button
            className='size-12 animate-spin rounded-full p-2 [animation-duration:3.5s]'
            isIcon
            variant='lime'
          >
            <Rocket />
          </Button>

          <Button size='md' variant='red'>
            <Rocket />
            Click Me
          </Button>

          <Button size='md' variant='orange'>
            <Omega />
            Click Me
          </Button>

          <Button size='md' variant='yellow'>
            <Zap />
            Click Me
          </Button>

          <Button size='md' variant='green'>
            <CircleCheck />
            Click Me
          </Button>

          <Button size='md' variant='blue'>
            <CircleUserRound />
            Click Me
          </Button>

          <Button size='md' variant='purple'>
            <Music4 />
            Click Me
          </Button>
        </div>
      </section>

      {/* Outline: 
      The default shadcn outline button isn't really an outline button.
      It's just an off-white button with a light border.*/}

      {/* <Button variant='outline'>Outline</Button> */}

      {/* Ghost: 
      The default shadcn ghost button is transparent, then has a solid off-white color when hovered. */}

      {/* <Button variant='ghost'>Ghost</Button> */}

      {/* Link */}
      {/* <Button variant='link'>Link</Button> */}
    </>
  )
}

/* ======================
    createButtons()
====================== */

const createButtons = (colorArray: ButtonVariant[]) => {
  return colorArray.map((color, index) => {
    if (!color) {
      return null
    }

    return (
      <div
        key={index}
        className='flex flex-wrap items-center justify-center gap-4'
      >
        <Button size='xs' variant={color}>
          {color.toUpperCase()} xs
        </Button>

        <Button size='sm' variant={color}>
          {color.toUpperCase()} sm
        </Button>

        <Button size='md' variant={color}>
          {color.toUpperCase()} md
        </Button>

        <Button size='lg' variant={color}>
          {color.toUpperCase()} lg
        </Button>

        <Button size='xl' variant={color}>
          {color.toUpperCase()} xl
        </Button>
      </div>
    )
  })
}
