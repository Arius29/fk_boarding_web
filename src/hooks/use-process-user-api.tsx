import { CreateProcessUser } from '../pages/sherpas-process/interfaces/create-process-user'
import { EditProcessUser } from '../pages/sherpas-process/interfaces/edit-process-user'
import { ProcessUser } from '../pages/sherpas-process/interfaces/process-user'
import { ProcessUserBase } from '../pages/sherpas-process/interfaces/process-user-base'
import { fetchApi } from '../utils/fetch-util'

interface GetProcessUsersProps {
  processId?: number
  userId?: string
  includeProcess?: boolean
  includeUsers?: boolean
}

interface DeleteProcessUserProps {
  processId: number
  userId: string
}

export const useProcessUserApi = () => {
  const getProcessUsers = async ({
    processId = undefined,
    userId = undefined,
    includeProcess = false,
    includeUsers = false,
  }: GetProcessUsersProps) => {
    const url = `${process.env.VITE_API_URL!}/api/processuser/get?${processId ? `processId=${processId}&` : ''}${userId ? `userId=${userId}&` : ''}&includeProcess=${includeProcess}&includeUsers=${includeUsers}`
    const response: ProcessUser[] = await fetchApi(url, 'GET', null)

    return response
  }

  const createProcessUser = async (processUser: CreateProcessUser) => {
    const url = `${process.env.VITE_API_URL!}/api/processuser/create`
    const response: ProcessUserBase = await fetchApi(url, 'POST', processUser)
    return response
  }

  const updateProcessUser = async (processUser: EditProcessUser) => {
    const url = `${process.env.VITE_API_URL!}/api/processuser/update`
    const response: ProcessUserBase = await fetchApi(url, 'PATCH', processUser)
    return response
  }

  const deleteProcessUser = async ({
    processId,
    userId,
  }: DeleteProcessUserProps) => {
    const url = `${process.env.VITE_API_URL!}/api/processuser/delete/${processId}/${userId}`
    const response: ProcessUserBase = await fetchApi(url, 'DELETE', null)
    return response
  }

  return {
    getProcessUsers,
    createProcessUser,
    updateProcessUser,
    deleteProcessUser,
  }
}
