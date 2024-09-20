import { toast, Toaster } from 'sonner'
import { Title } from '../../components/common/core/title'
import { useNotificationsApiQuery } from '../../hooks/use-notifications-api-query'
import { useState } from 'react'
import { NotificationItem } from './components/notification-item'
const initialState = {
  pageNumber: 1,
  pageSize: 10,
}
export const NotificationsPage = () => {
  const [pagePagination, setPagePagination] = useState(initialState)
  const { notificationsResult, mutationMrkAsRead } = useNotificationsApiQuery({
    pageNumber: pagePagination.pageNumber,
    pageSize: pagePagination.pageSize,
  })

  const handleGetMoreNotifications = () => {
    if (notificationsResult.totalPages === pagePagination.pageNumber) {
      toast.error('No more notifications')
      return
    }
    setPagePagination((prev) => ({ ...prev, pageNumber: prev.pageNumber + 1 }))
  }

  const handleMarkAsRead = (notificationId: number) => {
    if (
      !notificationsResult.items?.find(
        (item) => item.notificationId === notificationId
      )?.isRead == true
    )
      mutationMrkAsRead.mutate(notificationId)
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <Title>Notifications</Title>
      <section
        className="sm:rounded-lg flex-1 flex flex-col justify-between items-center"
        style={{ maxHeight: 'calc(100vh - 208px)' }}
      >
        <ul className="w-full space-y-3 flex-1 overflow-y-auto">
          {notificationsResult.items?.map((notificationUser) => (
            <NotificationItem
              key={notificationUser.notification.id}
              title={notificationUser.notification.title}
              message={notificationUser.notification.message}
              time={
                notificationUser.notification.sendOn ??
                notificationUser.notification.createdOn
              }
              isRead={notificationUser.isRead}
              onClick={() => handleMarkAsRead(notificationUser.notificationId)}
            />
          ))}
        </ul>
        <button
          onClick={handleGetMoreNotifications}
          className="w-fit mt-3 py-2 px-4 rounded bg-blue-550 text-white mx-auto ring-0 outline-none transition-colors delay-0 duration-150 ease-in-out hover:bg-blue-650 focus:bg-blue-650 active:bg-blue-650"
        >
          Get more notifications
        </button>
      </section>
    </>
  )
}
