import { lazy, useEffect, useState } from 'react'
import HomeCollection from '@/assets/img-home-collection1.webp'
import HomeCollection2 from '@/assets/img-home-collection2.webp'
import styles from './index.module.scss'
import { ListProduct } from '@/components'
import { useMutation } from '@tanstack/react-query'
import { getRandomProduct } from '@/apis/product'
import { FashionProduct } from '@/types'

const CategoryList = lazy(() => import('@/components/ListCategory'))
const Nav = lazy(() => import('@/components/Nav'))
const Image = lazy(() => import('@/components/Image'))

const navItems = [
  { label: 'NEW IN', path: '/home' },
  { label: 'SẢN PHẨM', path: '/home' },
  { label: 'LOOKBOOK', path: '/home' },
  { label: 'DỊP/SỰ KIỆN', path: '/event' },
  { label: 'BLOG', path: '/blog' },
  { label: 'CỬA HÀNG', path: '/store' }
]

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
      <header>
        <Nav items={navItems} />
      </header>
      <main>
        <section className={styles.contentWrapper}>
          <Image
            src={HomeCollection2}
            alt="Home Collection"
            height="auto"
            width="100%"
          />
        </section>
        <section className={styles.categoryList}>
          <CategoryList />
        </section>
        <section className={styles.contentWrapper}>
          <Image
            src={HomeCollection}
            alt="Home Collection"
            height="auto"
            width="100%"
          />
        </section>
        <section className={styles.listProduct}>
          <ListProduct data={products} />
        </section>
      </main>
    </>
  )
}

export default HomePage
