import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig } from './msal-config.ts'
import { MsalProvider } from '@azure/msal-react'

const msalInstance = new PublicClientApplication(msalConfig)
msalInstance.initialize()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>
)
