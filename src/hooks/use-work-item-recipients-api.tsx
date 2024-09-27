import { CreateWorkItemRecipient } from '../pages/work-items/interfaces/create-work-item-recipient'
import { UpdateWorkItemRecipient } from '../pages/work-items/interfaces/update-work-item-recipient'
import { WorkItemRecipient } from '../pages/work-items/interfaces/work-item-recipient'
import { WorkItemRecipientBase } from '../pages/work-items/interfaces/work-item-recipient-base'
import { fetchApi } from '../utils/fetch-util'

interface GetRecipientsProps {
  workItemId?: number | null
  userId?: string | null
  includeUsers?: boolean
  omitAbandoned?: boolean
}

export const useWorkItemRecipientsApi = () => {
  const getRecipients = async ({
    workItemId = null,
    userId = null,
    includeUsers = false,
    omitAbandoned = false,
  }: GetRecipientsProps) => {
    const url = `${process.env.VITE_API_URL!}/api/workitemrecipient/get?WorkItemId=${workItemId}&UserId=${userId}&includeUsers=${includeUsers}&omitAbandoned=${omitAbandoned}`

    const response: WorkItemRecipient[] = await fetchApi(url, 'GET', null)

    return response
  }

  const createRecipient = async (createRecipient: CreateWorkItemRecipient) => {
    const url = `${process.env.VITE_API_URL!}/api/workitemrecipient/create`
    const response: WorkItemRecipientBase = await fetchApi(
      url,
      'POST',
      createRecipient
    )
    return response
  }

  const updateRecipient = async (updateRecipient: UpdateWorkItemRecipient) => {
    const url = `${process.env.VITE_API_URL!}/api/workitemrecipient/update`
    const response: WorkItemRecipientBase = await fetchApi(
      url,
      'PATCH',
      updateRecipient
    )
    return response
  }

  const deleteRecipient = async (workItemId: number, userId: string) => {
    const url = `${process.env.VITE_API_URL!}/api/workitemrecipient/delete/${workItemId}/${userId}`
    const response: WorkItemRecipientBase = await fetchApi(url, 'DELETE', null)
    return response
  }
  return { getRecipients, createRecipient, updateRecipient, deleteRecipient }
}
