import { createContext, useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import { range } from 'lodash'

const useState = jest.fn()
const mockRequest = jest.fn()
jest.doMock('react', () => ({ createContext, useEffect, useState }))
jest.doMock('services/mockRequest', () => mockRequest)

jest.mock('./phase/Phase')
jest.mock('./TotalPrice')

const Invoice = require('./Invoice').default

const phasesCount = 5

const invoice = {
  name: 'Company name',
  phases: range(phasesCount).map((index) => ({ id: index }))
}

describe('Invoice', () => {
  beforeEach(() => {
    mockRequest.mockReturnValue(Promise.resolve({ data: undefined }))
    useState.mockReturnValue([invoice, () => {}])
  })

  it('Renders loading successfully', () => {
    useState.mockReturnValue([undefined, () => {}])
    const { container } = render(<Invoice />)
    const loading = screen.getByTestId('loading')

    expect(mockRequest).toBeCalledTimes(1)
    expect(loading).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('Renders the Invoice successfully', () => {
    const { container } = render(<Invoice />)
    const invoiceContainer = screen.getByTestId('invoice')
    const title = screen.getByTestId('title')
    const phases = screen.getAllByTestId('phase')

    expect(mockRequest).toBeCalledTimes(1)
    expect(phases).toHaveLength(phasesCount)
    expect(invoiceContainer).toBeInTheDocument()
    expect(title).toHaveTextContent(`Invoice: ${invoice.name}`)
    expect(container).toMatchSnapshot()
  })
})
