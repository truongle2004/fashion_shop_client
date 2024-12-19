import { getRandomProduct } from '@/apis/product'
import HomeCollection from '@/assets/img-home-collection1.webp'
import HomeCollection2 from '@/assets/img-home-collection2.webp'
import { ListProduct } from '@/components'
import Footer from '@/components/Footer'
import { FashionProduct } from '@/types'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@tanstack/react-query'
import { lazy, useEffect, useState } from 'react'
import styles from './index.module.scss'

const CategoryList = lazy(() => import('@/components/ListCategory'))

// TODO: adding best seller part
// TODO: adding color in card
// TODO: adding footer
const HomePage = () => {
  const [products, setProducts] = useState<FashionProduct[]>([])
  const { mutate: getRandomProductMutate } = useMutation({
    mutationFn: getRandomProduct,
    onSuccess: (data) => {
      setProducts(data)
    }
  })

  useEffect(() => {
    if (products.length === 0) getRandomProductMutate()
  }, [])

  return (
    <>
      <main className="container">
        <section>
          <img
            src={HomeCollection2}
            alt="Home Collection"
            height="auto"
            width="100%"
          />
        </section>
        <section>
          <CategoryList />
        </section>
        <section>
          <img
            src={HomeCollection}
            alt="Home Collection"
            height="auto"
            width="100%"
          />
        </section>
        <section>
          <ListProduct data={products} />
        </section>
      </main>
      <section className={styles.newsletter}>
        <h1>Đăng ký nhận tin và ưu đãi</h1>
        <p>
          Hãy nhập email của bạn vào đây để nhận được xu hướng thời trang và
          khuyến mãi mới nhất từ MARC nhé.
        </p>
        <div>
          <input
            className={`input ${styles.inputNewsLetter}`}
            placeholder="Nhập email của bạn"
          />
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default HomePage
