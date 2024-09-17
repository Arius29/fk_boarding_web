import { UserBase } from '../../sherpas/interfaces/user-base'

export interface WorkItemReporter {
  workItemId: number
  userId: string
  user?: UserBase
}
