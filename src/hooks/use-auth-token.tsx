import { useMsal } from '@azure/msal-react'

export const useAuthToken = () => {
  const { instance, accounts } = useMsal()
  const viteScope: string = process.env.VITE_APP_SCOPE ?? ''
  const accessTokenRequest = {
    scopes: [viteScope],
    account: accounts[0],
  }

  const getToken = async () => {
    try {
      const token = (await instance.acquireTokenSilent(accessTokenRequest))
        .accessToken

      return token
    } catch (error) {
      throw new Error(error as string)
    }
  }

  return { getToken }
}
