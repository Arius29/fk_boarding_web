import { Link, useLocation } from 'react-router-dom'
import { asideRoutes } from './constants/aside-routes.contanst'
import { IconLogout } from '@tabler/icons-react'
import { UserSummary } from './user-summary'
import { useMsal } from '@azure/msal-react'
import FactorKLogo from '../../../assets/images/factor-k-logo.png'
import { HOME_PAGE_URL } from '../../../routes/routes-config'
export const AsideMenu = () => {
  const location = useLocation()
  const { instance } = useMsal()

  const handleLogout = () => {
    instance.logoutRedirect()
  }

  return (
    <aside className="flex flex-col justify-between shadow-md">
      <nav className="p-2">
        <a href={HOME_PAGE_URL} className="w-full grid place-items-center mb-3">
          <img
            src={FactorKLogo}
            alt="Factor K Logo"
            className="w-20 h-w-20 object-center object-contain"
          />
        </a>
        <ul className="space-y-2 flex flex-col">
          {asideRoutes.map((route, index) => (
            <li key={index}>
              <Link
                to={route.path}
                className={
                  route.path == location.pathname
                    ? 'ring-0 group flex flex-row flex-nowrap outline-none w-full gap-3 p-3 bg-blue-550 bg-opacity-10 text-blue-550 rounded items-center'
                    : 'ring-0 group flex flex-row flex-nowrap outline-none w-full gap-3 p-3 bg-white rounded transition-colors items-center ease-in-out duration-150 delay-0 hover:bg-blue-550 active:bg-blue-550 focus:bg-blue-550 hover:bg-opacity-10 active:bg-opacity-10 focus:bg-opacity-10 hover:text-blue-550 active:text-blue-550 focus:text-blue-550'
                }
              >
                {route.icon}
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <section>
        <header className="p-2">
          <button
            className="p-3 outline-none rounded-md ring-0 w-full flex items-center gap-3 transition-colors duration-150 ease-in-out hover:text-red-600 hover:bg-red-200 focus:text-red-600 focus:bg-red-200"
            aria-label="Sign out"
            onClick={handleLogout}
          >
            <IconLogout stroke={2} />
            <span>Sign out</span>
          </button>
        </header>
        <UserSummary />
      </section>
    </aside>
  )
}
