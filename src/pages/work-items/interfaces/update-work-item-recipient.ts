import { UserBase } from '../../sherpas/interfaces/user-base'
import { WorkItemStatus } from './work-item-status'

export interface UpdateWorkItemRecipient {
  workItemId: number
  userId?: string | null
  status?: WorkItemStatus | null
  startedOn?: string | null
  finishedOn?: string | null
  notes?: string | null
  user?: UserBase | null
  starter?: UserBase | null
  finisher?: UserBase | null
}
