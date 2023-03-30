export default function formatPercent(price: number) {
  return price.toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
}
