import { CreateWorkItem } from '../pages/work-items/interfaces/create-work-item'
import { UpdateWorkItem } from '../pages/work-items/interfaces/update-work-item'
import { WorkItem } from '../pages/work-items/interfaces/work-item'
import { WorkItemBase } from '../pages/work-items/interfaces/work-item-base'
import { fetchApi } from '../utils/fetch-util'

export const useWorkItemApi = () => {
  const getWorkItems = async (
    omitAbandoned: boolean,
    includeProcess: boolean,
    includeCategory: boolean,
    includeReporters: boolean,
    includeRecipients: boolean,
    includeTags: boolean,
    includeUsers: boolean,
    userId?: string,
    workItemId?: number,
    categoryId?: number,
    processId?: number
  ) => {
    const url = `${process.env.VITE_API_URL!}/api/workitem/get?userId=${userId}&workItemId=${workItemId}&categoryId=${categoryId}&processId=${processId}&omitAbandoned=${omitAbandoned}&includeProcess=${includeProcess}&includeCategory=${includeCategory}&includeReporters=${includeReporters}&includeRecipients=${includeRecipients}&includeTags=${includeTags}&includeUsers=${includeUsers}`

    const response: WorkItem[] = await fetchApi(url, 'GET', null)

    return response
  }

  const createWorkItem = async (workItem: CreateWorkItem) => {
    const url = `${process.env.VITE_API_URL!}/api/workitem/create`
    const response: WorkItemBase = await fetchApi(url, 'POST', workItem)
    return response
  }

  const updateWorkItem = async (workItem: UpdateWorkItem) => {
    const url = `${process.env.VITE_API_URL!}/api/workitem/update`
    const response: WorkItemBase = await fetchApi(url, 'PATCH', workItem)
    return response
  }

  const deleteWorkItem = async (workItemId: number) => {
    const url = `${process.env.VITE_API_URL!}/api/tag/delete/${workItemId}`
    const response: WorkItemBase = await fetchApi(url, 'DELETE', null)
    return response
  }

  return {
    getWorkItems,
    createWorkItem,
    updateWorkItem,
    deleteWorkItem,
  }
}
