import '@testing-library/react'
import { range } from 'lodash'

const getCostItemPrice = jest.fn()
jest.doMock('./costItemPrice', () => ({ getCostItemPrice }))

const {
  getPhasePrice,
  getPhasePriceWithFeeOrDiscount,
  getPhasePriceWithTax
} = require('./phasePrice')

const price = 10
const fee = 6
const discount = -6
const costItemsCount = 5
const taxes = [9, 9, 21, 0, 9]

describe('phasePrice', () => {
  beforeEach(() => {
    getCostItemPrice.mockReturnValue(price)
  })

  describe('getPhasePrice', () => {
    it('Returns 0 when no costItems', () => {
      const phase = { costItems: [] }
      const phasePrice = getPhasePrice(phase)

      expect(getCostItemPrice).not.toBeCalled()
      expect(phasePrice).toBe(0)
    })

    it('Returns the correct phase price', () => {
      const costItemsCount = 5
      const phase = { costItems: range(costItemsCount) }
      const phasePrice = getPhasePrice(phase)

      expect(getCostItemPrice).toBeCalledTimes(costItemsCount)
      expect(phasePrice).toBe(price * costItemsCount)
    })
  })

  describe('getPhasePriceWithFeeOrDiscount', () => {
    it('Returns 0 when no costItems and no feeOrDiscount', () => {
      const phase = { costItems: [] }
      const phasePriceWithFeeOrDiscount = getPhasePriceWithFeeOrDiscount(phase)

      expect(getCostItemPrice).not.toBeCalled()
      expect(phasePriceWithFeeOrDiscount).toBe(0)
    })

    it('Returns the fee when no costItems and fee', () => {
      const phase = { costItems: [], feeOrDiscount: fee }
      const phasePriceWithFeeOrDiscount = getPhasePriceWithFeeOrDiscount(phase)

      expect(getCostItemPrice).not.toBeCalled()
      expect(phasePriceWithFeeOrDiscount).toBe(fee)
    })

    it('Returns 0 when no costItems and discount', () => {
      const phase = { costItems: [], feeOrDiscount: discount }
      const phasePriceWithFeeOrDiscount = getPhasePriceWithFeeOrDiscount(phase)

      expect(getCostItemPrice).not.toBeCalled()
      expect(phasePriceWithFeeOrDiscount).toBe(0)
    })

    it('Returns 0 when discount is higher than the price', () => {
      const phase = { costItems: range(costItemsCount), feeOrDiscount: -56 }
      const phasePriceWithFeeOrDiscount = getPhasePriceWithFeeOrDiscount(phase)

      expect(getCostItemPrice).toBeCalledTimes(costItemsCount)
      expect(phasePriceWithFeeOrDiscount).toBe(0)
    })

    it('Returns the correct phase price with no feeOrDiscount', () => {
      const phase = { costItems: range(costItemsCount) }
      const phasePriceWithFeeOrDiscount = getPhasePriceWithFeeOrDiscount(phase)

      expect(getCostItemPrice).toBeCalledTimes(costItemsCount)
      expect(phasePriceWithFeeOrDiscount).toBe(price * costItemsCount)
    })

    it('Returns the correct phase price with fee', () => {
      const phase = { costItems: range(costItemsCount), feeOrDiscount: fee }
      const phasePriceWithFeeOrDiscount = getPhasePriceWithFeeOrDiscount(phase)

      expect(getCostItemPrice).toBeCalledTimes(costItemsCount)
      expect(phasePriceWithFeeOrDiscount).toBe(price * costItemsCount + fee)
    })

    it('Returns the correct phase price with discount', () => {
      const phase = {
        costItems: range(costItemsCount),
        feeOrDiscount: discount
      }

      const phasePriceWithFeeOrDiscount = getPhasePriceWithFeeOrDiscount(phase)

      expect(getCostItemPrice).toBeCalledTimes(costItemsCount)

      expect(phasePriceWithFeeOrDiscount).toBe(
        price * costItemsCount + discount
      )
    })
  })

  describe('getPhasePriceWithTax', () => {
    it('Returns 0 when no costItems, no feeOrDiscount', () => {
      const phase = { costItems: [] }
      const phasePriceWithTax = getPhasePriceWithTax(phase)

      expect(getCostItemPrice).not.toBeCalled()
      expect(phasePriceWithTax).toBe(0)
    })

    it('Returns the fee when no costItems', () => {
      const phase = { costItems: [], feeOrDiscount: fee }
      const phasePriceWithTax = getPhasePriceWithTax(phase)

      expect(getCostItemPrice).not.toBeCalled()
      expect(phasePriceWithTax).toBe(fee)
    })

    it('Returns 0 when discount and no costItems', () => {
      const phase = { costItems: [], feeOrDiscount: discount }
      const phasePriceWithTax = getPhasePriceWithTax(phase)

      expect(getCostItemPrice).not.toBeCalled()
      expect(phasePriceWithTax).toBe(0)
    })

    it('Returns 0 when discount is higher than the price', () => {
      const phase = {
        costItems: range(costItemsCount).map(() => ({ tax: 0 })),
        feeOrDiscount: -56
      }

      const phasePriceWithTax = getPhasePriceWithTax(phase)

      expect(getCostItemPrice).toBeCalledTimes(costItemsCount)
      expect(phasePriceWithTax).toBe(0)
    })

    it('Returns the correct phase price with no feeOrDiscount and no tax', () => {
      const phase = { costItems: range(costItemsCount).map(() => ({ tax: 0 })) }
      const phasePriceWithTax = getPhasePriceWithTax(phase)

      expect(getCostItemPrice).toBeCalledTimes(costItemsCount)
      expect(phasePriceWithTax).toBe(price * costItemsCount)
    })

    it('Returns the correct phase price with fee and no tax', () => {
      const phase = {
        costItems: range(costItemsCount).map(() => ({ tax: 0 })),
        feeOrDiscount: fee
      }

      const phasePriceWithTax = getPhasePriceWithTax(phase)

      expect(getCostItemPrice).toBeCalledTimes(costItemsCount)
      expect(phasePriceWithTax).toBe(price * costItemsCount + fee)
    })

    it('Returns the correct phase price with discount and no tax', () => {
      const phase = {
        costItems: range(costItemsCount).map(() => ({ tax: 0 })),
        feeOrDiscount: discount
      }

      const phasePriceWithTax = getPhasePriceWithTax(phase)

      expect(getCostItemPrice).toBeCalledTimes(costItemsCount)
      expect(phasePriceWithTax).toBe(price * costItemsCount + discount)
    })

    it('Returns the correct phase price with no feeOrDiscount and tax', () => {
      const expectedPriceWithTax = 54.8

      const phase = {
        costItems: range(costItemsCount).map((index) => ({ tax: taxes[index] }))
      }

      const phasePriceWithTax = getPhasePriceWithTax(phase)

      expect(getCostItemPrice).toBeCalledTimes(costItemsCount)
      expect(phasePriceWithTax).toBe(expectedPriceWithTax)
    })

    it('Returns the correct phase price with fee and tax', () => {
      const newFee = 10
      const expectedPriceWithFeeAndTax = 65.76

      const phase = {
        costItems: range(costItemsCount).map((index) => ({
          tax: taxes[index]
        })),
        feeOrDiscount: newFee
      }

      const phasePriceWithTax = getPhasePriceWithTax(phase)

      expect(getCostItemPrice).toBeCalledTimes(costItemsCount)
      expect(phasePriceWithTax).toBe(expectedPriceWithFeeAndTax)
    })

    it('Returns the correct phase price with discount and tax', () => {
      const newDiscount = -10
      const expectedPriceWithDiscountAndTax = 43.84

      const phase = {
        costItems: range(costItemsCount).map((index) => ({
          tax: taxes[index]
        })),
        feeOrDiscount: newDiscount
      }

      const phasePriceWithTax = getPhasePriceWithTax(phase)

      expect(getCostItemPrice).toBeCalledTimes(costItemsCount)
      expect(phasePriceWithTax).toBe(expectedPriceWithDiscountAndTax)
    })
  })
})
