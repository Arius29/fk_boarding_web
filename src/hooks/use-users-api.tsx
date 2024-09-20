import { CreateUser } from '../pages/sherpas/interfaces/create-user'
import { EditUser } from '../pages/sherpas/interfaces/edit-user'
import { User } from '../pages/sherpas/interfaces/user'
import { fetchApi } from '../utils/fetch-util'

interface GetUsersProps {
  userId?: string
  includeReporters?: boolean
  includeRecipients?: boolean
  includeProcessUsers?: boolean
  includeWorkItems?: boolean
}

export const useUsersApi = () => {
  const getUsers = async ({
    userId = undefined,
    includeReporters = false,
    includeRecipients = false,
    includeProcessUsers = false,
    includeWorkItems = false,
  }: GetUsersProps) => {
    const url = `${process.env.VITE_API_URL!}/api/user/get?${userId ? `userId=${userId}&` : ''}&includeReporters=${includeReporters}&includeRecipients=${includeRecipients}&includeProcessUsers=${includeProcessUsers}&includeWorkItems=${includeWorkItems}`

    const response: User[] = await fetchApi(url, 'GET', null)

    return response
  }

  const createUser = async (user: CreateUser) => {
    const url = `${process.env.VITE_API_URL!}/api/user/create`
    const response: User = await fetchApi(url, 'POST', user)
    return response
  }

  const updateUser = async (user: EditUser) => {
    const url = `${process.env.VITE_API_URL!}/api/user/update`
    const response: User = await fetchApi(url, 'PATCH', user)
    return response
  }

  const deleteUser = async (userId: string) => {
    const url = `${process.env.VITE_API_URL!}/api/user/delete/${userId}`
    const response: User = await fetchApi(url, 'DELETE', null)
    return response
  }

  return {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
  }
}
