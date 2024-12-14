import styles from './index.module.scss'
import Card from '@/components/Card'

const ListProduct: React.FC = () => {
  return (
    <div className={styles.list}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  )
}

export default ListProduct
