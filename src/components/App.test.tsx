import { render, screen } from '@testing-library/react'

jest.mock('./invoice/Invoice')

const App = require('./App').default

describe('App', () => {
  it('Renders the Invoice successfully', () => {
    const { container } = render(<App />)
    const invoice = screen.getByTestId('invoice')

    expect(invoice).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
