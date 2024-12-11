import axios from 'axios'
import { toastifyError, toastifySuccess } from './toastify'
import { refreshTokenApi } from '@/apis/token'
import router from '@/routes'
import { clearUserData } from '@/utils/clearUserData'

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 1000 * 60 * 5, // 5 minutes
  withCredentials: true
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => {
    const { data } = response
    const { accessToken, message } = data

    if (message) {
      toastifySuccess(message)
    }

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
      axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`
    }

    return data
  },
  async (error) => {
    const { response, config } = error
    const originalRequest = config

    if (!response) {
      toastifyError('Network error, please try again later.')
      return Promise.reject(error)
    }

    const { status, data } = response
    const { message } = data

    if (message) {
      toastifyError(message)
    }

    // NOTE: Handle Unauthorized (401) - Token Expired or Invalid
    if (status === 401) {
      clearUserData()
      router.navigate('/login')
    }

    // NOTE: Handle Token Expiry (410) - Attempt Refresh Token Flow
    if (status === 410 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await refreshTokenApi()

        // NOTE: Retry original request after refreshing token successfully
        return axiosInstance.request(originalRequest)
      } catch (refreshError) {
        clearUserData()
        router.navigate('/login')
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
