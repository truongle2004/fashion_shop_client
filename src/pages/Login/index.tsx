import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { loginApis } from '@/apis/auth'
import { getKey } from '@/apis/key'
import { encryptPassword } from '@/utils/encrypt'
import Input from '@/components/Input'
import Button from '@/components/Button'
import styles from './index.module.scss'

const LoginPage: React.FC = () => {
  const key = useRef<string>('')
  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
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

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    setLoginData({ ...loginData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { email, password } = loginData
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
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Login</h2>
      <Input
        type="email"
        id="email"
        placeholder="Email"
        value={loginData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        required
      />
      <Input
        type="password"
        id="password"
        placeholder="Password"
        value={loginData.password}
        onChange={(e) => handleInputChange('password', e.target.value)}
        required
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Loading...' : 'Login'}
      </Button>
      <div className={styles.link}>
        Don't have an account?{' '}
        <span onClick={handleNavigateToRegister}>Register</span>
      </div>
    </form>
  )
}

export default LoginPage
