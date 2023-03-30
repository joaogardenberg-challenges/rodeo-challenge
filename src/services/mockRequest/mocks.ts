import { addMocksToSchema } from '@graphql-tools/mock'
import { faker } from '@faker-js/faker'
import schema from './schema'

const TAXES = [0, 9, 21]

export default function getSchemaWithMocks() {
  return addMocksToSchema({
    schema,
    mocks: {
      Invoice: () => ({
        name: faker.company.name(),
        currency:
          faker.datatype.number({ min: 0, max: 1 }) === 1 ? 'USD' : 'EUR',
        feeOrDiscountPercent:
          faker.datatype.number({ min: 0, max: 2 }) >= 1
            ? faker.datatype.float({ min: -20, max: 20 })
            : null,
        phases: [...new Array(faker.datatype.number({ min: 1, max: 4 }))]
      }),
      Phase: () => ({
        name: faker.company.catchPhrase(),
        feeOrDiscount:
          faker.datatype.number({ min: 0, max: 2 }) >= 1
            ? faker.datatype.float({ min: -50, max: 50 })
            : null,
        costItems: [...new Array(faker.datatype.number({ min: 1, max: 10 }))]
      }),
      CostItem: () => {
        const billedPerUnit = faker.datatype.boolean()

        return {
          name: faker.commerce.productName(),
          price: faker.datatype.float({ min: 1, max: 100 }),
          tax: TAXES[faker.datatype.number({ min: 0, max: 2 })],
          billedPerUnit,
          hours: billedPerUnit
            ? null
            : faker.datatype.number({ min: 2, max: 50 }),
          units: billedPerUnit
            ? faker.datatype.number({ min: 1, max: 100 })
            : null
        }
      }
    }
  })
}
