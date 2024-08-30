import { Type } from '../../sherpas/interfaces/user'

export interface CreateProcessUser {
  processId: number
  userId: string
  status: number
  startedOn?: Date
  finishedOn?: Date
  startedBy?: string
  finishedBy?: string
  autoAddWorkItemsUser?: boolean
  type?: Type
  userName?: string
  email?: string
  avatar?: string
}
