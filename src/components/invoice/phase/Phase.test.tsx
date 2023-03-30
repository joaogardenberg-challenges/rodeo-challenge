import { render, screen } from '@testing-library/react'
import { range } from 'lodash'

jest.mock('./CostItem')
jest.mock('./SubtotalPrice')

const Phase = require('./Phase').default

const costItemsCount = 5
const name = 'Phase name'

const props = {
  phase: {
    costItems: range(costItemsCount).map((index) => ({ id: index })),
    name
  }
}

describe('Phase', () => {
  it("Doesn't render when no phase", () => {
    render(<Phase />)
    const phaseContainer = screen.queryByTestId('phase-container')
    expect(phaseContainer).not.toBeInTheDocument()
  })

  it('Renders successfully', () => {
    const { container } = render(<Phase {...props} />)
    const phaseContainer = screen.getByTestId('phase-container')
    const phaseName = screen.getByTestId('phase-name')
    const costItems = screen.getAllByTestId('cost-item')

    expect(phaseContainer).toBeInTheDocument()
    expect(phaseName).toHaveTextContent(name)
    expect(costItems).toHaveLength(costItemsCount)
    expect(container).toMatchSnapshot()
  })
})
