import { useMemo } from 'react'
import { render, screen } from '@testing-library/react'
import { noop } from 'lodash'
import formatPrice from 'utils/formatPrice'
import formatPercent from 'utils/formatPercent'

const useContext = jest.fn()
const getCostItemPrice = jest.fn()
jest.doMock('react', () => ({ useContext, useMemo }))
jest.doMock('utils/costItemPrice', () => ({ getCostItemPrice }))
jest.doMock('components/invoice/Invoice', () => ({ InvoiceContext: noop }))

const CostItem = require('./CostItem').default

const name = 'Cost item name'
const tax = 9
const price = 10
const totalPrice = 100
const costItem = { name, tax, price }

describe('CostItem', () => {
  beforeEach(() => {
    useContext.mockReturnValue({ currency: 'USD' })
    getCostItemPrice.mockReturnValue(totalPrice)
  })

  it('Renders successfully with 1 unit', () => {
    const { container } = render(
      <CostItem costItem={{ ...costItem, billedPerUnit: true, units: 1 }} />
    )

    const nameElement = screen.getByTestId('name')
    const taxElement = screen.getByTestId('tax')
    const description = screen.getByTestId('description')
    const priceElement = screen.getByTestId('price')

    expect(nameElement).toHaveTextContent(name)
    expect(taxElement).toHaveTextContent(`${formatPercent(tax)}%`)
    expect(description).toHaveTextContent(`$${formatPrice(price)} x 01 unit`)
    expect(priceElement).toHaveTextContent(`$${formatPrice(totalPrice)}`)
    expect(container).toMatchSnapshot()
  })

  it('Renders successfully with 1 hour', () => {
    const { container } = render(
      <CostItem costItem={{ ...costItem, billedPerUnit: false, units: 1 }} />
    )

    const nameElement = screen.getByTestId('name')
    const taxElement = screen.getByTestId('tax')
    const description = screen.getByTestId('description')
    const priceElement = screen.getByTestId('price')

    expect(nameElement).toHaveTextContent(name)
    expect(taxElement).toHaveTextContent(`${formatPercent(tax)}%`)
    expect(description).toHaveTextContent(`$${formatPrice(price)} x 01 hour`)
    expect(priceElement).toHaveTextContent(`$${formatPrice(totalPrice)}`)
    expect(container).toMatchSnapshot()
  })

  it('Renders successfully with multiple units', () => {
    const units = 10

    const { container } = render(
      <CostItem costItem={{ ...costItem, billedPerUnit: true, units }} />
    )

    const nameElement = screen.getByTestId('name')
    const taxElement = screen.getByTestId('tax')
    const description = screen.getByTestId('description')
    const priceElement = screen.getByTestId('price')

    expect(nameElement).toHaveTextContent(name)
    expect(taxElement).toHaveTextContent(`${formatPercent(tax)}%`)

    expect(description).toHaveTextContent(
      `$${formatPrice(price)} x ${units} units`
    )

    expect(priceElement).toHaveTextContent(`$${formatPrice(totalPrice)}`)
    expect(container).toMatchSnapshot()
  })

  it('Renders successfully with multiple hours', () => {
    const hours = 10

    const { container } = render(
      <CostItem costItem={{ ...costItem, billedPerUnit: false, hours }} />
    )

    const nameElement = screen.getByTestId('name')
    const taxElement = screen.getByTestId('tax')
    const description = screen.getByTestId('description')
    const priceElement = screen.getByTestId('price')

    expect(nameElement).toHaveTextContent(name)
    expect(taxElement).toHaveTextContent(`${formatPercent(tax)}%`)

    expect(description).toHaveTextContent(
      `$${formatPrice(price)} x ${hours} hours`
    )

    expect(priceElement).toHaveTextContent(`$${formatPrice(totalPrice)}`)
    expect(container).toMatchSnapshot()
  })
})
