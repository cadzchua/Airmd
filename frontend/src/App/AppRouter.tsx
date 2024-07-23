import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './AppLayout'
import { WelcomePage } from '@/welcomepage/WelcomePage'

export const routes = {
  index: '/',
  welcome: '/welcome',
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: routes.welcome, element: <WelcomePage /> },
      { path: '*', element: <WelcomePage /> },
    ],
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
