import { Link } from 'react-router-dom'
import { WORK_ITEM_MENU_ROUTES } from '../constants/work-item-menu-routes.contanst'

export const WorkItemNav = () => {
  return (
    <nav className="rounded-md bg-gray-50 p-6 mb-4">
      <ul className="flex flex-row flex-nowrap gap-7 text-gray-600">
        {WORK_ITEM_MENU_ROUTES.map((route) => (
          <li key={route.path}>
            <Link
              to={route.path}
              className="outline-none ring-0 hover:text-blue-550 focus:text-blue-550 active:text-blue-550"
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
