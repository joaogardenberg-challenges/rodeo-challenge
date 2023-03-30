export const query = /* GraphQL */ `
  query test {
    invoice {
      name
      currency
      feeOrDiscountPercent
      phases {
        id
        name
        feeOrDiscount
        costItems {
          id
          name
          billedPerUnit
          hours
          units
          price
          tax
        }
      }
    }
  }
`

export default query
