'use client'

// import * as React from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/alert-dialog'

import { Button } from '@/components'

/* ========================================================================

======================================================================== */

export const AlertDialogDemo = () => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            // variant='success'
            className='mx-auto flex min-w-[100px]'
            size='sm'
          >
            Show Dialog
          </Button>
        </AlertDialogTrigger>

        {/* Content */}

        <AlertDialogContent>
          {/* Header */}
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Footer */}
          <AlertDialogFooter>
            <AlertDialogCancel
              className='min-w-[100px]'
              size='sm'
              variant='destructive'
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className='min-w-[100px]'
              size='sm'
              variant='success'
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
