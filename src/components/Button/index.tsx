import React from 'react'
import styles from './index.module.scss'
interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}
const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
export default Button
