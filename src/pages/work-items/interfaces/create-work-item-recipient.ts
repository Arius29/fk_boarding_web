import { UserBase } from '../../sherpas/interfaces/user-base'
import { WorkItemStatus } from './work-item-status'
export interface CreateWorkItemRecipient {
  workItemId: number
  status?: WorkItemStatus
  startedOn?: string | null
  finishedOn?: string | null
  notes?: string | null
  user?: UserBase | null
  starter?: UserBase | null
  finisher?: UserBase | null
}
