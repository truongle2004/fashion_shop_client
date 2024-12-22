import Card from '@/components/Card'
import { FashionProduct } from '@/types'
import styles from './index.module.scss'
import { useEffect } from 'react'

interface ProductProps {
  data: FashionProduct[]
  onClickCard: (id: string, category: string) => void
}

const ListProduct: React.FC<ProductProps> = ({ data, onClickCard }) => {
  if (!data) {
    return <p>Loading...</p>
  }

  return (
    <div className={styles.list}>
      {data.map((product) => (
        <div
          key={product._id}
          onClick={() => onClickCard(product._id, product._category)}
        >
          <Card product={product} />
        </div>
      ))}
    </div>
  )
}

export default ListProduct
