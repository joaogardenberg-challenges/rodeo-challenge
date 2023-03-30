import '@testing-library/react'
import { getCostItemPrice } from './costItemPrice'

const common = {
  id: '',
  name: '',
  tax: 0 as const
}

describe('costItemPrice', () => {
  describe('getCostItemPrice', () => {
    it('Multiplies correctly by the hours', () => {
      const price = 10
      const hours = 5
      const costItem = { ...common, billedPerUnit: false, price, hours }
      const totalPrice = getCostItemPrice(costItem)
      expect(totalPrice).toBe(price * hours)
    })

    it('Multiplies correctly by the units', () => {
      const price = 10
      const units = 5
      const costItem = { ...common, billedPerUnit: true, price, units }
      const totalPrice = getCostItemPrice(costItem)
      expect(totalPrice).toBe(price * units)
    })

    it('Multiplies correctly when no hours', () => {
      const price = 10
      const costItem = { ...common, billedPerUnit: false, price }
      const totalPrice = getCostItemPrice(costItem)
      expect(totalPrice).toBe(price)
    })

    it('Multiplies correctly when no units', () => {
      const price = 10
      const costItem = { ...common, billedPerUnit: true, price }
      const totalPrice = getCostItemPrice(costItem)
      expect(totalPrice).toBe(price)
    })
  })
})
