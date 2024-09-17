import { WorkItemCategoryBase } from '../../categories/interfaces/work-item-category-base'
import { ProcessBase } from '../../process/interfaces/process-base'
import { User } from '../../sherpas/interfaces/user'
import { WorkItemTag } from '../../tags/interfaces/wok-item-tag'
import { WorkItemPriority } from './work-item-priority'
import { WorkItemRecipient } from './work-item-recipient'
import { WorkItemReporter } from './work-item-reporter'
import { WorkItemStatus } from './work-item-status'

export interface WorkItem {
  id: number
  categoryId: number
  processId: number
  parentId?: number | null
  name: string
  priority?: WorkItemPriority | null
  order: number
  status: WorkItemStatus
  startedOn?: string | null
  finishedOn?: string | null
  startedBy?: string | null
  finishedBy?: string | null
  notes?: string | null
  finisher?: User
  starter?: User
  process?: ProcessBase
  category?: WorkItemCategoryBase
  reporters?: WorkItemReporter[]
  recipients?: WorkItemRecipient[]
  tags?: WorkItemTag[]
}
