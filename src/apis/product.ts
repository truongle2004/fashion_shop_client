import { FashionProduct } from '@/types'
import axiosInstance from '@/utils/axiosInstance'

export const getRandomProduct = async (): Promise<FashionProduct[]> => {
  return await axiosInstance.get('api/products')
}

export const getPorductByCategory = async (
  category: string
): Promise<FashionProduct[]> => {
  return await axiosInstance.get(`api/products/${category}`)
}

export const getListProductByCategory = async (
  category: string
): Promise<FashionProduct[]> => {
  return await axiosInstance.get(`api/products/${category}`)
}
