import { loginApis } from '@/apis/auth'
import { getKey } from '@/apis/key'
import { encryptPassword } from '@/utils/encrypt'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

const LoginPage: React.FC = () => {
  const key = useRef<string>('')
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<FieldValues>({
    defaultValues: {
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

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApis,
    onSuccess: (data) => {
      const { id } = data
      localStorage.setItem('id', id)
      navigate('/home')
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { email, password } = data

    const passwordEncrypted = encryptPassword(password, key.current)
    login({
      email,
      password: passwordEncrypted
    })
  }

  const handleNavigateToRegister = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/register')
  }

  useEffect(() => {
    getPublicKey()
  }, [])

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Login</h2>
      <input
        className={`input ${errors.email ? 'input-error' : ''}`} // Add error class if validation fails
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            message: 'Invalid email format'
          }
        })}
        type="email"
        id="email"
        placeholder="Email"
      />
      {errors.email && (
        <span className="error-message">
          {errors['email'].message?.toString()}
        </span>
      )}

      <input
        className={`input ${errors.password ? 'input-error' : ''}`}
        {...register('password', { required: 'Password is required' })}
        type="password"
        id="password"
        placeholder="Password"
      />
      {errors.password && (
        <span className="error-message">
          {errors.password.message?.toString()}
        </span>
      )}
      <button className="btn btn-primary" type="submit" disabled={isPending}>
        {isPending ? 'Loading...' : 'Login'}
      </button>
      <div className={styles.link}>
        Don't have an account?{' '}
        <span onClick={handleNavigateToRegister}>Register</span>
      </div>
    </form>
  )
}

export default LoginPage
