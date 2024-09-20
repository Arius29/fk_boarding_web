import { CreateProcess } from '../pages/process/interfaces/create-process'
import { EditProcess } from '../pages/process/interfaces/edit-process'
import { Process } from '../pages/process/interfaces/process'
import { fetchApi } from '../utils/fetch-util'

interface GetProcessesProps {
  processId?: number
  includeCategories?: boolean
  includeWorkItems?: boolean
  includeUsers?: boolean
  includeTags?: boolean
  includeProcessUsers?: boolean
  omitWorkItemsAbandoned?: boolean
}

export const useProcessApi = () => {
  const getProceses = async ({
    processId = undefined,
    includeCategories = false,
    includeWorkItems = false,
    includeUsers = false,
    includeTags = false,
    includeProcessUsers = false,
    omitWorkItemsAbandoned = false,
  }: GetProcessesProps) => {
    const url = `${process.env.VITE_API_URL!}/api/process/get?${processId ? `processId=${processId}&` : ''}includeCategories=${includeCategories}&includeWorkItems=${includeWorkItems}&includeUsers=${includeUsers}&includeTags=${includeTags}&includeProcessUsers=${includeProcessUsers}&omitWorkItemsAbandoned=${omitWorkItemsAbandoned}`

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
