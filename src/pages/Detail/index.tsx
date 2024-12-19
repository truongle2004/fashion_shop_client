import { getDetailProduct } from '@/apis/product'
import { FashionProduct } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import styles from './index.module.scss'

const DetailPage = () => {
  const [product, setProduct] = useState<FashionProduct>()

  const { mutate: getDetailProductMutation } = useMutation({
    mutationFn: getDetailProduct,
    onSuccess: (data) => {
      setProduct(data)
    }
  })

  useEffect(() => {
    getDetailProductMutation('00030e94-055e-444e-933e-31b653fe7d99')
  }, [])

  return (
    <main className={styles.detailPage}>
      <div className={styles.product_detail_main}>
        <section className={styles.gallery}>
          {product?._imagesColor.map((item, index) => (
            <img
              key={index}
              src={item._url}
              alt={`${product._name} - ${index}`}
              className={styles.galleryImage}
            />
          ))}
        </section>

        <figure className={styles.featuredImage}>
          {product?._imagesColor?.[0] && (
            <img
              src={product._imagesColor[0]._url}
              alt={product._name}
              className={styles.image}
            />
          )}
        </figure>

        <section className={styles.productDetails}>
          <h1 className={styles.title}>{product?._name}</h1>
          <p className={styles.price}>{product?._price}</p>

          <div className={styles.sizes}>
            {product?._sizes.map((size) => <button key={size}>{size}</button>)}
          </div>

          <div className={styles.quantitySelector}>
            <button className="btn">+</button>
            <span className={styles.quantity}>1</span>
            <button className="btn">-</button>
          </div>

          <div className={styles.actions}>
            <button className="btn">Thêm vào giỏ hàng</button>
            <button className="btn">Mua ngay</button>
          </div>

          <div className={styles.productDetails_features}>
            <h3>Chi tiết sản phẩm</h3>

            {!product?._features ? (
              <p> Khong co thong tin chi tiet </p>
            ) : (
              <ul>
                {product._features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.productDetails_descriptionOfUse}>
            <h3>Cach su dung</h3>

            {!product?._descriptionOfUse ? (
              <p>Khong co thong tin chi tiet</p>
            ) : (
              <ul>
                {product?._descriptionOfUse.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>

      <section className={styles.comments}>test</section>
    </main>
  )
}

export default DetailPage
