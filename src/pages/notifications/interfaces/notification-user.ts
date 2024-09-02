import { Notification } from './notification'
export interface NotificationUser {
  notificationId: number
  isRead: boolean
  notification: Notification
}
