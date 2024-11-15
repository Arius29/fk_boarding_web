import { useEffect, useState } from 'react'
import { WorkItem } from '../pages/work-items/interfaces/work-item'
import { useMsal } from '@azure/msal-react'
import { useWorkItemApi } from './use-work-item-api'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'sonner'
import { WorkItemBase } from '../pages/work-items/interfaces/work-item-base'
import { AccountInfo } from '@azure/msal-browser'
import { getAvatarRandom } from '../utils/avatar-util'
import { Type, User } from '../pages/sherpas/interfaces/user'
import { WorkItemForm } from '../pages/work-items/interfaces/work-item-form'
import { useUserRole } from './use-user-role'

const createBaseUser = (account: AccountInfo): User => {
  return {
    id: account?.homeAccountId,
    name:
      account?.name || account?.username.split('@')[0].replace('.', '&') || '',
    avatar: getAvatarRandom(account?.name?.replace(' ', '+') || 'Sherpa User'),
    email: account?.username,
    type: Type.Azure,
  }
}

const createStarterFinisherByUser = (
  account: AccountInfo,
  workItem: WorkItem
) => {
  const starter =
    workItem?.starter ||
    (workItem.status === 1 && !workItem.startedBy
      ? createBaseUser(account)
      : null)

  const finisher =
    workItem?.finisher ||
    (workItem.status === 2 && !workItem.finishedBy
      ? createBaseUser(account)
      : null)

  return {
    startedOn:
      workItem.status === 1 && !workItem.startedOn
        ? new Date().toISOString()
        : workItem.startedOn || null,
    startedBy: starter?.id || null,
    finishedBy: finisher?.id || null,
    finishedOn:
      workItem.status === 2 && !workItem.finishedOn
        ? new Date().toISOString()
        : workItem.finishedOn || null,
    starter: starter,
    finisher: finisher,
  }
}

interface useWorkItemApiQuery {
  omitAbandoned?: boolean
  includeProcess?: boolean
  includeCategory?: boolean
  includeReporters?: boolean
  includeRecipients?: boolean
  includeTags?: boolean
  includeUsers?: boolean
  userId?: string
  workItemId?: number
  categoryId?: number
  processId?: number
  enabled?: boolean
}

export const useWorkItemApiQuery = ({
  omitAbandoned = false,
  includeProcess = false,
  includeCategory = false,
  includeReporters = false,
  includeRecipients = false,
  includeTags = false,
  includeUsers = false,
  userId = undefined,
  workItemId = undefined,
  categoryId = undefined,
  processId = undefined,
  enabled = true,
}: useWorkItemApiQuery) => {
  const [workItems, setWorkItems] = useState<WorkItem[]>([])
  const { accounts } = useMsal()
  const { isAdmin, isUser, isObserver } = useUserRole()
  const account = accounts[0]
  const { getWorkItems, createWorkItem, updateWorkItem, deleteWorkItem } =
    useWorkItemApi()

  const { data, isLoading, error } = useQuery({
    queryKey: ['workItems', workItemId, userId, processId, categoryId],
    queryFn: () => {
      if (!isAdmin() && !isUser() && !isObserver())
        throw new Error('You are not authorized to get work items')
      return getWorkItems(
        omitAbandoned,
        includeProcess,
        includeCategory,
        includeReporters,
        includeRecipients,
        includeTags,
        includeUsers,
        userId,
        workItemId,
        categoryId,
        processId
      )
    },
    staleTime: 300000,
    cacheTime: 600000,
    enabled: enabled,
    onError: (error: Error) => {
      toast.error(
        error?.message || 'An error occurred while trying to get work items'
      )
    },
  })

  const mutationAddWorkItem = useMutation({
    mutationFn: (workItem: WorkItemForm) => {
      if (!isAdmin() && !isUser())
        throw new Error('You are not authorized to create work items')
      return createWorkItem({
        ...workItem,
        autoAddRecipients: workItem.autoAddRecipients || false,
        ...createStarterFinisherByUser(account, workItem),
      })
    },
    onSuccess: (data: WorkItemBase, context) => {
      setWorkItems([
        ...workItems,
        {
          ...context,
          ...data,
          ...createStarterFinisherByUser(account, data),
        },
      ])
      toast.success('Work item created successfully')
    },
    onError: (error: Error) => {
      toast.error(
        error?.message ||
          'An error occurred while trying to create a work item, please try again'
      )
    },
  })

  const mutationEditWorkItem = useMutation({
    mutationFn: (workItem: WorkItem) => {
      if (!isAdmin() && !isUser())
        throw new Error('You are not authorized to update work items')
      return updateWorkItem({
        ...workItem,
        ...createStarterFinisherByUser(account, workItem),
      })
    },
    onSuccess: (data: WorkItemBase, context) => {
      setWorkItems(
        workItems.map((workItem) => {
          if (workItem.id === data.id) {
            return {
              ...context,
              ...data,
              ...createStarterFinisherByUser(account, context),
            }
          }
          return workItem
        })
      )
      toast.success('Work item updated successfully')
    },
    onError: (error: Error) => {
      toast.error(
        error?.message ||
          'An error occurred while trying to update a work item, please try again'
      )
    },
  })

  const mutationDeleteWorkItem = useMutation({
    mutationFn: (workItemId: number) => {
      if (!isAdmin() && !isUser())
        throw new Error('You are not authorized to delete work items')
      return deleteWorkItem(workItemId)
    },
    onSuccess: (data: WorkItemBase) => {
      setWorkItems(workItems.filter((workItem) => workItem.id !== data.id))
      toast.success('Work item deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(
        error?.message ||
          'An error occurred while trying to delete a work item, please try again'
      )
    },
  })

  useEffect(() => {
    if (data) {
      setWorkItems(data)
    }
  }, [data])

  return {
    workItems,
    setWorkItems,
    isLoading,
    error,
    mutationAddWorkItem,
    mutationEditWorkItem,
    mutationDeleteWorkItem,
  }
}
