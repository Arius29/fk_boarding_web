import { Process } from '../../process/interfaces/process'
import { User } from '../../sherpas/interfaces/user'
import { ProcessUserStatus } from './process-user-status'

export interface ProcessUser {
  processId: number
  userId: string
  status: ProcessUserStatus
  startedOn?: Date
  finishedOn?: Date
  startedBy?: string
  finishedBy?: string
  process?: Process
  user?: User
  starter?: User
  finisher?: User
}
