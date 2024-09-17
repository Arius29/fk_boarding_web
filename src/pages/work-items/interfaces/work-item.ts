import { WorkItemCategoryBase } from '../../categories/interfaces/work-item-category-base'
import { ProcessBase } from '../../process/interfaces/process-base'
import { User } from '../../sherpas/interfaces/user'
import { WorkItemTag } from '../../tags/interfaces/wok-item-tag'
import { WorkItemRecipient } from './work-item-recipient'
import { WorkItemReporter } from './work-item-reporter'

export interface WorkItem {
  finisher?: User
  starter?: User
  process?: ProcessBase
  category?: WorkItemCategoryBase
  reporters?: WorkItemReporter[]
  recipients?: WorkItemRecipient[]
  tags?: WorkItemTag[]
}
