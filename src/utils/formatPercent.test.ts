import '@testing-library/react'
import formatPercent from './formatPercent'

describe('formatPercent', () => {
  it('Correctly formats a number with no fraction digits', () => {
    const number = 10
    const formatted = formatPercent(number)
    expect(formatted).toBe('10')
  })

  it('Correctly formats a number with 1 fraction digit', () => {
    const number = 10.1
    const formatted = formatPercent(number)
    expect(formatted).toBe('10.1')
  })

  it('Correctly formats a number with 2 fraction digits', () => {
    const number = 10.12
    const formatted = formatPercent(number)
    expect(formatted).toBe('10.12')
  })

  it('Correctly formats a number with 3+ fraction digits', () => {
    const number = 10.123
    const formatted = formatPercent(number)
    expect(formatted).toBe('10.12')
  })
})
