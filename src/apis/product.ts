import { FashionProduct } from '@/types'
import axiosInstance from '@/utils/axiosInstance'

export const getRandomProduct = async (): Promise<FashionProduct[]> => {
  return await axiosInstance.get('api/products/random')
}

export const getListProductByCategory = async (
  category: string
): Promise<FashionProduct[]> => {
  return await axiosInstance.get(`api/products/category/${category}`)
}

export const orderProductByPrice = async ({
  category,
  type
}: {
  category: string
  type: string
}): Promise<FashionProduct[]> => {
  return await axiosInstance.get('api/products/sort', {
    params: { category, type }
  })
}
