import { User } from '../../sherpas/interfaces/user'
import { WorkItemStatus } from './work-item-status'

export interface WorkItemRecipient {
  workItemId: number
  userId: string
  status?: WorkItemStatus
  startedOn?: Date
  finishedOn?: Date
  startedBy?: string
  finishedBy?: string
  notes?: string
  user?: User
  starter?: User
  finisher?: User
}
