import { User } from '../../sherpas/interfaces/user'
import { WorkItemRecipientBase } from './work-item-recipient-base'

export interface WorkItemRecipient extends WorkItemRecipientBase {
  user?: User | null
  starter?: User | null
  finisher?: User | null
}
