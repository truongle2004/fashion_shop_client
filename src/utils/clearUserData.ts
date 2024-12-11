import { logOutApis } from '@/apis/auth'

/**
 *  Clear user data in local storage, token in cookies and redirect to login
 * */
export const clearUserData = async () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('id')

  await logOutApis()
}
