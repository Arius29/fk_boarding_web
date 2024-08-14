import { ErrorBoundary } from 'react-error-boundary'
import { AsideMenu } from './aside-menu'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-8 min-h-screen">
      <AsideMenu />
      <main className="col-span-7 p-10 w-4/5 mx-auto flex flex-col">
        <ErrorBoundary fallback={<span>Error on page</span>}>
          {children}
        </ErrorBoundary>
      </main>
    </div>
  )
}
