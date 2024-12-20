import Category1 from '@/assets/category1-img.webp'
import Category3 from '@/assets/category3-img.webp'
import Category4 from '@/assets/category4-img.webp'
import Category5 from '@/assets/category5-img.webp'
import Category6 from '@/assets/category6-img.webp'
import Category7 from '@/assets/category7-img.webp'
import styles from './index.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { convertToSlug } from '@/utils/convertToSlug'

const BASE_URL = '/collection'

const items = [
  {
    name: 'SIGNATURE',
    image: Category1
  },
  {
    name: 'Áo Kiểu',
    image: Category3
  },
  {
    name: 'Áo Thun',
    image: Category4
  },
  {
    name: 'Đầm',
    image: Category5
  },
  {
    name: 'Quần',
    image: Category6
  },
  {
    name: 'Váy',
    image: Category7
  }
]

const DEFAULT_FIRST_PAGE = 1

const CategoryList = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClickItem = (str: string) => {
    // NOTE: convert string to slug for easier navigation (e.g: SIGNATURE -> signature, Ao Kieu -> ao-kieu)
    const slug = convertToSlug(str)
    const params = new URLSearchParams()
    params.set('category', slug)

    // NOTE: By default page is 1
    params.set('page', DEFAULT_FIRST_PAGE.toString())

    /* NOTE: Set params to url can provide collection 
    page neccessary information like category and page */
    navigate(`${BASE_URL}?${params.toString()}`)
  }

  // NOTE: Check if user is visiting specific category, we will highlight image of that category item by css
  const isVisiting = (name: string) =>
    location.pathname.includes(convertToSlug(name))

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Danh Mục</h2>
        <div className={styles.homeCategoryList}>
          {items.map((item, index) => (
            <div
              key={index}
              className={styles.categoryItem}
              onClick={() => handleClickItem(item.name)}
            >
              {!isVisiting(item.name) ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.categoryImage}
                />
              ) : (
                <img
                  src={item.image}
                  alt={item.name}
                  className={`${styles.categoryImage} ${styles.categoryHighlight}`}
                />
              )}
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default CategoryList
