import { FashionProduct } from '@/types'
import axiosInstance from '@/utils/axiosInstance'

const limit_product = 20

export const getRandomProduct = async (): Promise<FashionProduct[]> => {
  return await axiosInstance.get('api/products/random')
}

export const getListProductByCategory = async ({
  category,
  page
}: {
  category: string
  page: number
}): Promise<{
  products: FashionProduct[]
  totalPages: number
}> => {
  return await axiosInstance.get(`v1/api/products/category/${category}`, {
    params: { limit: limit_product, page: page }
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
