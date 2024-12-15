import { registerApis } from '@/apis/auth'
import { getKey } from '@/apis/key'
import { encryptPassword } from '@/utils/encrypt'
import { toastifyError } from '@/utils/toastify'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

const RegisterPage: React.FC = () => {
  const key = useRef<string>('')
  const navigate = useNavigate()

  // Define form structure with useForm and validation rules
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  const { mutate: getPublicKey } = useMutation({
    mutationFn: getKey,
    onSuccess: (data) => {
      const { publicKey } = data
      key.current = publicKey
    }
  })

  const { mutate: registerAccount, isPending } = useMutation({
    mutationFn: registerApis,
    onSuccess: () => {
      navigate('/login')
    },
    onError: (error: any) => {
      toastifyError(error.message || 'Registration failed')
    }
  })

  // Form submission handler using handleSubmit from React Hook Form
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { username, email, password } = data
    const passwordEncrypted = encryptPassword(password, key.current)
    registerAccount({ username, email, password: passwordEncrypted })
  }

  // Navigate to login page
  const handleNavigateLogin = () => {
    navigate('/login')
  }

  // Get public key on mount
  useEffect(() => {
    getPublicKey()
  }, [])

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Register</h2>
      
      {/* Username Input with validation */}
      <input
        {...register('username', { required: 'Username is required' })}
        className={`input ${errors.username ? 'input-error' : ''}`}
        type="text"
        id="username"
        placeholder="Username"
      />
      {errors.username && <span className="error-message">{errors.username.message}</span>}

      {/* Email Input with validation */}
      <input
        {...register('email', {
          required: 'Email is required',
          pattern: { value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, message: 'Invalid email format' }
        })}
        className={`input ${errors.email ? 'input-error' : ''}`}
        type="email"
        id="email"
        placeholder="Email"
      />
      {errors.email && <span className="error-message">{errors.email.message}</span>}

      {/* Password Input with validation */}
      <input
        {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
        className={`input ${errors.password ? 'input-error' : ''}`}
        type="password"
        id="password"
        placeholder="Password"
      />
      {errors.password && <span className="error-message">{errors.password.message}</span>}

      {/* Submit Button */}
      <button className="btn btn-primary" type="submit" disabled={isPending}>
        {isPending ? 'Loading...' : 'Register'}
      </button>

      {/* Link to Login page */}
      <div className={styles.link}>
        Already have an account?{' '}
        <span onClick={handleNavigateLogin}>Login</span>
      </div>
    </form>
  )
}

export default RegisterPage
