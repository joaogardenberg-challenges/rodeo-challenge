import '@testing-library/react'
import formatPrice from './formatPrice'

describe('formatPrice', () => {
  it('Correctly formats a number with no fraction digits', () => {
    const number = 10
    const formatted = formatPrice(number)
    expect(formatted).toBe('10.00')
  })

  it('Correctly formats a number with 1 fraction digit', () => {
    const number = 10.1
    const formatted = formatPrice(number)
    expect(formatted).toBe('10.10')
  })

  it('Correctly formats a number with 2 fraction digits', () => {
    const number = 10.12
    const formatted = formatPrice(number)
    expect(formatted).toBe('10.12')
  })

  it('Correctly formats a number with 3+ fraction digits', () => {
    const number = 10.123
    const formatted = formatPrice(number)
    expect(formatted).toBe('10.12')
  })
})
