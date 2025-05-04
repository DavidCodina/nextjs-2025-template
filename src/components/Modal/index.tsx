'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { ModalOverlay } from './ModalOverlay'

// In Radix, the convention is to name the entire component 'Dialog'. However, in Bootstrap
// the 'dialog' (i.e., <div className='modal-dialog'>) refers to the part of the modal that
// contains/wraps the <div className='modal-content'>. This extra wrapper is useful
// for features like centering and scrolling.
import { ModalDialog } from './ModalDialog'

import { ModalContent } from './ModalContent'
import { ModalHeader } from './ModalHeader'
import { ModalBody } from './ModalBody'
import { ModalFooter } from './ModalFooter'
import { ModalClose } from './ModalClose'

import { ModalProps } from './types'

/* ========================================================================
                                Modal
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Docs:
//
//   https://www.radix-ui.com/primitives/docs/components/dialog
//
// Sam Selikoff tutorials:
//
//   https://www.youtube.com/watch?v=KvZoBV_1yYE
//   https://www.youtube.com/watch?v=3ijyZllWBwU
//   https://www.youtube.com/watch?v=VM6YRrUsnUY
//   https://github.com/samselikoff/2023-05-30-radix-dialog/tree/main/03-reusable-component/end/app
//   https://github.com/samselikoff/2023-05-30-radix-dialog/blob/main/03-reusable-component/end/app/spinner.tsx
//
// Keyboard Interactions:
//
//   Space       : Opens/closes the dialog.
//   Enter       : Opens/closes the dialog.
//   Tab         : Moves focus to the next focusable element.
//   Shift + Tab : Moves focus to the previous focusable element.
//   Esc         : Closes the dialog and moves focus to Dialog.Trigger.
//
///////////////////////////////////////////////////////////////////////////

//# Continue moving plugin styles into local components.

//# Test out ControlledModalDemo with Form back in.

//# The ShadCN DIALOG_ZINDEX_CLASS  was z-50.
//# Consider changing the default z-index to 50 for Modal.

//# Test nested modals

const Modal = ({
  /* ====== Root ======= */

  defaultOpen,
  open = undefined,
  setOpen = undefined,

  /* =================== */

  // One almost always wants to use the trigger prop over an external/programmatic trigger.
  // Why? Because when the button is implemented with Radix's Dialog.Trigger, then by default focus will
  // go back to the trigger element when the dialog is closed. This is not true if one was using some
  // random programmatic button.
  trigger = null,

  /* =================== */

  disableAnimation: shouldDisableAnimation = false,
  overlayClassName = '',
  overlayStyle = {},

  /* ====== Dialog ===== */

  centered = false, // ???

  // ⚠️ By default, this should be false so that <select>s will be able to overflow.
  scrollable = false,
  fullscreen = false,
  dialogClassName = '',
  dialogStyle = {},

  /* === ModalContent == */

  contentClassName = '',
  contentStyle = {},

  children,

  /* === ModalHeader === */

  headerClassName = '',
  headerStyle = {},

  title = '',
  titleClassName = '',
  titleStyle = {},

  description = '',
  descriptionClassName = '',
  descriptionStyle = {},

  /* =================== */

  bodyClassName = '',
  bodyStyle = {},

  /* =================== */

  footer = null,
  footerClassName = '',
  footerStyle = {},

  /* =================== */

  closeButton = true
}: ModalProps) => {
  const firstRenderRef = useRef(true)
  const [disableAnimation, setDisableAnimation] = useState(
    shouldDisableAnimation
  )

  /* ======================
    useLayoutEffect()
  ====================== */
  // If either open || defaultOpen is true on first render, then
  // temporarily disable the animation, so that it doesn't run
  // the first time. useLayoutEffect implemented because we want
  // this to take effect after render, but before paint.

  useLayoutEffect(() => {
    if (firstRenderRef.current === false || shouldDisableAnimation) {
      return
    }
    firstRenderRef.current = false

    if (open === true || defaultOpen === true) {
      setDisableAnimation(true)
      setTimeout(() => {
        setDisableAnimation(false)
      }, 300) // Milliseconds should match CSS animation-duration value.
    }
  }, [defaultOpen, open, shouldDisableAnimation])

  /* ======================
      renderContent()
  ====================== */

  const renderContent = () => {
    return (
      <ModalContent
        className={contentClassName}
        style={{
          ...contentStyle,
          ...(disableAnimation ? { animationDuration: '0s' } : {})
        }}
      >
        <ModalHeader
          className={headerClassName}
          style={headerStyle}
          title={title}
          titleClassName={titleClassName}
          titleStyle={titleStyle}
          description={description}
          descriptionClassName={descriptionClassName}
          descriptionStyle={descriptionStyle}
        />

        {/* In general, any content that manages some state should be abstracted into its own component.
        For example a UserDialog instance that has a form and form state should abstract that logic into
        its own <Form /> component. That way when the modal closes, the content's state will be reset when unmounted.
        This point is emphasized in the following Sam Selikoff tutorial at 12:30 :
        https://www.youtube.com/watch?v=3ijyZllWBwU 
    
        Conversely, if you want the state to persist (e.g., a modal that shows API data that rarely changes).
        Then implement the state directly within the component instance. */}

        <ModalBody className={bodyClassName} style={bodyStyle}>
          {children}
        </ModalBody>

        {footer && (
          <ModalFooter className={footerClassName} style={footerStyle}>
            {footer}
          </ModalFooter>
        )}

        {/* By placing this last it ensures that it will sit on top of the header. */}
        <ModalClose closeButton={closeButton} />
      </ModalContent>
    )
  }

  /* ======================
          return
  ====================== */
  ///////////////////////////////////////////////////////////////////////////
  //
  // https://www.radix-ui.com/primitives/docs/components/dialog#anatomy
  // The basic anatomy of a composed Radix Dialog is:
  //
  //   <Dialog.Root>
  //     <Dialog.Trigger />
  //     <Dialog.Portal>
  //       <Dialog.Overlay />
  //       <Dialog.Content>
  //         <Dialog.Title />
  //         <Dialog.Description />
  //         <Dialog.Close />
  //        </Dialog.Content>
  //     </Dialog.Portal>
  //   </Dialog.Root>
  //
  ///////////////////////////////////////////////////////////////////////////

  return (
    <Dialog.Root
      data-slot='modal'
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={(newOpen) => {
        setOpen?.(newOpen)
      }}
    >
      {trigger && (
        <Dialog.Trigger asChild data-slot='modal-trigger'>
          {trigger}
        </Dialog.Trigger>
      )}

      <Dialog.Portal data-slot='modal-portal'>
        <ModalOverlay
          className={overlayClassName}
          style={{
            ...overlayStyle,
            ...(disableAnimation ? { animationDuration: '0s' } : {})
          }}
        >
          <ModalDialog
            centered={centered}
            scrollable={scrollable}
            fullscreen={fullscreen}
            className={dialogClassName}
            style={dialogStyle}
          >
            {renderContent()}
          </ModalDialog>
        </ModalOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const CompoundComponent = Object.assign(Modal, {
  // This is exposed because it may be used from within the content
  // For example, see the <Form /> component in the demo example.
  Close: Dialog.Close
})

export { CompoundComponent as Modal }
