import { WorkItemPriority } from './work-item-priority'
import { WorkItemStatus } from './work-item-status'

export interface WorkItemBase {
  id: number
  categoryId: number
  processId: number
  parentId?: number | null
  name: string
  priority?: WorkItemPriority | null
  order: number
  status: WorkItemStatus
  dueDate?: string | null
  assignedTo?: string | null
  startedOn?: string | null
  finishedOn?: string | null
  startedBy?: string | null
  finishedBy?: string | null
  notes?: string | null
}
