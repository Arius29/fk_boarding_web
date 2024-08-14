import { RouteObject } from 'react-router-dom'
import { MainLayout } from './layout/main-layout'

export const PrivateRouteAsideMenu = ({ element, ...rest }: RouteObject) => {
  return {
    ...rest,
    element: <MainLayout>{element}</MainLayout>,
  }
}
