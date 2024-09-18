import { WorkItem } from './work-item'

export interface WorkItemForm extends WorkItem {
  autoAddRecipients?: boolean | null
}
