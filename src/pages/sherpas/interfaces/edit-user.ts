import { Type } from './user'

export interface EditUser {
  id: string
  uid?: string
  email?: string
  name?: string
  avatar?: string
  type?: Type
  phoneNumber?: string
  birthDate?: string
  address?: string
  matiralStatus?: string
  haveChildren?: boolean
  hobbies?: string
  position?: string
  notes?: string
}
