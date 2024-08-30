import { Configuration } from '@azure/msal-browser'

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID || '',
    authority: import.meta.env.VITE_AUTHORITY || '',
    redirectUri: import.meta.env.VITE_REDIRECT_URI || '',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    windowHashTimeout: 60000,
    iframeHashTimeout: 6000,
    loadFrameTimeout: 0,
  },
}

export const msalConfigCompanies: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID_COMPANIES || '',
    authority: import.meta.env.VITE_AUTHORITY_COMPANIES || '',
    redirectUri: import.meta.env.VITE_REDIRECT_URI || '',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    windowHashTimeout: 60000,
    iframeHashTimeout: 6000,
    loadFrameTimeout: 0,
  },
}
