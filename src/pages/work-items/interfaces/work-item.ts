import { WorkItemCategoryBase } from '../../categories/interfaces/work-item-category-base'
import { ProcessBase } from '../../process/interfaces/process-base'
import { User } from '../../sherpas/interfaces/user'
import { WorkItemTag } from '../../tags/interfaces/wok-item-tag'
import { WorkItemBase } from './work-item-base'
import { WorkItemRecipient } from './work-item-recipient'
import { WorkItemReporter } from './work-item-reporter'

export interface WorkItem extends WorkItemBase {
  assigner?: User | null
  finisher?: User | null
  starter?: User | null
  process?: ProcessBase | null
  category?: WorkItemCategoryBase | null
  reporters?: WorkItemReporter[] | null
  recipients?: WorkItemRecipient[] | null
  tags?: WorkItemTag[] | null
}
