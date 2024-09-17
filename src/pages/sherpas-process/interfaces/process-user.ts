import { ProcessBase } from '../../process/interfaces/process-base'
import { User } from '../../sherpas/interfaces/user'
import { ProcessUserBase } from './process-user-base'

export interface ProcessUser extends ProcessUserBase {
  process?: ProcessBase
  user?: User | null
  starter?: User | null
  finisher?: User | null
}
