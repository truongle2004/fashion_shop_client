import type { LoginResponse, RegisterResponse } from '@/types'
import axiosInstance from '@/utils/axiosInstance'

export const loginApis = async ({
  email,
  password
}: {
  email: string
  password: string
}): Promise<LoginResponse> => {
  return await axiosInstance.post('api/auth/login', { email, password })
}

export const registerApis = async ({
  username,
  email,
  password
}: {
  username: string
  email: string
  password: string
}): Promise<RegisterResponse> => {
  return await axiosInstance.post('api/auth/register', {
    username,
    email,
    password
  })
}

export const logOutApis = async () => {
  return await axiosInstance.delete('api/auth/logout')
}
