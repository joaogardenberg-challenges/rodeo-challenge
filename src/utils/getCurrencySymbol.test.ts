import '@testing-library/react'
import getCurrencySymbol from './getCurrencySymbol'

describe('getCurrencySymbol', () => {
  it('Correctly gets the currency symbol for USD', () => {
    const currency = 'USD'
    const currencySymbol = getCurrencySymbol(currency)
    expect(currencySymbol).toBe('$')
  })

  it('Correctly gets the currency symbol for EUR', () => {
    const currency = 'EUR'
    const currencySymbol = getCurrencySymbol(currency)
    expect(currencySymbol).toBe('€')
  })
})
