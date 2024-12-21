import { FashionProduct } from '@/types'
import axiosInstance from '@/utils/axiosInstance'

export const getRandomProduct = async (): Promise<FashionProduct[]> => {
  return await axiosInstance.get('api/products/random')
}

export const getListProductByCategory = async ({
  category,
  page,
  limit
}: {
  category: string
  page?: number
  limit?: number
}): Promise<{
  products: FashionProduct[]
  totalPages: number
}> => {
  return await axiosInstance.get(`v1/api/products/category/${category}`, {
    params: { limit, page: page }
  })
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

export const getDetailProduct = async (id: string): Promise<FashionProduct> => {
  return await axiosInstance.get(`api/products/detail/${id}`)
}
