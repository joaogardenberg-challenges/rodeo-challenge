import { render, screen } from '@testing-library/react'
import { noop } from 'lodash'
import formatPercent from 'utils/formatPercent'
import formatPrice from 'utils/formatPrice'

const useContext = jest.fn()
const getInvoicePrice = jest.fn()
const getInvoicePriceWithFeeOrDiscountPercent = jest.fn()
const getInvoicePriceWithTax = jest.fn()

jest.doMock('react', () => ({ useContext }))

jest.doMock('utils/invoicePrice', () => ({
  getInvoicePrice,
  getInvoicePriceWithFeeOrDiscountPercent,
  getInvoicePriceWithTax
}))

jest.doMock('./Invoice', () => ({ InvoiceContext: noop }))

const TotalPrice = require('./TotalPrice').default

const price = 10
const fee = 6
const discount = -6
const tax = 2

const invoices = {
  none: { currency: 'USD' },
  fee: { currency: 'USD', feeOrDiscountPercent: fee },
  discount: { currency: 'USD', feeOrDiscountPercent: discount }
}

describe('TotalPrice', () => {
  beforeEach(() => {
    getInvoicePrice.mockReturnValue(price)
  })

  it('Renders successfully without feeOrDiscountPercent', () => {
    useContext.mockReturnValue(invoices.none)
    getInvoicePriceWithFeeOrDiscountPercent.mockReturnValue(price)
    getInvoicePriceWithTax.mockReturnValue(price + tax)

    const { container } = render(<TotalPrice />)
    const subtotalPrice = screen.getByTestId('subtotal-price')
    const feeOrDiscountLabel = screen.queryByTestId('fee-or-discount-label')
    const feeOrDiscountAmount = screen.queryByTestId('fee-or-discount-amount')
    const feeOrDiscountPrice = screen.queryByTestId('fee-or-discount-price')
    const taxAmount = screen.getByTestId('tax-amount')
    const totalPrice = screen.getByTestId('total-price')

    expect(subtotalPrice).toHaveTextContent(`$${formatPrice(price)}`)
    expect(feeOrDiscountLabel).not.toBeInTheDocument()
    expect(feeOrDiscountAmount).not.toBeInTheDocument()
    expect(feeOrDiscountPrice).not.toBeInTheDocument()
    expect(taxAmount).toHaveTextContent(`$${formatPrice(tax)}`)
    expect(totalPrice).toHaveTextContent(`$${formatPrice(price + tax)}`)
    expect(container).toMatchSnapshot()
  })

  it('Renders successfully with feePercent', () => {
    useContext.mockReturnValue(invoices.fee)
    getInvoicePriceWithFeeOrDiscountPercent.mockReturnValue(price + fee)
    getInvoicePriceWithTax.mockReturnValue(price + fee + tax)

    const { container } = render(<TotalPrice />)
    const subtotalPrice = screen.getByTestId('subtotal-price')
    const feeOrDiscountLabel = screen.getByTestId('fee-or-discount-label')
    const feeOrDiscountAmount = screen.getByTestId('fee-or-discount-amount')
    const feeOrDiscountPrice = screen.getByTestId('fee-or-discount-price')
    const taxAmount = screen.getByTestId('tax-amount')
    const totalPrice = screen.getByTestId('total-price')

    expect(subtotalPrice).toHaveTextContent(`$${formatPrice(price)}`)

    expect(feeOrDiscountLabel).toHaveTextContent(
      `Subtotal price with fee (+ ${formatPercent(fee)}%)`
    )

    expect(feeOrDiscountAmount).toHaveTextContent(`+ $${formatPrice(fee)}`)
    expect(feeOrDiscountPrice).toHaveTextContent(`$${formatPrice(price + fee)}`)
    expect(taxAmount).toHaveTextContent(`$${formatPrice(tax)}`)
    expect(totalPrice).toHaveTextContent(`$${formatPrice(price + fee + tax)}`)
    expect(container).toMatchSnapshot()
  })

  it('Renders successfully with discountPercent', () => {
    useContext.mockReturnValue(invoices.discount)
    getInvoicePriceWithFeeOrDiscountPercent.mockReturnValue(price + discount)
    getInvoicePriceWithTax.mockReturnValue(price + discount + tax)

    const { container } = render(<TotalPrice />)
    const subtotalPrice = screen.getByTestId('subtotal-price')
    const feeOrDiscountLabel = screen.getByTestId('fee-or-discount-label')
    const feeOrDiscountAmount = screen.getByTestId('fee-or-discount-amount')
    const feeOrDiscountPrice = screen.getByTestId('fee-or-discount-price')
    const taxAmount = screen.getByTestId('tax-amount')
    const totalPrice = screen.getByTestId('total-price')

    expect(subtotalPrice).toHaveTextContent(`$${formatPrice(price)}`)

    expect(feeOrDiscountLabel).toHaveTextContent(
      `Subtotal price with discount (- ${formatPercent(Math.abs(discount))}%)`
    )

    expect(feeOrDiscountAmount).toHaveTextContent(
      `- $${formatPrice(Math.abs(discount))}`
    )

    expect(feeOrDiscountPrice).toHaveTextContent(
      `$${formatPrice(price + discount)}`
    )

    expect(taxAmount).toHaveTextContent(`$${formatPrice(tax)}`)

    expect(totalPrice).toHaveTextContent(
      `$${formatPrice(price + discount + tax)}`
    )

    expect(container).toMatchSnapshot()
  })
})
