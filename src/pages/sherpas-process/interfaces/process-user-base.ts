import { ProcessUserStatus } from './process-user-status'

export interface ProcessUserBase {
  processId: number
  userId: string
  status: ProcessUserStatus
  startedOn?: string | null
  finishedOn?: string | null
  startedBy?: string | null
  finishedBy?: string | null
}
