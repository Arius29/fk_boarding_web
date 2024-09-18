import { UserBase } from '../../sherpas/interfaces/user-base'
import { WorkItemPriority } from './work-item-priority'
import { WorkItemStatus } from './work-item-status'

export interface UpdateWorkItem {
  id: number
  processId?: number | null
  categoryId?: number | null
  parentId?: number | null
  name?: string | null
  priority?: WorkItemPriority | null
  order?: number | null
  status?: WorkItemStatus | null
  dueDate?: string | null
  startedOn?: string | null
  finishedOn?: string | null
  notes?: string | null
  starter?: UserBase | null
  finisher?: UserBase | null
  assigner?: UserBase | null
}
