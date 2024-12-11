import { RouterProvider } from 'react-router-dom'
import router from './routes'

function App() {
  // const isAuthorized = !!localStorage.getItem('accessToken')

  // if (!isAuthorized) {
  //   if (!['/login', '/register'].includes(window.location.pathname)) {
  //     toastifyError('You should login first!')
  //   }
  //   router.navigate('/login')
  // }

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
