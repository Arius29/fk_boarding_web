import { ProcessUser } from './../../sherpas-process/interfaces/process-user'
import { User } from '../../sherpas/interfaces/user'
import { ProcessBase } from './process-base'
import { WorkItem } from '../../work-items/interfaces/work-item'
import { WorkItemCategoryBase } from '../../categories/interfaces/work-item-category-base'

export interface Process extends ProcessBase {
  creator?: User
  processUsers?: ProcessUser[]
  categories?: WorkItemCategoryBase[]
  workItems?: WorkItem[]
}
