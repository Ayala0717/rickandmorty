import { RouteObject } from 'react-router'
import Login from '@/views/login'
import NotFound from '@/views/not-found'
import Home from '@/views/home'
import Index from '@/views'
import ErrorPage from '@/views/error-page'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <Home />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  },
  { path: '*', element: <NotFound /> }
]
