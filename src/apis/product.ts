import { FashionProduct } from '@/types'
import axiosInstance from '@/utils/axiosInstance'

export const getRandomProduct = async (): Promise<FashionProduct[]> => {
  return await axiosInstance.get('api/products')
}
