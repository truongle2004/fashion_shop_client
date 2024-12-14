import styles from './index.module.scss'
import Image from '@/components/Image'

const Card: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <Image
          src="https://product.hstatic.net/1000197303/product/pro_hong_01_3_7ea894d960af47e2a7e555980be965eb.jpg"
          alt="test"
        />
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.cardName}>Product Name</div>
        <div className={styles.cardPrice}>398,000đ</div>
        <div className={styles.cardColors}>
          <div className="colorCircle"></div>
          <div className="colorCircle"></div>
        </div>
      </div>
    </div>
  )
}

export default Card
