import { ExecutionResult, graphql } from 'graphql'
import { Query } from 'types'
import query from './query'
import getSchemaWithMocks from './mocks'

export default function mockRequest() {
  return graphql({
    schema: getSchemaWithMocks(),
    source: query
  }) as unknown as Promise<ExecutionResult<Query>>
}
