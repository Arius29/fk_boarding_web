import { NotificationUser } from '../pages/notifications/interfaces/notification-user'
import { PagedResultNotification } from '../pages/notifications/interfaces/paged-result-notification'
import { fetchApi } from '../utils/fetch-util'

interface GetNotificationsProps {
  userId: string
  pageNumber: number
  pageSize: number
  omitSend: boolean
}

interface MarkAsReadProps {
  notificationId: number
  userId: string
}

export const useNotificationsApi = () => {
  const getNotifications = async ({
    userId,
    pageNumber,
    pageSize,
    omitSend = false,
  }: GetNotificationsProps) => {
    const url = `${process.env.VITE_API_URL!}/api/notification/get`

    const response: PagedResultNotification = await fetchApi(url, 'POST', {
      userId,
      pageNumber,
      pageSize,
      omitSend,
    })

    return response
  }

  const markAsRead = async ({ notificationId, userId }: MarkAsReadProps) => {
    const url = `${process.env.VITE_API_URL!}/api/notification/update`
    const response: NotificationUser = await fetchApi(url, 'POST', {
      notificationId,
      userId,
    })

    return response
  }

  return { getNotifications, markAsRead }
}
