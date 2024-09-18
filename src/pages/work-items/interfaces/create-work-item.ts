import { UserBase } from '../../sherpas/interfaces/user-base'
import { WorkItemTag } from '../../tags/interfaces/wok-item-tag'
import { WorkItemPriority } from './work-item-priority'
import { WorkItemRecipient } from './work-item-recipient'
import { WorkItemReporter } from './work-item-reporter'
import { WorkItemStatus } from './work-item-status'

export interface CreateWorkItem {
  categoryId: number
  processId: number
  parentId?: number | null
  name: string
  priority?: WorkItemPriority | null
  order?: number | null
  status: WorkItemStatus
  startedOn?: string | null
  finishedOn?: string | null
  dueDate?: string | null
  notes?: string | null
  autoAddRecipients?: boolean | null
  assigner?: UserBase | null
  starter?: UserBase | null
  finisher?: UserBase | null
  recipients?: WorkItemRecipient[] | null
  reporters?: WorkItemReporter[] | null
  tags?: WorkItemTag[] | null
}
