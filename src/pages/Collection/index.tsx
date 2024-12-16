import { useEffect, useState } from 'react'
import { ListCategory, ListProduct } from '@/components'
import HomeCollection2 from '@/assets/img-home-collection2.webp'
import styles from './index.module.scss'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@tanstack/react-query'
import { getListProductByCategory } from '@/apis/product'
import { FashionProduct } from '@/types'
import { useLocation, useParams } from 'react-router-dom'

// TODO: using global dropdown menu css
const SignatureCollection = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const [listProducts, setListProducts] = useState<FashionProduct[]>([])

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const handleSelectOption = (option: string) => {
    console.log('Selected option:', option)
    setIsDropdownOpen(false)
  }

  const { mutate: getListProductByCategoryMutation } = useMutation({
    mutationFn: getListProductByCategory,
    onSuccess: (data) => {
      setListProducts(data)
    }
  })

  const { category } = useParams()

  useEffect(() => {
    if (category) getListProductByCategoryMutation(category)
  }, [])

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
                <li onClick={() => handleSelectOption('Giá: Thấp đến Cao')}>
                  Giá: Thấp đến Cao
                </li>
                <li onClick={() => handleSelectOption('Giá: Cao đến Thấp')}>
                  Giá: Cao đến Thấp
                </li>
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
