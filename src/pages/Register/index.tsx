import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { registerApis } from '@/apis/auth'
import { getKey } from '@/apis/key'
import { encryptPassword } from '@/utils/encrypt'
import { toastifyError } from '@/utils/toastify'
import Input from '@/components/Input'
import Button from '@/components/Button'
import styles from './index.module.scss'

const RegisterPage: React.FC = () => {
  const key = useRef<string>('')
  const navigate = useNavigate()

  const [registerData, setRegisterData] = useState({
    username: '',
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

  const { mutate: register, isPending } = useMutation({
    mutationFn: registerApis,
    onSuccess: () => {
      navigate('/login')
    },
    onError: (error: any) => {
      toastifyError(error.message || 'Registration failed')
    }
  })

  const handleInputChange = (
    field: 'username' | 'email' | 'password',
    value: string
  ) => {
    setRegisterData({ ...registerData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { username, email, password } = registerData
    const passwordEncrypted = encryptPassword(password, key.current)

    register({
      username,
      email,
      password: passwordEncrypted
    })
  }

  const handleNavigateLogin = () => {
    navigate('/login')
  }

  useEffect(() => {
    getPublicKey()
  }, [])

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Register</h2>
      <Input
        type="text"
        id="username"
        placeholder="Username"
        value={registerData.username}
        onChange={(e) => handleInputChange('username', e.target.value)}
        required
      />
      <Input
        type="email"
        id="email"
        placeholder="Email"
        value={registerData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        required
      />
      <Input
        type="password"
        id="password"
        placeholder="Password"
        value={registerData.password}
        onChange={(e) => handleInputChange('password', e.target.value)}
        required
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Loading...' : 'Register'}
      </Button>
      <div className={styles.link}>
        Already have an account?{' '}
        <span onClick={handleNavigateLogin}>Login</span>
      </div>
    </form>
  )
}

export default RegisterPage
