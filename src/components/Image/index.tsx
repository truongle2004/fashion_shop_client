import React from 'react'
import styles from './index.module.scss'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  loading?: 'eager' | 'lazy'
  className?: string
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width = 'auto',
  height = 'auto',
  loading = 'lazy',
  className = '',
  ...props
}) => {
  console.log(width)
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={`${styles.image} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...props.style
      }}
      {...props}
    />
  )
}

export default Image
