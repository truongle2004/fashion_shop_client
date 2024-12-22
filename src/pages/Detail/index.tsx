import { getDetailProduct, getListProductByCategory } from '@/apis/product'
import { ListProduct } from '@/components'
import { FashionProduct } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './index.module.scss'

const DEFAUL_LIMIT = 5

const DetailPage = () => {
  const [product, setProduct] = useState<FashionProduct>()

  const [isShowProductDetail, setIsShowProductDetail] = useState(false)

  const [isShowDescriptionOfUse, setIsShowDescriptionOfUse] = useState(false)

  const [listProduct, setListProduct] = useState<FashionProduct[]>([])

  const [coreImage, setCoreImage] = useState(product?._imagesColor?.[0]?._url)

  const navigate = useNavigate()

  const [param] = useSearchParams()

  const category = param.get('category') as string

  const id = param.get('id') as string

  const { mutate: getDetailProductMutation } = useMutation({
    mutationFn: getDetailProduct,
    onSuccess: (data) => {
      setProduct(data)
      setCoreImage(data?._imagesColor?.[0]?._url)

      // NOTE: Scroll to top of page after get product detail on success
      window.scrollTo(0, 0)
    }
  })

  const { mutate: getListProductByCategoryMutation } = useMutation({
    mutationFn: getListProductByCategory,
    onSuccess: (data) => {
      const { products } = data

      setListProduct(products)
    }
  })

  const handleToggleShowProductDetail = () => {
    setIsShowProductDetail(!isShowProductDetail)
  }

  const handleToggleShowDescriptionOfUse = () => {
    setIsShowDescriptionOfUse(!isShowDescriptionOfUse)
  }

  const handleClickCard = (id: string) => {
    const params = new URLSearchParams()
    params.set('category', category || '')
    params.set('id', id)

    navigate(`/detail?${params.toString()}`)
  }

  const handleClickImage = (url: string) => {
    setCoreImage(url)
  }

  useEffect(() => {
    if (category) {
      getDetailProductMutation(id)
    }
  }, [category, id])

  useEffect(() => {
    getListProductByCategoryMutation({ category, limit: DEFAUL_LIMIT })
  }, [])

  if (!product) return <p>Loading...</p>

  return (
    <>
      <main className={styles.detailPage}>
        <div className={styles.product_detail_main}>
          {/* Gallery Section */}
          <section className={styles.gallery}>
            {product?._imagesColor.map((item, index) => (
              <img
                key={index}
                src={item._url}
                alt={`${product._name} - ${index}`}
                className={styles.galleryImage}
                onClick={() => handleClickImage(item._url)}
              />
            ))}
          </section>

          {/* Featured Image Section */}
          <figure className={styles.featuredImage}>
            {coreImage && (
              <img
                src={coreImage || product?._imagesColor?.[0]?._url}
                alt={product._name}
                className={styles.image}
              />
            )}
          </figure>

          {/* Product Details Section */}
          <section className={styles.productDetails}>
            <h1 className={styles.title}>{product?._name}</h1>
            <p className={styles.price}>
              {product?._price}
              <span>{product?._currency}</span>
            </p>

            {/* Size Selection */}
            <div className={styles.sizes}>
              {product?._sizes.map((size) => (
                <button key={size}>{size}</button>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className={styles.quantitySelector}>
              <button className="btn">+</button>
              <span className={styles.quantity}>1</span>
              <button className="btn">-</button>
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
              <button className="btn">Thêm vào giỏ hàng</button>
              <button className="btn btn-primary">Mua ngay</button>
            </div>

            {/* Product Features */}
            <div className={styles.productDetails_features}>
              <button className="btn" onClick={handleToggleShowProductDetail}>
                Chi tiết sản phẩm
              </button>

              {!product?._features.length && isShowProductDetail ? (
                <p>Khong co thong tin chi tiet</p>
              ) : (
                <ul>
                  {isShowProductDetail &&
                    product._features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                </ul>
              )}
            </div>

            {/* Usage Description */}
            <div className={styles.productDetails_descriptionOfUse}>
              <button
                className="btn"
                onClick={handleToggleShowDescriptionOfUse}
              >
                Cach su dung
              </button>

              {!product?._descriptionOfUse.length && isShowDescriptionOfUse ? (
                <p>Khong co thong tin chi tiet</p>
              ) : (
                <ul>
                  {isShowDescriptionOfUse &&
                    product?._descriptionOfUse.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>
              )}
            </div>
          </section>
        </div>

        {/* Comment Section */}
        <div className={styles.comments}>comment here</div>

        <section>
          <h2>Ban co the quan tam</h2>
          <ListProduct data={listProduct} onClickCard={handleClickCard} />
        </section>
      </main>
    </>
  )
}

export default DetailPage
