import { createContext, useEffect, useState } from 'react'
import { Invoice as InvoiceType, Phase as PhaseType } from 'types'
import mockRequest from 'services/mockRequest'
import { StyledInvoice, StyledLoading } from './Invoice.styled'
import Phase from './phase/Phase'
import TotalPrice from './TotalPrice'

export const InvoiceContext = createContext<InvoiceType>({
  name: '',
  currency: 'USD',
  phases: []
})

export default function Invoice() {
  const [invoice, setInvoice] = useState<InvoiceType>()

  useEffect(() => {
    mockRequest().then(({ data }) => setInvoice(data?.invoice))
  }, [])

  if (!invoice) {
    return (
      <StyledLoading data-testid="loading">
        <p className="loading">Loading invoice...</p>
      </StyledLoading>
    )
  }

  const { name, phases } = invoice

  const renderPhase = (phase: PhaseType) => (
    <Phase key={phase.id} phase={phase} />
  )

  return (
    <InvoiceContext.Provider value={invoice}>
      <StyledInvoice data-testid="invoice">
        <header className="page-header">
          <h1 className="page-title" data-testid="title">
            <span>Invoice</span>
            <span hidden>: </span>
            <span className="invoice-name">{name}</span>
          </h1>
        </header>
        <div className="separator" />
        <div className="phases">{phases.map(renderPhase)}</div>
        <div className="separator" />
        <TotalPrice />
      </StyledInvoice>
    </InvoiceContext.Provider>
  )
}
