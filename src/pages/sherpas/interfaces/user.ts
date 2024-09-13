export enum Type {
  Azure = 0,
  Temporally = 1,
}

export interface User {
  id: string
  uid?: string
  email: string
  name: string
  avatar: string
  type: Type
  phoneNumber?: string
  birthDate?: string
  address?: string
  matiralStatus?: string
  haveChildren?: boolean
  hobbies?: string
  position?: string
  notes?: string
}
