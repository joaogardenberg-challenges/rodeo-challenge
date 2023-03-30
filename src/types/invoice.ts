export interface CostItem {
  id: string
  name: string
  price: number
  tax: 0 | 9 | 21
  billedPerUnit: boolean // If false, it's billed per hour
  hours?: number
  units?: number
}

export interface Phase {
  id: string
  name: string
  feeOrDiscount?: number | null
  costItems: CostItem[]
}

export interface Invoice {
  name: string
  currency: 'USD' | 'EUR'
  feeOrDiscountPercent?: number | null
  phases: Phase[]
}

export interface Query {
  invoice: Invoice
}
