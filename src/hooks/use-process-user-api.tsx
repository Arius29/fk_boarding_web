import { CreateProcessUser } from '../pages/sherpas-process/interfaces/create-process-user'
import { EditProcessUser } from '../pages/sherpas-process/interfaces/edit-process-user'
import { ProcessUser } from '../pages/sherpas-process/interfaces/process-user'
import { fetchApi } from '../utils/fetch-util'
export const useProcessUserApi = () => {
  const getProcessUsers = async (
    processId?: number,
    userId?: string,
    includeUsers = false
  ) => {
    const url = `${process.env.VITE_API_URL!}/api/processuser/get?processId=${processId ?? ''}&userId=${userId ?? ''}&includeUsers=${includeUsers}`
    const response: ProcessUser[] = await fetchApi(url, 'GET', null)

    return response
  }

  const createProcessUser = async (processUser: CreateProcessUser) => {
    const url = `${process.env.VITE_API_URL!}/api/processuser/create`
    const response: ProcessUser = await fetchApi(url, 'POST', processUser)
    return response
  }

  const updateProcessUser = async (processUser: EditProcessUser) => {
    const url = `${process.env.VITE_API_URL!}/api/processuser/update`
    const response: ProcessUser = await fetchApi(url, 'PATCH', processUser)
    return response
  }

  const deleteProcessUser = async (processId: number, userId: string) => {
    const url = `${process.env.VITE_API_URL!}/api/processuser/delete/${processId}/${userId}`
    const response: ProcessUser = await fetchApi(url, 'DELETE', null)
    return response
  }

  return {
    getProcessUsers,
    createProcessUser,
    updateProcessUser,
    deleteProcessUser,
  }
}
