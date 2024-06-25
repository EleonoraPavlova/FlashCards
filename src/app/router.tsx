import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { CheckEmailPage } from '@/pages/check-email-page'
import { PasswordRecoveryPage } from '@/pages/password-recovery-page'
import { SignInPage } from '@/pages/sign-in-page'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: '/sign-in',
  },
  {
    element: <CheckEmailPage />,
    path: '/check-email',
  },
  {
    element: <PasswordRecoveryPage />,
    path: '/password-recovery',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <div>test temporary page delete</div>,
    path: '/',
  },
]

const router = createBrowserRouter([...privateRoutes, ...publicRoutes])

export function Router() {
  return <RouterProvider router={router} />
}
