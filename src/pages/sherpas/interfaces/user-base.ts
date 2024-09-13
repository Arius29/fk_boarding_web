import { Type } from './user'

export interface UserBase {
  id: string
  name: string
  email: string
  avatar: string
  type: Type
}
