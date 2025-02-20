import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { BrowserRouter } from 'react-router'
import App from './components/App/App'
import { AuthProvider } from './context/context'

createRoot(document.body).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter> 
        
        <App />
        
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
