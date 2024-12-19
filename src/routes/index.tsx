import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from '@/components/layout'

const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const Home = lazy(() => import('@/pages/Home'))
const Collection = lazy(() => import('@/pages/Collection'))
const Detail = lazy(() => import('@/pages/Detail'))

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
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'home',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        )
      },
      {
        path: 'collection/:category',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Collection />
          </Suspense>
        )
      },
      {
        path: 'detail',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Detail />
          </Suspense>
        )
      }
    ]
  }
])

export default router
