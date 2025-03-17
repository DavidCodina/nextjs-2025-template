'use client'

import { ComponentProps } from 'react'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/alert'

type AlertVariant = ComponentProps<typeof Alert>['variant']

const customColors: AlertVariant[] = [
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'destructive'
]

const customOutlineColors: AlertVariant[] = [
  'primary-outline',
  'secondary-outline',
  'info-outline',
  'success-outline',
  'warning-outline',
  'destructive-outline'
]

const tailwindColors: AlertVariant[] = [
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

const tailwindOutlineColors: AlertVariant[] = [
  'red-outline',
  'orange-outline',
  'amber-outline',
  'yellow-outline',
  'lime-outline',
  'green-outline',
  'emerald-outline',
  'teal-outline',
  'cyan-outline',
  'sky-outline',
  'blue-outline',
  'indigo-outline',
  'violet-outline',
  'purple-outline',
  'fuchsia-outline',
  'pink-outline',
  'rose-outline',
  'slate-outline',
  'gray-outline',
  'zinc-outline',
  'neutral-outline',
  'stone-outline'
]

/* ========================================================================

======================================================================== */

export const AlertDemo = () => {
  const renderCustomColorAlerts = () => {
    return createAlerts(customColors)
  }

  const renderCustomOutlineAlerts = () => {
    return createAlerts(customOutlineColors)
  }

  const renderTailwindColorAlerts = () => {
    return createAlerts(tailwindColors)
  }

  const renderTailwindOutlineColorAlerts = () => {
    return createAlerts(tailwindOutlineColors)
  }

  /* ======================
          return
  ====================== */

  return (
    <>
      <section className='mx-auto mb-6 max-w-[800px] space-y-6 rounded-lg border bg-(--background-light) p-6 shadow'>
        <h2 className='text-primary mb-4 font-bold'>Custom Color Variants:</h2>
        {renderCustomColorAlerts()}
      </section>

      <section className='mx-auto mb-6 max-w-[800px] space-y-6 rounded-lg border bg-(--background-light) p-6 shadow'>
        <h2 className='text-primary mb-4 font-bold'>
          Custom Color Variants (Outline):
        </h2>
        {renderCustomOutlineAlerts()}
      </section>

      <section className='mx-auto mb-6 max-w-[800px] space-y-6 rounded-lg border bg-(--background-light) p-6 shadow'>
        <h2 className='text-primary mb-4 font-bold'>
          Tailwind Color Variants:
        </h2>
        {renderTailwindColorAlerts()}
      </section>

      <section className='mx-auto mb-6 max-w-[800px] space-y-6 rounded-lg border bg-(--background-light) p-6 shadow'>
        <h2 className='text-primary mb-4 font-bold'>
          Tailwind Color Variants (Outline):
        </h2>
        {renderTailwindOutlineColorAlerts()}
      </section>
    </>
  )
}

/* ======================
    createAlerts()
====================== */

const createAlerts = (variants: AlertVariant[]) => {
  return variants.map((variant, index) => {
    if (!variant) {
      return null
    }

    return (
      <Alert key={index} variant={variant} className=''>
        <AlertCircle
          // The docs set h-4 w-4 on example, but actually that won't do anything.
          // Internally, the component does this: '[&>svg]:size-6', so if you actually
          // want to change it you need to do that at the top-level.
          className='h-4 w-4'
        />
        <AlertTitle>{variant.toUpperCase()}</AlertTitle>
        <AlertDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          dolore possimus at culpa suscipit accusantium optio porro blanditiis
          nesciunt minus architecto, quis laboriosam?
        </AlertDescription>
      </Alert>
    )
  })
}
