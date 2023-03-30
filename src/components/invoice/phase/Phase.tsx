import { createContext } from 'react'
import styled from 'styled-components'
import { CostItem as CostItemType, Phase as PhaseType } from 'types'
import CostItem from './CostItem'
import SubtotalPrice from './SubtotalPrice'

interface PhaseProps {
  phase: PhaseType
}

export const PhaseContext = createContext<PhaseType>({
  id: '',
  name: '',
  costItems: []
})

const StyledPhase = styled.section`
  /* border-left: 1px solid #999;
  border-radius: 0.25rem; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* padding: 1rem; */

  .phase-name {
    /* border-bottom: 1px solid #333; */
    font-size: 1.25rem;
    /* padding-bottom: 1rem; */
    text-align: center;
  }
`

export default function Phase({ phase }: PhaseProps) {
  if (!phase) {
    return null
  }

  const { costItems, name } = phase

  const renderCostItem = (costItem: CostItemType) => (
    <CostItem key={costItem.id} costItem={costItem} />
  )

  return (
    <PhaseContext.Provider value={phase}>
      <StyledPhase className="phase-section">
        <h3 className="phase-name">{name}</h3>
        <ol className="cost-items">
          <li className="cost-item cost-item--labels" aria-hidden>
            <span className="cost-item__name">Name</span>
            <span className="cost-item__tax">Tax</span>
            <span className="cost-item__description">Description</span>
            <span className="cost-item__price">Price</span>
          </li>
          {costItems.map(renderCostItem)}
          <SubtotalPrice />
        </ol>
      </StyledPhase>
    </PhaseContext.Provider>
  )
}
