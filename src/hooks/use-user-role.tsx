import { useMsal } from '@azure/msal-react'

export const useUserRole = () => {
  const { accounts } = useMsal()

  const getRole = () => {
    return accounts[0]?.idTokenClaims?.role || 'Observer'
  }

  const isAdmin = () => {
    return getRole() === 'Admin'
  }

  const isObserver = () => {
    return getRole() === 'Observer'
  }

  const isUser = () => {
    return getRole() === 'User'
  }

  return {
    getRole,
    isAdmin,
    isObserver,
    isUser,
  }
}
