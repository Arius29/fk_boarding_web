import { UserBase } from '../../sherpas/interfaces/user-base'

export interface CreateProcess {
  name: string
  description?: string
  createdOn?: string
  creator?: UserBase
}
