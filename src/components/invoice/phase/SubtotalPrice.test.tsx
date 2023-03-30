import { render, screen } from '@testing-library/react'
import { noop } from 'lodash'
import formatPrice from 'utils/formatPrice'

const useContext = jest.fn()
const getPhasePrice = jest.fn()
const getPhasePriceWithFeeOrDiscount = jest.fn()
const getPhasePriceWithTax = jest.fn()

jest.doMock('react', () => ({ useContext }))

jest.doMock('utils/phasePrice', () => ({
  getPhasePrice,
  getPhasePriceWithFeeOrDiscount,
  getPhasePriceWithTax
}))

jest.doMock('components/invoice/Invoice', () => ({ InvoiceContext: noop }))
jest.doMock('./Phase', () => ({ PhaseContext: noop }))

const SubtotalPrice = require('./SubtotalPrice').default

const price = 10
const fee = 6
const discount = -6
const tax = 2

const invoice = { currency: 'USD' }

const phases = {
  none: {},
  fee: { feeOrDiscount: fee },
  discount: { feeOrDiscount: discount }
}

describe('SubtotalPrice', () => {
  beforeEach(() => {
    getPhasePrice.mockReturnValue(price)
  })

  it('Renders successfully without feeOrDiscount', () => {
    useContext.mockReturnValue({ ...invoice, ...phases.none })
    getPhasePriceWithFeeOrDiscount.mockReturnValue(price)
    getPhasePriceWithTax.mockReturnValue(price + tax)

    const { container } = render(<SubtotalPrice />)
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

  it('Renders successfully with fee', () => {
    useContext.mockReturnValue({ ...invoice, ...phases.fee })
    getPhasePriceWithFeeOrDiscount.mockReturnValue(price + fee)
    getPhasePriceWithTax.mockReturnValue(price + fee + tax)

    const { container } = render(<SubtotalPrice />)
    const subtotalPrice = screen.getByTestId('subtotal-price')
    const feeOrDiscountLabel = screen.getByTestId('fee-or-discount-label')
    const feeOrDiscountAmount = screen.getByTestId('fee-or-discount-amount')
    const feeOrDiscountPrice = screen.getByTestId('fee-or-discount-price')
    const taxAmount = screen.getByTestId('tax-amount')
    const totalPrice = screen.getByTestId('total-price')

    expect(subtotalPrice).toHaveTextContent(`$${formatPrice(price)}`)

    expect(feeOrDiscountLabel).toHaveTextContent(
      "Phase's subtotal price with fee"
    )

    expect(feeOrDiscountAmount).toHaveTextContent(`+ $${formatPrice(fee)}`)
    expect(feeOrDiscountPrice).toHaveTextContent(`$${formatPrice(price + fee)}`)
    expect(taxAmount).toHaveTextContent(`$${formatPrice(tax)}`)
    expect(totalPrice).toHaveTextContent(`$${formatPrice(price + fee + tax)}`)
    expect(container).toMatchSnapshot()
  })

  it('Renders successfully with discount', () => {
    useContext.mockReturnValue({ ...invoice, ...phases.discount })
    getPhasePriceWithFeeOrDiscount.mockReturnValue(price + discount)
    getPhasePriceWithTax.mockReturnValue(price + discount + tax)

    const { container } = render(<SubtotalPrice />)
    const subtotalPrice = screen.getByTestId('subtotal-price')
    const feeOrDiscountLabel = screen.getByTestId('fee-or-discount-label')
    const feeOrDiscountAmount = screen.getByTestId('fee-or-discount-amount')
    const feeOrDiscountPrice = screen.getByTestId('fee-or-discount-price')
    const taxAmount = screen.getByTestId('tax-amount')
    const totalPrice = screen.getByTestId('total-price')

    expect(subtotalPrice).toHaveTextContent(`$${formatPrice(price)}`)

    expect(feeOrDiscountLabel).toHaveTextContent(
      `Phase's subtotal price with discount`
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
