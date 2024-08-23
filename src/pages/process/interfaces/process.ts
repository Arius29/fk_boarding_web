import { User } from '../../sherpas/interfaces/user'

export interface Process {
  id: number
  name: string
  description: string
  createdBy: string
  createdOn: string
  creator?: User
}
