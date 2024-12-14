import { lazy } from 'react'
import HomeCollection from '@/assets/img-home-collection1.webp'
import HomeCollection2 from '@/assets/img-home-collection2.webp'
import styles from './index.module.scss'
import { ListProduct } from '@/components'

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

const HomePage = () => {
  return (
    <>
      <Nav items={navItems} />
      <main>
        <div className={`${styles.contentWrapper} ${styles.imageWrapper}`}>
          <Image
            src={HomeCollection2}
            alt="Home Collection"
            height="auto"
            width={'100%'} /* Make the image responsive */
          />
        </div>
        <div className={styles.contentWrapper}>
          <CategoryList />
        </div>
        <div className={`${styles.contentWrapper} ${styles.imageWrapper}`}>
          <Image
            src={HomeCollection}
            alt="Home Collection"
            height="auto"
            width={'100%'} /* Make the image responsive */
          />
        </div>
        <div className={styles.listProduct}>
          <ListProduct />
        </div>
      </main>
    </>
  )
}

export default HomePage
