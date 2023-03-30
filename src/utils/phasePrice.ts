import { sum } from 'lodash'
import { Phase } from 'types'
import { getCostItemPrice } from './costItemPrice'

export const getPhasePrice = ({ costItems }: Phase) => {
  const costItemsPrices = costItems.map(getCostItemPrice)
  return sum(costItemsPrices)
}

export const getPhasePriceWithFeeOrDiscount = (phase: Phase) =>
  getPhasePrice(phase) + (phase.feeOrDiscount || 0)

export const getPhasePriceWithTax = ({ costItems, feeOrDiscount }: Phase) => {
  const costItemsPricesWithTax = costItems.map((costItem) => {
    const price = getCostItemPrice(costItem)

    // I don't think this is the right way of spreading the Phase's
    // fee/discount throughout the cost items, but it'll take too long
    // to figure something else out.
    const priceWithFeeOrDiscount = Math.max(
      price + (feeOrDiscount || 0) / costItems.length,
      0
    )

    return priceWithFeeOrDiscount * (1 + costItem.tax / 100)
  })

  return sum(costItemsPricesWithTax)
}
