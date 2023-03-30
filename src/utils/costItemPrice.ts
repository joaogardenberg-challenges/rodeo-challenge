import { CostItem } from 'types'

export const getCostItemPrice = ({
  billedPerUnit,
  price,
  hours,
  units
}: CostItem) => {
  const quantity = billedPerUnit ? units || 1 : hours || 1
  return price * quantity
}
