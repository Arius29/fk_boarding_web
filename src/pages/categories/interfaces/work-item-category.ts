import { ProcessBase } from '../../process/interfaces/process-base'
import { WorkItem } from '../../work-items/interfaces/work-item'
import { WorkItemCategoryBase } from './work-item-category-base'

export interface WorkItemCategory extends WorkItemCategoryBase {
  process?: ProcessBase
  workItems?: WorkItem[]
}
