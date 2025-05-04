import plugin from 'tailwindcss/plugin'

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// To inspect the theme that the theme() function is using
// uncomment this and right-click to inspect.
// Or see the following URL
// https://github.com/tailwindlabs/tailwindcss/blob/main/packages/tailwindcss/src/compat/default-theme.ts
// import theme from 'tailwindcss/defaultTheme'
//
///////////////////////////////////////////////////////////////////////////

export const modalPlugin = plugin(function (pluginApi) {
  const { addComponents, theme } = pluginApi

  addComponents({
    // No need for Framer Motion, just add a couple of simple keyframes.
    '@keyframes modal-content-open': {
      from: {
        opacity: '0',
        transform: 'scale(0.9)'
      },
      to: {
        opacity: '1',
        transform: 'scale(1)'
      }
    },

    '@keyframes modal-content-closed': {
      from: {
        opacity: '1',
        transform: 'scale(1)'
      },
      to: {
        opacity: '0',
        transform: 'scale(0.9)'
      }
    },

    '@keyframes modal-overlay-open': {
      from: {
        opacity: '0'
      },
      to: {
        opacity: '1'
      }
    },
    '@keyframes modal-overlay-closed': {
      from: {
        opacity: '1'
      },
      to: {
        opacity: '0'
      }
    },

    /* ======================

    ====================== */
    // In this Radix implementation the overlay also serves as the top-level
    // modal container. Thus if you were comparing this to Bootstrap's .modal,
    // you will see many of the same CSS properties.

    '.radix-modal-overlay': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: '100%',
      inset: '0px', // Or use top:0, left:0
      outline: '0',
      overflowX: 'hidden',
      overflowY: 'auto',
      position: 'fixed',
      width: '100%',
      // By default the Radix Dialog doesn't even have a zIndex.
      // Instead, it relies entirely on the Portal to put it on top
      // of other content. For the most part that works, but in some
      // cases it needs a little extra help. Bootstrap sets the zIndex
      // of it's modals at 1055. However, the hamburger icon is set at
      // 9998, so we want to use 9999 here.
      zIndex: '9999',
      '&[data-state=closed]': {
        animation: 'modal-overlay-closed 300ms both'
      },
      '&[data-state=open]': {
        animation: 'modal-overlay-open 300ms both'
      }
    },

    /* ======================

    ====================== */

    '.radix-modal-dialog': {
      // The easiest way to adjust the horizontal/vertical spacing around
      // the dialog is to reset the custom property from within Tailwind,
      // using an arbitrary property. For example:
      // dialogClassName='w-[800px] [--modal-dialog-spacing:48px]'
      '--modal-dialog-spacing': '24px',
      '--radix-modal-border-radius': theme('borderRadius.lg'),
      '--radix-modal-border-color': 'var(--border)', // ⚠️ Theme dependent
      marginTop: 'var(--modal-dialog-spacing)',
      marginBottom: 'var(--modal-dialog-spacing)',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 'calc(100% - var(--modal-dialog-spacing) * 2)',
      pointerEvents: 'none',
      position: 'relative',
      // Unless a width is set by the component instance, it will default
      // to whatever 'auto' which will only be constrained by maxWidth.
      width: 'auto'
    },

    /* ======================

    ====================== */

    // The scrollable styles change the implementation such that the .radix-modal-content
    // container becomes scrollable, rather than relying on the .radix-modal-dialog.
    '.radix-modal-dialog-scrollable': {
      height: 'calc(100% - var(--modal-dialog-spacing) * 2)'
    },
    // The only gotcha here is that if you're using dropdowns, selects, etc, that
    // jump out of the modal then you don't want to use this because they will be obscured.
    '.radix-modal-dialog-scrollable [data-slot="modal-content"]': {
      maxHeight: '100%',
      overflow: 'hidden'
    },

    '.radix-modal-dialog-scrollable [data-slot="modal-body"]': {
      overflowY: 'auto'
    },

    /* ======================

    ====================== */

    '.radix-modal-dialog-centered': {
      alignItems: 'center',
      display: 'flex',
      minHeight: 'calc(100% - var(--modal-dialog-spacing) * 2)'
    },

    '.radix-modal-dialog-centered [data-slot="modal-content"]': {
      '&[data-state=closed]': {
        animation: 'modal-content-closed 300ms both'
      },

      '&[data-state=open]': {
        animation: 'modal-content-open 300ms both'
      }
    },

    /* ======================

    ====================== */

    '.radix-modal-fullscreen': {
      width: '100vw',
      maxWidth: 'none',
      height: '100%',
      margin: '0'
    },

    '.radix-modal-fullscreen [data-slot="modal-content"]': {
      height: '100%',
      border: '0',
      borderRadius: '0'
    },

    '.radix-modal-fullscreen [data-slot="modal-header"], .radix-modal-fullscreen [data-slot="modal-footer"]':
      {
        borderRadius: '0'
      },

    '.radix-modal-fullscreen [data-slot="modal-body"]': {
      overflowY: 'auto',
      borderRadius: '0'
    }
  })
})

export default modalPlugin
