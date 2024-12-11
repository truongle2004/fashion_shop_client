import React from 'react'
import styles from './index.module.scss'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  label?: string
  type?: 'text' | 'email' | 'password' | 'number'
  value?: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  required?: boolean
  showLabel?: boolean
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  value,
  placeholder,
  onChange,
  className = '',
  required = false,
  showLabel = true
}) => {
  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      {showLabel && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={styles.input}
        required={required}
      />
    </div>
  )
}
export default Input
