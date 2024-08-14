import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { publicRoutes } from './routes/public-routes'
import { privateRoutes } from './routes/private-routes'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react'

function App() {
  const publicRouter = createBrowserRouter(publicRoutes)
  const privateRouter = createBrowserRouter(privateRoutes)
  return (
    <>
      <AuthenticatedTemplate>
        <RouterProvider router={privateRouter} />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <RouterProvider router={publicRouter} />
      </UnauthenticatedTemplate>
    </>
  )
}

export default App
