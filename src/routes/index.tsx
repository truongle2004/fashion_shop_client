import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const Home = lazy(() => import('@/pages/Home'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/home'} replace />
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    )
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Register />
      </Suspense>
    )
  },
  {
    path: '/home',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    )
  }
])

export default router
