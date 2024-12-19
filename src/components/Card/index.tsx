import { FashionProduct } from '@/types'
import styles from './index.module.scss'
import { formatPriceCustom } from '@/utils/formatPrice'

interface CardProps {
  product: FashionProduct
}

const Card: React.FC<CardProps> = ({ product }) => {
  const { _id, _name, _price, _imagesColor, _currency } = product

  const imageUrl = _imagesColor[0]?._url || ''

  const imageId = _imagesColor[0]?._id || ''

  if (!product) {
    return <p>loading...</p>
  }
  return (
    <div className={styles.card} key={_id}>
      <div className={styles.cardImage}>
        <img src={imageUrl} alt="test" key={imageId} />
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.cardName}>{_name}</div>
        <div className={styles.cardPrice}>
          {formatPriceCustom(_price, _currency)}
        </div>
        {/* <div className={styles.cardColors}> */}
        {/*   <div className="colorCircle"></div> */}
        {/*   <div className="colorCircle"></div> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default Card
