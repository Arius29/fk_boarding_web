import { ReactNode } from 'react'
import {
  CATEGORIES_PAGE_URL,
  NOTIFICATIONS_PAGE_URL,
  PROCESS_PAGE_URL,
  SHERPAS_PAGE_URL,
  SHERPAS_PROCESS_PAGE_URL,
  TAGS_PAGE_URL,
  TASKS_PAGE_URL,
} from '../../../../routes/routes-config'
import {
  IconBell,
  IconCategory,
  IconColumns3,
  IconLayoutKanban,
  IconSpaces,
  IconTags,
} from '@tabler/icons-react'

import FactorKLogo from '../../../../assets/images/factor-k-logo.png'

interface AsideRoute {
  path: string
  label: string
  icon?: ReactNode
}

export const asideRoutes: AsideRoute[] = [
  {
    path: TASKS_PAGE_URL,
    label: 'Tasks',
    icon: <IconColumns3 stroke={2} width={24} height={24} />,
  },
  {
    path: PROCESS_PAGE_URL,
    label: 'Process',
    icon: <IconLayoutKanban stroke={2} width={24} height={24} />,
  },
  {
    path: CATEGORIES_PAGE_URL,
    label: 'Categories',
    icon: <IconCategory stroke={2} width={24} height={24} />,
  },
  {
    path: TAGS_PAGE_URL,
    label: 'Tags',
    icon: <IconTags stroke={2} width={24} height={24} />,
  },
  {
    path: NOTIFICATIONS_PAGE_URL,
    label: 'Notifications',
    icon: <IconBell stroke={2} width={24} height={24} />,
  },
  {
    path: SHERPAS_PROCESS_PAGE_URL,
    label: 'Sherpas process',
    icon: <IconSpaces stroke={2} width={24} height={24} />,
  },
  {
    path: SHERPAS_PAGE_URL,
    label: 'Sherpas',
    icon: (
      <img
        src={FactorKLogo}
        alt="Factor K Logo"
        className="w-6 h-6 grayscale invert group-hover:grayscale-0 group-hover:invert-0 group-active:grayscale-0 group-active:invert-0 group-focus:grayscale-0 group-focus:invert-0"
      />
    ),
  },
]
