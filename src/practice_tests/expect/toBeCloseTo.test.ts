/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Type: (value: number, numDigits?: number) => Awaitable<void>
//
// Use toBeCloseTo to compare floating-point numbers.
// The optional numDigits argument limits the number of
// digits to check after the decimal point. For example:
//
///////////////////////////////////////////////////////////////////////////

describe('toBeCloseTo...', () => {
  test('decimals are not equal in javascript', () => {
    expect(0.2 + 0.1).not.toBe(0.3) // 0.2 + 0.1 is 0.30000000000000004
  })

  test('decimals are rounded to 5 after the point', () => {
    // 0.2 + 0.1 is 0.30000 | "000000000004" removed
    expect(0.2 + 0.1).toBeCloseTo(0.3, 5)

    // nothing from 0.30000000000000004 is removed
    expect(0.2 + 0.1).not.toBeCloseTo(0.3, 50)
  })
})
