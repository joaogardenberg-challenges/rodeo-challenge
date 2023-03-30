import { makeExecutableSchema } from '@graphql-tools/schema'

export const schemaString = /* GraphQL */ `
  type CostItem {
    id: ID!
    name: String!
    price: Float!
    tax: Int!
    billedPerUnit: Boolean! # If false, it's billed per hour
    hours: Int
    units: Int
  }

  type Phase {
    id: ID!
    name: String!
    feeOrDiscount: Float
    costItems: [CostItem!]!
  }

  type Invoice {
    id: ID!
    name: String!
    currency: String!
    feeOrDiscountPercent: Float
    phases: [Phase!]!
  }

  type Query {
    invoice: Invoice!
  }
`

export const schema = makeExecutableSchema({ typeDefs: schemaString })

export default schema
