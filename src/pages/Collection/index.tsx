import { getListProductByCategory, orderProductByPrice } from '@/apis/product'
import HomeCollection2 from '@/assets/img-home-collection2.webp'
import { ListCategory, ListProduct, Pagination } from '@/components'
import { FashionProduct, OrderType } from '@/types'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import styles from './index.module.scss'

const DEFAULT_FIRST_PAGE = 1

// TODO: using global dropdown menu css
const CollectionPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const [totalPages, setTotalPages] = useState(0)

  const [listProducts, setListProducts] = useState<FashionProduct[]>([])

  const [searchParams] = useSearchParams()

  const category = searchParams.get('category')

  const [currentPage, setCurrentPage] = useState<number>(() => {
    const currentPage = searchParams.get('page')
    return currentPage ? Number(currentPage) : DEFAULT_FIRST_PAGE
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const { mutate: orderProductByPriceMutation } = useMutation({
    mutationFn: orderProductByPrice,
    onSuccess: (data) => {
      setListProducts(data)
    }
  })

  const { mutate: getListProductByCategoryMutation } = useMutation({
    mutationFn: getListProductByCategory,
    onSuccess: (data) => {
      const { products, totalPages } = data
      setListProducts(products)
      setTotalPages(totalPages)
    }
  })

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const handleOrderASC = () => {
    if (category) {
      orderProductByPriceMutation({
        category,
        type: OrderType.ASC
      })
    }
    setIsDropdownOpen(false)
  }

  const handleOrderDESC = () => {
    if (category) {
      orderProductByPriceMutation({
        category,
        type: OrderType.DESC
      })
    }
    setIsDropdownOpen(false)
  }

  useEffect(() => {
    if (category)
      getListProductByCategoryMutation({ category, page: currentPage })
  }, [category, currentPage])

  return (
    <>
      <main className="container">
        <section>
          <ListCategory />
        </section>

        <section>
          <img
            src={HomeCollection2}
            className="image"
            alt="Home Collection"
            height="auto"
            width="100%"
          />
        </section>

        <section className={styles.sortBy}>
          <h2>sắp xếp theo</h2>
          <div>
            <button className="btn btn-secondary">bán chạy</button>
            <button className="btn btn-secondary">mới nhất</button>
            <div className={styles.dropdownContainer}>
              <button className="btn btn-secondary" onClick={toggleDropdown}>
                giá
                <span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </button>
              {isDropdownOpen && (
                <ul className={styles.dropdownMenu}>
                  <li onClick={handleOrderASC}>Giá: Thấp đến Cao</li>
                  <li onClick={handleOrderDESC}>Giá: Cao đến Thấp</li>
                </ul>
              )}
            </div>
          </div>
        </section>
        <section>
          <ListProduct data={listProducts} />
        </section>
      </main>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default CollectionPage
