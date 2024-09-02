import { NotificationUser } from '../pages/notifications/interfaces/notification-user'

export const NOTIFICATIONS_MOCK: NotificationUser[] = [
  {
    isRead: false,
    notificationId: 1,
    notification: {
      id: 1,
      title: 'title',
      message: 'message',
      sendOn: new Date(),
      createdOn: new Date(),
    },
  },
  {
    isRead: true,
    notificationId: 2,
    notification: {
      id: 2,
      title: 'title',
      message: 'message',
      sendOn: new Date(),
      createdOn: new Date(),
    },
  },
  {
    isRead: false,
    notificationId: 3,
    notification: {
      id: 3,
      title: 'title',
      message: 'message',
      sendOn: new Date(),
      createdOn: new Date(),
    },
  },
]
