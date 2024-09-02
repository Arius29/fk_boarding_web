import { NotificationUser } from './notification-user'

export interface PagedResultNotification {
  items?: NotificationUser[]
  totalRecords: number
  totalPages: number
  pageNumber: number
  pageSize: number
}
