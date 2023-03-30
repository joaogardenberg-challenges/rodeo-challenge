import { Invoice } from 'types'

export default function getCurrencySymbol(currency: Invoice['currency']) {
  return { EUR: '€', USD: '$' }[currency]
}
