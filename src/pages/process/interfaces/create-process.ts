import { Type } from '../../sherpas/interfaces/user'

export interface CreateProcess {
  name: string
  description: string
  createdBy: string
  createdOn?: string
  userName?: string
  email?: string
  avatar?: string
  type?: Type
}
