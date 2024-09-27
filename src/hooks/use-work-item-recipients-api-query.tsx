import { AccountInfo } from '@azure/msal-browser'
import { Type, User } from '../pages/sherpas/interfaces/user'
import { getAvatarRandom } from '../utils/avatar-util'
import { WorkItemRecipient } from '../pages/work-items/interfaces/work-item-recipient'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { useWorkItemRecipientsApi } from './use-work-item-recipients-api'
import { useMutation, useQuery } from 'react-query'
import { WorkItemRecipientBase } from '../pages/work-items/interfaces/work-item-recipient-base'

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
  workItemRecipient: WorkItemRecipient
) => {
  const starter =
    workItemRecipient?.starter ||
    (workItemRecipient.status === 1 && !workItemRecipient.startedBy
      ? createBaseUser(account)
      : null)

  const finisher =
    workItemRecipient?.finisher ||
    (workItemRecipient.status === 2 && !workItemRecipient.finishedBy
      ? createBaseUser(account)
      : null)

  return {
    userId: workItemRecipient.user?.id || workItemRecipient.userId,
    startedOn:
      workItemRecipient.status === 1 && !workItemRecipient.startedOn
        ? new Date().toISOString()
        : workItemRecipient.startedOn || null,
    startedBy: starter?.id || null,
    finishedBy: finisher?.id || null,
    finishedOn:
      workItemRecipient.status === 2 && !workItemRecipient.finishedOn
        ? new Date().toISOString()
        : workItemRecipient.finishedOn || null,
    starter: starter,
    finisher: finisher,
  }
}

interface useWorkItemRecipientsApiQueryProps {
  workItemId?: number | null
  userId?: string | null
  includeUsers?: boolean
  omitAbandoned?: boolean
  enabled?: boolean
}

export const useWorkItemRecipientsApiQuery = ({
  workItemId = null,
  userId = null,
  includeUsers = false,
  omitAbandoned = false,
  enabled = true,
}: useWorkItemRecipientsApiQueryProps) => {
  const [recipients, setRecipients] = useState<WorkItemRecipient[]>([])
  const { accounts } = useMsal()
  const account = accounts[0]
  const { getRecipients, createRecipient, updateRecipient, deleteRecipient } =
    useWorkItemRecipientsApi()

  const { data, isLoading, error } = useQuery({
    queryKey: ['recipients'],
    queryFn: () =>
      getRecipients({ includeUsers, omitAbandoned, workItemId, userId }),
    staleTime: 300000,
    cacheTime: 600000,
    enabled: enabled,
    onError: () => {
      toast.error('An error occurred while trying to get recipients')
    },
  })

  const mutationAddRecipient = useMutation({
    mutationFn: (workItemRecipient: WorkItemRecipient) => {
      return createRecipient({
        ...workItemRecipient,
        user: workItemRecipient.user ?? createBaseUser(account),
        status: workItemRecipient.status || 0,
        ...createStarterFinisherByUser(account, workItemRecipient),
      })
    },
    onSuccess: (data: WorkItemRecipientBase, context: WorkItemRecipient) => {
      setRecipients([
        ...recipients,
        {
          ...data,
          ...createStarterFinisherByUser(account, data),
          user: context.user,
        },
      ])
      toast.success('Recipient created successfully')
    },
    onError: () => {
      toast.error(
        'An error occurred while trying to create a recipient, please try again'
      )
    },
  })

  const mutationEditRecipient = useMutation({
    mutationFn: (workItemRecipient: WorkItemRecipient) => {
      return updateRecipient({
        ...workItemRecipient,
        user: workItemRecipient.user ?? createBaseUser(account),
        ...createStarterFinisherByUser(account, workItemRecipient),
      })
    },
    onSuccess: (data: WorkItemRecipientBase, context: WorkItemRecipient) => {
      setRecipients(
        recipients.map((recipient) => {
          if (
            recipient.workItemId === data.workItemId &&
            recipient.userId === data.userId
          ) {
            return {
              ...context,
              ...data,
              ...createStarterFinisherByUser(account, context),
            }
          }
          return recipient
        })
      )
      toast.success('Recipient updated successfully')
    },
    onError: () => {
      toast.error(
        'An error occurred while trying to update a recipient, please try again'
      )
    },
  })

  const mutationDeleteRecipient = useMutation({
    mutationFn: (workItemRecipient: WorkItemRecipient) => {
      return deleteRecipient(
        workItemRecipient.workItemId,
        workItemRecipient.userId
      )
    },
    onSuccess: (data: WorkItemRecipientBase) => {
      setRecipients(
        recipients.filter(
          (recipient) =>
            recipient.workItemId !== data.workItemId &&
            recipient.userId !== data.userId
        )
      )
      toast.success('Recipient deleted successfully')
    },
    onError: () => {
      toast.error(
        'An error occurred while trying to delete a recipient, please try again'
      )
    },
  })

  useEffect(() => {
    if (data) {
      setRecipients(data)
    }
  }, [data])

  return {
    recipients,
    isLoading,
    error,
    mutationAddRecipient,
    mutationEditRecipient,
    mutationDeleteRecipient,
  }
}
