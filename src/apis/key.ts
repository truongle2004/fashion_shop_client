import type { GetKeyResponse } from '@/types'
import axiosInstance from '@/utils/axiosInstance'

export const getKey = async (): Promise<GetKeyResponse> => {
  return await axiosInstance.get('api/public-key')
}
