import { WorkItemStatus } from './work-item-status'

export interface WorkItemRecipientBase {
  workItemId: number
  userId: string
  status?: WorkItemStatus | null
  startedOn?: string | null
  finishedOn?: string | null
  startedBy?: string | null
  finishedBy?: string | null
  notes?: string | null
}
