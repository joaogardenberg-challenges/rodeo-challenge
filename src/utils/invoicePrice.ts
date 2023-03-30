import { sum } from 'lodash'
import { Invoice } from 'types'
import { getCostItemPrice } from './costItemPrice'
import { getPhasePriceWithFeeOrDiscount } from './phasePrice'

export const getInvoicePrice = ({ phases }: Invoice) => {
  const phasesPrices = phases.map(getPhasePriceWithFeeOrDiscount)
  return sum(phasesPrices)
}

export const getInvoicePriceWithFeeOrDiscountPercent = (invoice: Invoice) =>
  getInvoicePrice(invoice) * (1 + (invoice.feeOrDiscountPercent || 0) / 100)

export const getInvoicePriceWithTax = ({
  phases,
  feeOrDiscountPercent
}: Invoice) => {
  const phasesPricesWithTax = phases.map(({ costItems, feeOrDiscount }) => {
    const costItemsPricesWithTax = costItems.map((costItem) => {
      const price = getCostItemPrice(costItem)

      // I don't think this is the right way of spreading the Phase's
      // fee/discount throughout the cost items, but it'll take too long
      // to figure something else out.
      const priceWithFeeOrDiscount = Math.max(
        price + (feeOrDiscount || 0) / costItems.length,
        0
      )

      const priceWithFeeOrDiscountPercent =
        priceWithFeeOrDiscount * (1 + (feeOrDiscountPercent || 0) / 100)

      return priceWithFeeOrDiscountPercent * (1 + costItem.tax / 100)
    })

    return sum(costItemsPricesWithTax)
  })

  return sum(phasesPricesWithTax)
}
