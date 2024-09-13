import { User } from '../../sherpas/interfaces/user'
import { ProcessBase } from './process-base'

export interface Process extends ProcessBase {
  creator?: User
}
