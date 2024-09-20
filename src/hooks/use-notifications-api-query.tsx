import { useMsal } from '@azure/msal-react'
import { NotificationUser } from '../pages/notifications/interfaces/notification-user'
import { useState } from 'react'
import { useNotificationsApi } from './use-notifications-api'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'sonner'
import { PagedResultNotification } from '../pages/notifications/interfaces/paged-result-notification'

const initialState: PagedResultNotification = {
  pageNumber: 1,
  totalRecords: 0,
  pageSize: 10,
  totalPages: 0,
  items: [],
}

interface useNotificationsApiQueryProps {
  omitSend?: boolean
  enabled?: boolean
  userId?: string
  pageNumber: number
  pageSize: number
}

const sortNotifications = (notifications: NotificationUser[]) => {
  return notifications.sort(function (a, b) {
    return a.notification.sendOn ? -1 : b.notification.sendOn ? 1 : 0
  })
}

export const useNotificationsApiQuery = ({
  pageNumber = 1,
  pageSize = 10,
  userId = undefined,
  omitSend = false,
  enabled = true,
}: useNotificationsApiQueryProps) => {
  const [notificationsResult, setNotificationsResult] =
    useState<PagedResultNotification>({
      ...initialState,
      pageNumber: pageNumber,
      pageSize: pageSize,
    })
  const { accounts } = useMsal()
  const account = accounts[0]

  const { getNotifications, markAsRead } = useNotificationsApi()

  const { isLoading, error } = useQuery({
    queryKey: ['notifications', pageNumber],
    queryFn: () =>
      getNotifications({
        userId: userId ?? account?.homeAccountId,
        pageNumber,
        pageSize,
        omitSend,
      }),
    staleTime: 300000,
    cacheTime: 600000,
    enabled: enabled,
    onSuccess: (data) => {
      setNotificationsResult({
        ...data,
        items: sortNotifications([
          ...(notificationsResult.items ?? []),
          ...(data.items ?? []),
        ]),
      })
    },
    onError: () => {
      toast.error('An error occurred while trying to get notifications')
    },
  })

  const mutationMrkAsRead = useMutation({
    mutationFn: (notificationId: number) => {
      return markAsRead({
        notificationId,
        userId: userId ?? account?.homeAccountId,
      })
    },
    onSuccess: (data) => {
      setNotificationsResult({
        ...notificationsResult,
        items: notificationsResult.items?.map((item) =>
          item.notificationId === data.notificationId ? data : item
        ),
      })
    },
    onError: () => {
      toast.error(
        'An error occurred while trying to mark as read, please try again'
      )
    },
  })

  return {
    notificationsResult,
    setNotificationsResult,
    mutationMrkAsRead,
    isLoading,
    error,
  }
}
