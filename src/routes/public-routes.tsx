import { RouteObject } from 'react-router-dom'
import { LoginPage } from '../pages/login/login-page'
import { LOGIN_PAGE_URL } from './routes-config'

export const publicRoutes: RouteObject[] = [
  {
    path: LOGIN_PAGE_URL,
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <LoginPage />,
  },
]
