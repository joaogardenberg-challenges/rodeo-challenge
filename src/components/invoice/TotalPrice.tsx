import { useContext } from 'react'
import formatPercent from 'utils/formatPercent'
import formatPrice from 'utils/formatPrice'
import getCurrencySymbol from 'utils/getCurrencySymbol'
import {
  getInvoicePrice,
  getInvoicePriceWithFeeOrDiscountPercent,
  getInvoicePriceWithTax
} from 'utils/invoicePrice'
import StyledTotalPrice from './TotalPrice.styled'
import { InvoiceContext } from './Invoice'

export default function TotalPrice() {
  const invoice = useContext(InvoiceContext)
  const { currency, feeOrDiscountPercent } = invoice
  const currencySymbol = getCurrencySymbol(currency)
  const subtotalPrice = getInvoicePrice(invoice)

  const subtotalWithFeeOrDiscountPercent =
    getInvoicePriceWithFeeOrDiscountPercent(invoice)

  const subtotalWithTax = getInvoicePriceWithTax(invoice)
  const feeOrDiscountAmount = subtotalWithFeeOrDiscountPercent - subtotalPrice
  const taxAmount = subtotalWithTax - subtotalWithFeeOrDiscountPercent

  const feeOrDiscountText = feeOrDiscountPercent
    ? feeOrDiscountPercent > 0
      ? 'fee'
      : 'discount'
    : null

  const feeOrDiscountSymbol = feeOrDiscountPercent
    ? feeOrDiscountPercent > 0
      ? '+'
      : '-'
    : null

  return (
    <StyledTotalPrice className="total-price-section">
      <h2 className="total-title">Total</h2>
      <ol className="total-prices">
        <li className="cost-item cost-item--labels" aria-hidden>
          <span className="cost-item__name" />
          <span className="cost-item__tax" />
          <span className="cost-item__description">Description</span>
          <span className="cost-item__price">Price</span>
        </li>
        <li className="cost-item cost-item--total">
          <span className="cost-item__name">Subtotal price</span>
          <span hidden>: </span>
          <span className="cost-item__tax" />
          <span className="cost-item__description" />
          <span className="cost-item__price">
            {currencySymbol}
            {formatPrice(subtotalPrice)}
          </span>
        </li>
        {Boolean(feeOrDiscountPercent) && (
          <li className="cost-item cost-item--total">
            <span className="cost-item__name">
              Subtotal price with {feeOrDiscountText}{' '}
              <span className="cost-item__number">
                ({feeOrDiscountSymbol}{' '}
                {formatPercent(Math.abs(feeOrDiscountPercent))}%)
              </span>
            </span>
            <span hidden>: </span>
            <span className="cost-item__tax" />
            <span className="cost-item__description">
              {feeOrDiscountSymbol} {currencySymbol}
              {formatPrice(Math.abs(feeOrDiscountAmount))}
            </span>
            <span hidden> = </span>
            <span className="cost-item__price">
              {currencySymbol}
              {formatPrice(subtotalWithFeeOrDiscountPercent)}
            </span>
          </li>
        )}
        <li className="cost-item cost-item--total">
          <span className="cost-item__name">Total price with tax</span>
          <span hidden>: </span>
          <span className="cost-item__tax" />
          <span className="cost-item__description">
            + {currencySymbol}
            {formatPrice(taxAmount)}
          </span>
          <span hidden> = </span>
          <span className="cost-item__price">
            {currencySymbol}
            {formatPrice(subtotalWithTax)}
          </span>
        </li>
      </ol>
    </StyledTotalPrice>
  )
}
