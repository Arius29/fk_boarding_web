import {
  TASK_CALENDAR_PAGE_URL,
  TASK_HISTORY_PAGE_URL,
  TASKS_PAGE_URL,
} from '../../../routes/routes-config'

export const WORK_ITEM_MENU_ROUTES = [
  {
    path: TASKS_PAGE_URL,
    label: 'Overview',
  },
  {
    path: TASK_HISTORY_PAGE_URL,
    label: 'History',
  },
  {
    path: TASK_CALENDAR_PAGE_URL,
    label: 'Calendar',
  },
]
