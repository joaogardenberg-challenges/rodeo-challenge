export default function formatPrice(price: number) {
  return price.toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
