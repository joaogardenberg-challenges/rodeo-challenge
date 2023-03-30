import { useContext } from 'react'
import getCurrencySymbol from 'utils/getCurrencySymbol'
import formatPrice from 'utils/formatPrice'
import {
  getPhasePrice,
  getPhasePriceWithFeeOrDiscount,
  getPhasePriceWithTax
} from 'utils/phasePrice'
import { InvoiceContext } from 'components/invoice/Invoice'
import { PhaseContext } from './Phase'

export default function SubtotalPrice() {
  const { currency } = useContext(InvoiceContext)
  const phase = useContext(PhaseContext)
  const { feeOrDiscount } = phase
  const currencySymbol = getCurrencySymbol(currency)
  const subtotalPrice = getPhasePrice(phase)
  const subtotalWithFeeOrDiscount = getPhasePriceWithFeeOrDiscount(phase)
  const subtotalWithTax = getPhasePriceWithTax(phase)
  const taxAmount = subtotalWithTax - subtotalWithFeeOrDiscount

  const feeOrDiscountText = feeOrDiscount
    ? feeOrDiscount > 0
      ? 'fee'
      : 'discount'
    : null

  const feeOrDiscountSymbol = feeOrDiscount
    ? feeOrDiscount > 0
      ? '+'
      : '-'
    : null

  return (
    <>
      <li className="cost-item cost-item--subtotal">
        <span className="cost-item__name">Phase's subtotal price</span>
        <span hidden>: </span>
        <span className="cost-item__tax" />
        <span className="cost-item__description" />
        <span className="cost-item__price" data-testid="subtotal-price">
          {currencySymbol}
          {formatPrice(subtotalPrice)}
        </span>
      </li>
      {Boolean(feeOrDiscount) && (
        <li className="cost-item cost-item--subtotal">
          <span className="cost-item__name" data-testid="fee-or-discount-label">
            Phase's subtotal price with {feeOrDiscountText}
          </span>
          <span hidden>: </span>
          <span className="cost-item__tax" />
          <span
            className="cost-item__description"
            data-testid="fee-or-discount-amount"
          >
            {feeOrDiscountSymbol} {currencySymbol}
            {formatPrice(Math.abs(feeOrDiscount))}
          </span>
          <span hidden> = </span>
          <span
            className="cost-item__price"
            data-testid="fee-or-discount-price"
          >
            {currencySymbol}
            {formatPrice(subtotalWithFeeOrDiscount)}
          </span>
        </li>
      )}
      <li className="cost-item cost-item--subtotal">
        <span className="cost-item__name">Phase's total price with tax</span>
        <span hidden>: </span>
        <span className="cost-item__tax" />
        <span className="cost-item__description" data-testid="tax-amount">
          + {currencySymbol}
          {formatPrice(taxAmount)}
        </span>
        <span hidden> = </span>
        <span className="cost-item__price" data-testid="total-price">
          {currencySymbol}
          {formatPrice(subtotalWithTax)}
        </span>
      </li>
    </>
  )
}
