import { CreateProcess } from '../pages/process/interfaces/create-process'
import { EditProcess } from '../pages/process/interfaces/edit-process'
import { Process } from '../pages/process/interfaces/process'
import { fetchApi } from '../utils/fetch-util'
export const useProcessApi = () => {
  const getProceses = async (
    processId?: number,
    includeCategories: boolean = false,
    includeWorkItems: boolean = false,
    includeUsers: boolean = false,
    omitWorkItemsAbandoned: boolean = false
  ) => {
    const url = `${process.env.VITE_API_URL!}/api/process/get?${processId ? `processId=${processId}&` : ''}includeCategories=${includeCategories}&includeWorkItems=${includeWorkItems}&includeUsers=${includeUsers}&omitWorkItemsAbandoned=${omitWorkItemsAbandoned}`

    const response: Process[] = await fetchApi(url, 'GET', null)

    return response
  }

  const createProcess = async (createProcess: CreateProcess) => {
    const url = `${process.env.VITE_API_URL!}/api/process/create`
    const response: Process = await fetchApi(url, 'POST', createProcess)
    return response
  }

  const updateProcess = async (updateProcess: EditProcess) => {
    const url = `${process.env.VITE_API_URL!}/api/process/update`
    const response: Process = await fetchApi(url, 'PATCH', updateProcess)
    return response
  }

  const deleteProcess = async (processId: number) => {
    const url = `${process.env.VITE_API_URL!}/api/process/delete/${processId}`
    const response: Process = await fetchApi(url, 'DELETE', null)
    return response
  }

  return { getProceses, createProcess, updateProcess, deleteProcess }
}
