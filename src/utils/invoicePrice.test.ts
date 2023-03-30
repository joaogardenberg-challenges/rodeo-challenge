import '@testing-library/react'
import { range } from 'lodash'

const getCostItemPrice = jest.fn()
const getPhasePriceWithFeeOrDiscount = jest.fn()
jest.doMock('./costItemPrice', () => ({ getCostItemPrice }))
jest.doMock('./phasePrice', () => ({ getPhasePriceWithFeeOrDiscount }))

const {
  getInvoicePrice,
  getInvoicePriceWithFeeOrDiscountPercent,
  getInvoicePriceWithTax
} = require('./invoicePrice')

const price = 10
const fee = 6
const discount = -6
const phasePriceWithFee = 56
const costItemsCount = 5
const phasesCount = 2
const taxes = [9, 9, 21, 0, 9]

describe('invoicePrice', () => {
  beforeEach(() => {
    getCostItemPrice.mockReturnValue(price)
    getPhasePriceWithFeeOrDiscount.mockReturnValue(phasePriceWithFee)
  })

  describe('getInvoicePrice', () => {
    it('Returns 0 when no phases', () => {
      const invoice = { phases: [] }
      const invoicePrice = getInvoicePrice(invoice)

      expect(getPhasePriceWithFeeOrDiscount).not.toBeCalled()
      expect(invoicePrice).toBe(0)
    })

    it('Returns the correct phase price', () => {
      const invoice = { phases: range(phasesCount) }
      const invoicePrice = getInvoicePrice(invoice)

      expect(getPhasePriceWithFeeOrDiscount).toBeCalledTimes(phasesCount)
      expect(invoicePrice).toBe(phasesCount * phasePriceWithFee)
    })
  })

  describe('getInvoicePriceWithFeeOrDiscountPercent', () => {
    it('Returns 0 when no phases', () => {
      const invoice = { phases: [] }

      const invoicePriceWithFeeOrDiscountPercent =
        getInvoicePriceWithFeeOrDiscountPercent(invoice)

      expect(getPhasePriceWithFeeOrDiscount).not.toBeCalled()
      expect(invoicePriceWithFeeOrDiscountPercent).toBe(0)
    })

    it('Returns the correct phace price when no feeOrDiscountPercent', () => {
      const invoice = { phases: range(phasesCount) }

      const invoicePriceWithFeeOrDiscountPercent =
        getInvoicePriceWithFeeOrDiscountPercent(invoice)

      expect(getPhasePriceWithFeeOrDiscount).toBeCalledTimes(phasesCount)

      expect(invoicePriceWithFeeOrDiscountPercent).toBe(
        phasesCount * phasePriceWithFee
      )
    })

    it('Returns the correct phace price when feePercent', () => {
      const expectedPriceWithFeePercent = 118.72
      const invoice = { phases: range(phasesCount), feeOrDiscountPercent: fee }

      const invoicePriceWithFeeOrDiscountPercent =
        getInvoicePriceWithFeeOrDiscountPercent(invoice)

      expect(getPhasePriceWithFeeOrDiscount).toBeCalledTimes(phasesCount)

      expect(invoicePriceWithFeeOrDiscountPercent).toBe(
        expectedPriceWithFeePercent
      )
    })

    it('Returns the correct phace price when discountPercent', () => {
      const expectedPriceWithDiscountPercent = 105.28

      const invoice = {
        phases: range(phasesCount),
        feeOrDiscountPercent: discount
      }

      const invoicePriceWithFeeOrDiscountPercent =
        getInvoicePriceWithFeeOrDiscountPercent(invoice)

      expect(getPhasePriceWithFeeOrDiscount).toBeCalledTimes(phasesCount)

      expect(invoicePriceWithFeeOrDiscountPercent).toBe(
        expectedPriceWithDiscountPercent
      )
    })
  })

  describe('getInvoicePriceWithTax', () => {
    it('Returns 0 when no phases', () => {
      const invoice = { phases: [] }
      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).not.toBeCalled()
      expect(invoicePriceWithTax).toBe(0)
    })

    it('Returns the correct phace price when no feeOrDiscount and no feeOrDiscountPercent and no tax', () => {
      const invoice = {
        phases: range(phasesCount).map(() => ({
          costItems: range(costItemsCount).map(() => ({ tax: 0 }))
        }))
      }

      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).toBeCalledTimes(phasesCount * costItemsCount)
      expect(invoicePriceWithTax).toBe(price * phasesCount * costItemsCount)
    })

    it('Returns the correct phace price when fee and no feeOrDiscountPercent and no tax', () => {
      const expectedPriceWithTax = 112

      const invoice = {
        phases: range(phasesCount).map(() => ({
          costItems: range(costItemsCount).map(() => ({ tax: 0 })),
          feeOrDiscount: fee
        }))
      }

      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).toBeCalledTimes(phasesCount * costItemsCount)
      expect(invoicePriceWithTax).toBe(expectedPriceWithTax)
    })

    it('Returns the correct phace price when discount and no feeOrDiscountPercent and no tax', () => {
      const expectedPriceWithTax = 88

      const invoice = {
        phases: range(phasesCount).map(() => ({
          costItems: range(costItemsCount).map(() => ({ tax: 0 })),
          feeOrDiscount: discount
        }))
      }

      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).toBeCalledTimes(phasesCount * costItemsCount)
      expect(invoicePriceWithTax).toBe(expectedPriceWithTax)
    })

    it('Returns the correct phace price when no feeOrDiscount and no feeOrDiscountPercent and tax', () => {
      const expectedPriceWithTax = 109.6

      const invoice = {
        phases: range(phasesCount).map(() => ({
          costItems: range(costItemsCount).map((index) => ({
            tax: taxes[index]
          }))
        }))
      }

      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).toBeCalledTimes(phasesCount * costItemsCount)
      expect(invoicePriceWithTax).toBe(expectedPriceWithTax)
    })

    it('Returns the correct phace price when fee and no feeOrDiscountPercent and tax', () => {
      const expectedPriceWithTax = 131.52
      const newFee = 10

      const invoice = {
        phases: range(phasesCount).map(() => ({
          costItems: range(costItemsCount).map((index) => ({
            tax: taxes[index]
          })),
          feeOrDiscount: newFee
        }))
      }

      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).toBeCalledTimes(phasesCount * costItemsCount)
      expect(invoicePriceWithTax).toBe(expectedPriceWithTax)
    })

    it('Returns the correct phace price when discount and no feeOrDiscountPercent and tax', () => {
      const expectedPriceWithTax = 87.68
      const newDiscount = -10

      const invoice = {
        phases: range(phasesCount).map(() => ({
          costItems: range(costItemsCount).map((index) => ({
            tax: taxes[index]
          })),
          feeOrDiscount: newDiscount
        }))
      }

      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).toBeCalledTimes(phasesCount * costItemsCount)
      expect(invoicePriceWithTax).toBe(expectedPriceWithTax)
    })

    it('Returns the correct phace price when no feeOrDiscount and feePercent and no tax', () => {
      const expectedPriceWithTax = 110
      const newFee = 10

      const invoice = {
        phases: range(phasesCount).map(() => ({
          costItems: range(costItemsCount).map(() => ({ tax: 0 }))
        })),
        feeOrDiscountPercent: newFee
      }

      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).toBeCalledTimes(phasesCount * costItemsCount)
      expect(invoicePriceWithTax).toBe(expectedPriceWithTax)
    })

    it('Returns the correct phace price when fee and feePercent and no tax', () => {
      const expectedPriceWithTax = 123.2
      const newFee = 10

      const invoice = {
        phases: range(phasesCount).map(() => ({
          costItems: range(costItemsCount).map(() => ({ tax: 0 })),
          feeOrDiscount: fee
        })),
        feeOrDiscountPercent: newFee
      }

      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).toBeCalledTimes(phasesCount * costItemsCount)
      expect(invoicePriceWithTax).toBe(expectedPriceWithTax)
    })

    it('Returns the correct phace price when discount and feePercent and no tax', () => {
      const expectedPriceWithTax = 88
      const newFee = 10
      const newDiscount = -10

      const invoice = {
        phases: range(phasesCount).map(() => ({
          costItems: range(costItemsCount).map(() => ({ tax: 0 })),
          feeOrDiscount: newDiscount
        })),
        feeOrDiscountPercent: newFee
      }

      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).toBeCalledTimes(phasesCount * costItemsCount)
      expect(invoicePriceWithTax).toBe(expectedPriceWithTax)
    })

    it('Returns the correct phace price when no feeOrDiscount and feePercent and tax', () => {
      const expectedPriceWithTax = 120.56
      const newFee = 10

      const invoice = {
        phases: range(phasesCount).map(() => ({
          costItems: range(costItemsCount).map((index) => ({
            tax: taxes[index]
          }))
        })),
        feeOrDiscountPercent: newFee
      }

      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).toBeCalledTimes(phasesCount * costItemsCount)
      expect(invoicePriceWithTax).toBe(expectedPriceWithTax)
    })

    it('Returns the correct phace price when fee and feePercent and tax', () => {
      const expectedPriceWithTax = 135.0272
      const newFee = 10

      const invoice = {
        phases: range(phasesCount).map(() => ({
          costItems: range(costItemsCount).map((index) => ({
            tax: taxes[index]
          })),
          feeOrDiscount: fee
        })),
        feeOrDiscountPercent: newFee
      }

      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).toBeCalledTimes(phasesCount * costItemsCount)
      expect(invoicePriceWithTax).toBe(expectedPriceWithTax)
    })

    it('Returns the correct phace price when discount and feePercent and tax', () => {
      const expectedPriceWithTax = 103.6816
      const newFee = 10
      const newDiscount = -7

      const invoice = {
        phases: range(phasesCount).map(() => ({
          costItems: range(costItemsCount).map((index) => ({
            tax: taxes[index]
          })),
          feeOrDiscount: newDiscount
        })),
        feeOrDiscountPercent: newFee
      }

      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).toBeCalledTimes(phasesCount * costItemsCount)
      expect(invoicePriceWithTax).toBe(expectedPriceWithTax)
    })

    it('Returns the correct phace price when no feeOrDiscount and discountPercent and no tax', () => {
      const expectedPriceWithTax = 90
      const newDiscount = -10

      const invoice = {
        phases: range(phasesCount).map(() => ({
          costItems: range(costItemsCount).map(() => ({ tax: 0 }))
        })),
        feeOrDiscountPercent: newDiscount
      }

      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).toBeCalledTimes(phasesCount * costItemsCount)
      expect(invoicePriceWithTax).toBe(expectedPriceWithTax)
    })

    it('Returns the correct phace price when fee and discountPercent and no tax', () => {
      const expectedPriceWithTax = 100.8
      const newDiscount = -10

      const invoice = {
        phases: range(phasesCount).map(() => ({
          costItems: range(costItemsCount).map(() => ({ tax: 0 })),
          feeOrDiscount: fee
        })),
        feeOrDiscountPercent: newDiscount
      }

      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).toBeCalledTimes(phasesCount * costItemsCount)
      expect(invoicePriceWithTax).toBe(expectedPriceWithTax)
    })

    it('Returns the correct phace price when discount and discountPercent and no tax', () => {
      const expectedPriceWithTax = 79.2
      const newDiscount = -10

      const invoice = {
        phases: range(phasesCount).map(() => ({
          costItems: range(costItemsCount).map(() => ({ tax: 0 })),
          feeOrDiscount: discount
        })),
        feeOrDiscountPercent: newDiscount
      }

      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).toBeCalledTimes(phasesCount * costItemsCount)
      expect(invoicePriceWithTax).toBe(expectedPriceWithTax)
    })

    it('Returns the correct phace price when no feeOrDiscount and discountPercent and tax', () => {
      const expectedPriceWithTax = 97.544
      const newDiscount = -11

      const invoice = {
        phases: range(phasesCount).map(() => ({
          costItems: range(costItemsCount).map((index) => ({
            tax: taxes[index]
          }))
        })),
        feeOrDiscountPercent: newDiscount
      }

      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).toBeCalledTimes(phasesCount * costItemsCount)
      expect(invoicePriceWithTax).toBe(expectedPriceWithTax)
    })

    it('Returns the correct phace price when fee and discountPercent and tax', () => {
      const expectedPriceWithTax = 110.4768
      const newDiscount = -10

      const invoice = {
        phases: range(phasesCount).map(() => ({
          costItems: range(costItemsCount).map((index) => ({
            tax: taxes[index]
          })),
          feeOrDiscount: fee
        })),
        feeOrDiscountPercent: newDiscount
      }

      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).toBeCalledTimes(phasesCount * costItemsCount)
      expect(invoicePriceWithTax).toBe(expectedPriceWithTax)
    })

    it('Returns the correct phace price when discount and discountPercent and tax', () => {
      const expectedPriceWithTax = 78.912
      const newDiscount = -10

      const invoice = {
        phases: range(phasesCount).map(() => ({
          costItems: range(costItemsCount).map((index) => ({
            tax: taxes[index]
          })),
          feeOrDiscount: newDiscount
        })),
        feeOrDiscountPercent: newDiscount
      }

      const invoicePriceWithTax = getInvoicePriceWithTax(invoice)

      expect(getCostItemPrice).toBeCalledTimes(phasesCount * costItemsCount)
      expect(invoicePriceWithTax).toBe(expectedPriceWithTax)
    })
  })
})
