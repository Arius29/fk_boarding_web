import { PagedResultNotification } from '../pages/notifications/interfaces/paged-result-notification'

export const NOTIFICATIONS_MOCKS: PagedResultNotification = {
  pageNumber: 1,
  pageSize: 10,
  totalPages: 1,
  totalRecords: 1,
  items: [
    {
      isRead: true,
      notificationId: 1,
      notification: {
        id: 1,
        title: 'Work item recipient created',
        message:
          'A new work item recipient has been created on "Documentacion". Recipient name: "Valeria Salas". Please check it."',
        sendOn: new Date(),
        createdOn: new Date(),
      },
    },
    {
      isRead: false,
      notificationId: 1,
      notification: {
        id: 1,
        title: 'Notification 1',
        message: 'Notification 1 message',
        sendOn: new Date(),
        createdOn: new Date(),
      },
    },
  ],
}
