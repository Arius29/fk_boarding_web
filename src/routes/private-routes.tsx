import { RouteObject } from 'react-router-dom'
import {
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

export const privateRoutes: RouteObject[] = [
  PrivateRouteAsideMenu({
    path: HOME_PAGE_URL,
    element: <h1>Tasks</h1>,
  }),
  PrivateRouteAsideMenu({
    path: SHERPAS_PAGE_URL,
    element: <h1>Sherpas</h1>,
  }),
  PrivateRouteAsideMenu({
    path: TASKS_PAGE_URL,
    element: <h1>Tasks</h1>,
  }),
  PrivateRouteAsideMenu({
    path: PROCESS_PAGE_URL,
    element: <h1>Process</h1>,
  }),
  PrivateRouteAsideMenu({
    path: TAGS_PAGE_URL,
    element: <TagPage />,
  }),
  PrivateRouteAsideMenu({
    path: NOTIFICATIONS_PAGE_URL,
    element: <h1>Notifications</h1>,
  }),
  PrivateRouteAsideMenu({
    path: SHERPAS_PROCESS_PAGE_URL,
    element: <h1>Sherpas process</h1>,
  }),
]
