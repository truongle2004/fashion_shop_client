import { FashionProduct } from '@/types'
import styles from './index.module.scss'
import Card from '@/components/Card'

interface ProductProps {
  data: FashionProduct[]
}

const ListProduct: React.FC<ProductProps> = ({ data }) => {
  if (!data) {
    return <p>Loading...</p>
  }
  return (
    <div className={styles.list}>
    {data.map((product) => (
        <Card key={product._id} product={product} />              
    ))}
    </div>
  )
}

export default ListProduct
