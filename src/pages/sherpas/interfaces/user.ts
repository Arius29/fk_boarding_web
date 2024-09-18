import { ProcessBase } from '../../process/interfaces/process-base'
import { ProcessUser } from '../../sherpas-process/interfaces/process-user'
import { WorkItem } from '../../work-items/interfaces/work-item'
import { WorkItemRecipient } from '../../work-items/interfaces/work-item-recipient'
import { WorkItemReporter } from '../../work-items/interfaces/work-item-reporter'
import { UserBase } from './user-base'

export enum Type {
  Azure = 0,
  Temporally = 1,
}

export interface User extends UserBase {
  uid?: string
  phoneNumber?: string
  birthDate?: string
  address?: string
  matiralStatus?: string
  haveChildren?: boolean
  hobbies?: string
  position?: string
  notes?: string
  createdProcesses?: ProcessBase[]
  processUsers?: ProcessUser[]
  assignedWorkItems?: WorkItem[]
  createdWorkItems?: WorkItem[]
  finishedWorkItems?: WorkItem[]
  reporters?: WorkItemReporter[]
  recipients?: WorkItemRecipient[]
}
