import { RefreshTokenResponse } from '@/types'
import axiosInstance from '@/utils/axiosInstance'

export const refreshTokenApi = async (): Promise<RefreshTokenResponse> => {
  return await axiosInstance.put('api/auth/refresh')
}
