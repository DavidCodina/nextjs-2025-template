import { render, screen } from '@testing-library/react'

/* ========================================================================
            
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// https://github.com/testing-library/jest-dom?tab=readme-ov-file#tohavestyle
// toHaveStyle(css: string | object)
//
// This allows you to check if a certain element has some specific css properties
// with specific values applied. It matches only if the element has all the expected
// properties applied, not just some of them.
//
// This also works with rules that are applied to the element via a class name for which
// some rules are defined in a stylesheet currently active in the document. The usual
// rules of css precedence apply.
//
///////////////////////////////////////////////////////////////////////////

describe('toHaveStyle...', () => {
  test('should pass', () => {
    render(
      <>
        <button
          data-testid='delete-button'
          style={{
            display: 'none',
            backgroundColor: 'red'
          }}
        >
          Delete item
        </button>
      </>
    )

    const button = screen.getByTestId('delete-button')

    expect(button).toHaveStyle('display: none')
    expect(button).toHaveStyle({ display: 'none' })

    // ⚠️ Gotcha: In Vitest, 'red' gets converted to 'rgb(255, 0, 0)'.
    // However, this doesn't seem to happen in Jest.
    // expect(button).toHaveStyle('display: none; background-color: rgb(255, 0, 0);')

    expect(button).toHaveStyle('display: none; background-color: red;')
    // ⚠️ Gotcha: In Vitest, 'red' gets converted to 'rgb(255, 0, 0)'.
    // However, this doesn't seem to happen in Jest.
    // expect(button).toHaveStyle({  backgroundColor: 'rgb(255, 0, 0)', display: 'none' })
    expect(button).toHaveStyle({
      backgroundColor: 'red',
      display: 'none'
    })

    expect(button).not.toHaveStyle(`background-color: blue; display: none;`)
    expect(button).not.toHaveStyle({
      backgroundColor: 'blue',
      display: 'none'
    })
  })
})
