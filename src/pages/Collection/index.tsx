import { getListProductByCategory, orderProductByPrice } from '@/apis/product'
import HomeCollection2 from '@/assets/img-home-collection2.webp'
import { ListCategory, ListProduct } from '@/components'
import { FashionProduct, OrderType } from '@/types'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './index.module.scss'

// TODO: using global dropdown menu css
const SignatureCollection = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const [listProducts, setListProducts] = useState<FashionProduct[]>([])

  const { category } = useParams()

  const { mutate: orderProductByPriceMutation } = useMutation({
    mutationFn: orderProductByPrice,
    onSuccess: (data) => {
      setListProducts(data)
    }
  })

  const { mutate: getListProductByCategoryMutation } = useMutation({
    mutationFn: getListProductByCategory,
    onSuccess: (data) => {
      setListProducts(data)
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
    if (category) getListProductByCategoryMutation(category)
  }, [category])

  return (
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
  )
}

export default SignatureCollection
