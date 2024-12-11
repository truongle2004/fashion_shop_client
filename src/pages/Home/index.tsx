import { lazy } from 'react'
import HomeCollection from '@/assets/img-home-collection1.webp'

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
    <div>
      {/* Navigation Bar */}
      <Nav items={navItems} />

      {/* Main Content */}
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <CategoryList />
        </div>
        <div
          style={{ marginTop: '20px', marginRight: '20px', marginLeft: '20px' }}
        >
          <Image src={HomeCollection} alt="Home Collection" height="auto" />
        </div>
      </main>
    </div>
  )
}

export default HomePage
