import { Nav } from '@/components'
import { Outlet } from 'react-router-dom'

const navItems = [
  { label: 'SẢN PHẨM', path: '/home' },
  { label: 'LOOKBOOK', path: '/home' },
  { label: 'DỊP/SỰ KIỆN', path: '/event' },
  { label: 'BLOG', path: '/blog' },
  { label: 'CỬA HÀNG', path: '/store' }
]

const Layout = () => {
  return (
    <div>
      <Nav items={navItems} />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
