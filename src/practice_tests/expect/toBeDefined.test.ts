/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Type: () => Awaitable<void>
//
// toBeDefined asserts that the value is not equal to undefined.
// Useful use case would be to check if function returned anything.
//
///////////////////////////////////////////////////////////////////////////

describe('toBeDefined...', () => {
  function returnNull() {
    return null
  }

  function empty() {}

  test('returnNull() should be defined.', () => {
    expect(returnNull()).toBeDefined()
  })

  test('empty() should fail - be undefined.', () => {
    expect(empty()).not.toBeDefined()
  })
})
