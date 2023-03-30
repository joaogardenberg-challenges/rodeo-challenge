import { useContext, useMemo } from 'react'
import { CostItem as CostItemType } from 'types'
import getCurrencySymbol from 'utils/getCurrencySymbol'
import formatPrice from 'utils/formatPrice'
import formatPercent from 'utils/formatPercent'
import { getCostItemPrice } from 'utils/costItemPrice'
import { InvoiceContext } from 'components/invoice/Invoice'

interface CostItemProps {
  costItem: CostItemType
}

export default function CostItem({ costItem }: CostItemProps) {
  const { currency } = useContext(InvoiceContext)
  const currencySymbol = getCurrencySymbol(currency)
  const { billedPerUnit, name, price, tax, hours, units } = costItem
  const totalPrice = getCostItemPrice(costItem)
  const quantity = billedPerUnit ? units || 1 : hours || 1
  const formattedQuantity = `${quantity < 10 ? '0' : ''}${quantity}`

  const costUnit = useMemo(
    () => `${billedPerUnit ? 'unit' : 'hour'}${quantity === 1 ? '' : 's'}`,
    [billedPerUnit, quantity]
  )

  return (
    <li className="cost-item">
      <span hidden>Name: </span>
      <span className="cost-item__name" data-testid="name">
        {name}
      </span>
      <span hidden>, Tax: </span>
      <span className="cost-item__tax" data-testid="tax">
        {formatPercent(tax)}%
      </span>
      <span hidden>, Description: </span>
      <span className="cost-item__description" data-testid="description">
        {currencySymbol}
        {formatPrice(price)} x {formattedQuantity} {costUnit}
      </span>
      <span hidden>, Price: </span>
      <span className="cost-item__price" data-testid="price">
        {currencySymbol}
        {formatPrice(totalPrice)}
      </span>
    </li>
  )
}
