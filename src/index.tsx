import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from 'components/App'
import GlobalStyles from './index.global.styled'
import reportWebVitals from './reportWebVitals'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <GlobalStyles />
    <App />
  </StrictMode>
)

reportWebVitals()
