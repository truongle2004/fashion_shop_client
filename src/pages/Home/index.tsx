import { lazy } from 'react'
import HomeCollection from '@/assets/img-home-collection1.webp'
import HomeCollection2 from '@/assets/img-home-collection2.webp'
import styles from './index.module.scss'

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
    <div className={styles.container}>
    <Nav items={navItems} />
      <main>
        <div className={`${styles.contentWrapper} ${styles.imageWrapper}`}>
          <Image
            src={HomeCollection2}
            alt="Home Collection"
            height="auto"
            width={'70%'}
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
            width={'70%'}
          />
        </div>
        <div></div>
      </main>
    </div>
  )
}

export default HomePage
