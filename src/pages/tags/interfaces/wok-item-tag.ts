import { Tag } from './tag'

export interface WorkItemTag {
  workItemId: number
  tagId: number
  tag?: Tag
}
