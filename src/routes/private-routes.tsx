import { RouteObject } from 'react-router-dom'
import {
  ADD_SHERPA_PAGE_URL,
  CATEGORIES_PAGE_URL,
  EDIT_SHERPA_PAGE_URL,
  HOME_PAGE_URL,
  NOTIFICATIONS_PAGE_URL,
  PROCESS_PAGE_URL,
  SHERPAS_PAGE_URL,
  SHERPAS_PROCESS_PAGE_URL,
  TAGS_PAGE_URL,
  TASK_CALENDAR_PAGE_URL,
  TASKS_PAGE_URL,
} from './routes-config'
import { PrivateRouteAsideMenu } from '../components/common/private-route-aside-menu'
import { TagPage } from '../pages/tags/tag-page'
import { SherpasPage } from '../pages/sherpas/sherpas-page'
import { ProcessPage } from '../pages/process/process-page'
import { SherpaFormPage } from '../pages/sherpas/sherpa-form-page'
import { SherpasProcessPage } from '../pages/sherpas-process/sherpas-process-page'
import { NotificationsPage } from '../pages/notifications/notifications-page'
import { WorkItemCategoryPage } from '../pages/categories/work-item-category-page'
import { WorkItemsPage } from '../pages/work-items/work-items-page'
import { WorkItemsCalendarPage } from '../pages/work-items/work-items-calendar-page'

export const privateRoutes: RouteObject[] = [
  PrivateRouteAsideMenu({
    path: HOME_PAGE_URL,
    element: <WorkItemsPage />,
  }),
  PrivateRouteAsideMenu({
    path: SHERPAS_PAGE_URL,
    element: <SherpasPage />,
  }),
  PrivateRouteAsideMenu({
    path: TASKS_PAGE_URL,
    element: <WorkItemsPage />,
  }),
  PrivateRouteAsideMenu({
    path: TASK_CALENDAR_PAGE_URL,
    element: <WorkItemsCalendarPage />,
  }),
  PrivateRouteAsideMenu({
    path: PROCESS_PAGE_URL,
    element: <ProcessPage />,
  }),
  PrivateRouteAsideMenu({
    path: CATEGORIES_PAGE_URL,
    element: <WorkItemCategoryPage />,
  }),
  PrivateRouteAsideMenu({
    path: TAGS_PAGE_URL,
    element: <TagPage />,
  }),
  PrivateRouteAsideMenu({
    path: NOTIFICATIONS_PAGE_URL,
    element: <NotificationsPage />,
  }),
  PrivateRouteAsideMenu({
    path: SHERPAS_PROCESS_PAGE_URL,
    element: <SherpasProcessPage />,
  }),
  PrivateRouteAsideMenu({
    path: EDIT_SHERPA_PAGE_URL,
    element: <SherpaFormPage mode="edit" />,
  }),
  PrivateRouteAsideMenu({
    path: ADD_SHERPA_PAGE_URL,
    element: <SherpaFormPage mode="add" />,
  }),
]
