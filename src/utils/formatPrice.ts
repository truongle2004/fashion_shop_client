/**
 * Format price
 * @params {number} price
 * */
export const formatPriceCustom = (price: number, currency: string) => {
  return new Intl.NumberFormat('vi-VN').format(price) + currency
}
