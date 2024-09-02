import { RouteObject } from 'react-router-dom'
import {
  ADD_SHERPA_PAGE_URL,
  EDIT_SHERPA_PAGE_URL,
  HOME_PAGE_URL,
  NOTIFICATIONS_PAGE_URL,
  PROCESS_PAGE_URL,
  SHERPAS_PAGE_URL,
  SHERPAS_PROCESS_PAGE_URL,
  TAGS_PAGE_URL,
  TASKS_PAGE_URL,
} from './routes-config'
import { PrivateRouteAsideMenu } from '../components/common/private-route-aside-menu'
import { TagPage } from '../pages/tags/tag-page'
import { SherpasPage } from '../pages/sherpas/sherpas-page'
import { ProcessPage } from '../pages/process/process-page'
import { SherpaFormPage } from '../pages/sherpas/sherpa-form-page'
import { SherpasProcessPage } from '../pages/sherpas-process/sherpas-process-page'
import { NotificationsPage } from '../pages/notifications/notifications-page'

export const privateRoutes: RouteObject[] = [
  PrivateRouteAsideMenu({
    path: HOME_PAGE_URL,
    element: <h1>Tasks</h1>,
  }),
  PrivateRouteAsideMenu({
    path: SHERPAS_PAGE_URL,
    element: <SherpasPage />,
  }),
  PrivateRouteAsideMenu({
    path: TASKS_PAGE_URL,
    element: <h1>Tasks</h1>,
  }),
  PrivateRouteAsideMenu({
    path: PROCESS_PAGE_URL,
    element: <ProcessPage />,
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
