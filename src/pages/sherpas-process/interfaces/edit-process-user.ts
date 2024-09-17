import { UserBase } from '../../sherpas/interfaces/user-base'
import { ProcessUserStatus } from './process-user-status'

export interface EditProcessUser {
  processId: number
  status: ProcessUserStatus
  startedOn?: string | null
  finishedOn?: string | null
  user: UserBase
  starter?: UserBase | null
  finisher?: UserBase | null
}
