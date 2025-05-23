import plugin from 'tailwindcss/plugin'

/* ========================================================================
                              listGroupPlugin
======================================================================== */

export const listGroupPlugin = plugin(function (pluginApi) {
  const { addComponents /* , theme */ } = pluginApi

  addComponents({
    '.list-group': {
      // Allows consumer to change border color. For exmaple,
      // with Tailwind we can use an arbitrary property as follows:
      // className='[--list-group-border-color:theme(colors.violet.800)]'
      // Originally, in Bootstrap they used rgba(0, 0, 0, 0.2). This is
      // actually a bad idea because it doesn't really work when you flip
      // to dark mode.
      '--list-group-border-color': `var(--border)`,
      // Allows consumer to change active bg/border color. For exmaple,
      // with Tailwind we can use an arbitrary property as follows:
      // className='[--list-group-active-bg-color:theme(colors.violet.700)]'
      '--list-group-active-bg-color': 'var(--color-primary)',
      '--list-group-item-action-hover-color': `var(--color-accent)`,
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      flexDirection: 'column',
      fontSize: 'var(--text-base)',
      marginBottom: '0',
      paddingLeft: '0'
    },
    '.list-group-numbered': {
      listStyleType: 'none',
      counterReset: 'section'
    },
    ///////////////////////////////////////////////////////////////////////////
    //
    // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_counter_styles/Using_CSS_counters
    // Gotcha: Bootstrap uses .list-group-numbered > li:before
    // However, it's much more versatile to use * instead.
    //
    // The numbering system will work with <ul> or <ol> even though <ol> is semantically correct.
    // counters() is used so that nested lists will inherit the numbering system (e.g., 2.1, 2.2, etc.)
    // Notice that in the following example the nested <ol> must have at least .list-group-numbered on it.
    //
    //   <ol className='list-group list-group-numbered mx-auto mb-6 max-w-md'>
    //     <li className='list-group-item'>An item</li>
    //     <li className='list-group-item'>
    //       A second item
    //       <ol className='list-group-numbered ml-2 mt-1 space-y-2 text-sm'>
    //         <li>Sub Item 1</li>
    //         <li>Sub Item 2</li>
    //       </ol>
    //     </li>
    //     <li className='list-group-item'>A third item</li>
    //   </ol>
    //
    ///////////////////////////////////////////////////////////////////////////
    '.list-group-numbered > *:before': {
      content: 'counters(section, ".") ". "',
      counterIncrement: 'section',
      fontWeight: 'var(--font-weight-semibold)'
    },
    '.list-group-item-action': {
      textAlign: 'inherit',
      width: '100%'
    },
    '.list-group-item-action:hover, .list-group-item-action:focus': {
      backgroundColor: `var(--list-group-item-action-hover-color, var(--color-accent))`,
      cursor: 'pointer',
      outline: 'none',
      textDecoration: 'none',
      zIndex: '1'
    },

    '.list-group-item-action:focus-visible': {
      outline: `1px solid var(--list-group-active-bg-color, var(--list-group-active-bg-color))`,
      outlineOffset: '-1px'
    },

    '.list-group-item-action:active': {
      color: '#fff',
      backgroundColor: `var(--list-group-active-bg-color, var(--list-group-active-bg-color))`,
      borderColor: `var(--list-group-active-bg-color, var(--list-group-active-bg-color))`
    },

    '.list-group-item': {
      backgroundColor: 'var(--background-light, #fff)',
      border: '1px solid var(--list-group-border-color)',
      display: 'block',
      padding: 'calc(var(--spacing)*2) calc(var(--spacing)*4)', // '8px 16px'
      position: 'relative',
      textDecoration: 'none'
    },

    '.list-group-xs .list-group-item': {
      fontSize: 'var(--text-xs)',
      padding: 'calc(var(--spacing)*0.5) var(--spacing)' // '2px 4px
    },
    '.list-group-sm .list-group-item': {
      fontSize: 'var(--text-sm)',
      padding: 'var(--spacing) calc(var(--spacing)*2)' // '4px 8px'
    },
    '.list-group-lg .list-group-item': {
      fontSize: 'var(--text-lg)',
      padding: 'calc(var(--spacing)*2.5) calc(var(--spacing)*5)' // '10px 20px'
    },
    // Could add xl, 2xl, etc., but not currently needed.
    '.list-group-item:first-child': {
      borderTopLeftRadius: 'inherit',
      borderTopRightRadius: 'inherit'
    },
    '.list-group-item:last-child': {
      borderBottomLeftRadius: 'inherit',
      borderBottomRightRadius: 'inherit'
    },
    '.list-group-item.disabled, .list-group-item:disabled': {
      backgroundColor: '#fff',
      color: `var(--color-stone-400)`,
      pointerEvents: 'none'
    },
    '.list-group-item.active': {
      backgroundColor: 'var(--list-group-active-bg-color)',
      borderColor: 'var(--list-group-active-bg-color)',
      color: '#fff',
      zIndex: '2'
    },
    '.list-group-item + .list-group-item': {
      borderTopWidth: '0'
    },
    '.list-group-item + .list-group-item.active': {
      borderTopWidth: '1px',
      marginTop: '-1px'
    },
    ///////////////////////////////////////////////////////////////////////////
    //
    // Notice that in the case of .list-group-horizontal we put the box-shadow
    // in the individual items.
    //
    // <ul className='list-group list-group-horizontal mx-auto mb-6 justify-center'>
    //   <li className='list-group-item shadow-lg'>An item</li>
    //   <li className='list-group-item shadow-lg'>A second item</li>
    //   <li className='list-group-item shadow-lg'>A third item</li>
    //   <li className='list-group-item shadow-lg'>A fourth item</li>
    //   <li className='list-group-item shadow-lg'>And a fifth one</li>
    // </ul>
    //
    ///////////////////////////////////////////////////////////////////////////
    //# What happens when list-group-horizontal is longer than viewport width?
    '.list-group-horizontal': {
      flexDirection: 'row'
    },
    '.list-group-horizontal > .list-group-item:first-child': {
      borderBottomLeftRadius: 'inherit',
      borderTopRightRadius: '0'
    },
    '.list-group-horizontal > .list-group-item:last-child': {
      borderBottomLeftRadius: '0',
      borderTopRightRadius: 'inherit'
    },
    '.list-group-horizontal > .list-group-item.active': {
      marginTop: '0'
    },
    '.list-group-horizontal > .list-group-item + .list-group-item': {
      borderLeftWidth: '0',
      borderTopWidth: '1px'
    },
    '.list-group-horizontal > .list-group-item + .list-group-item.active': {
      borderLeftWidth: '1px',
      marginLeft: '-1px'
    },
    // Omitted responsive styles for .list-group-horizontal-sm, .list-group-horizontal-md,
    // .list-group-horizontal-lg, .list-group-horizontal-xl, .list-group-horizontal-xxl
    '.list-group-flush': {
      borderRadius: '0'
    },
    '.list-group-flush > .list-group-item': {
      borderWidth: '0 0 1px'
    },
    '.list-group-flush > .list-group-item:last-child': {
      borderBottomWidth: '0'
    }
    // Omitted styles for color-specific variations.
  })
})

export default listGroupPlugin
