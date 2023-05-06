import React, { useContext, useEffect, useState } from 'react'
import './Login.scss'
import { AuthContext } from '../../contexts/AuthContext'
import api from '../../services/api'
import { toast } from 'react-toastify'
import { useTitle } from '../../hooks/useTitle'

const Login = () => {
  useTitle('Вход')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const auth = useContext(AuthContext)

  const submitHandler = async e => {
    e.preventDefault()

    if (!email?.length) {
      return toast('Введите e-mail', {
        type: 'error'
      })
    }

    if (password.length < 6) {
      return toast('Длина пароля должна быть не менее 6 символов', {
        type: 'error'
      })
    }

    try {
      setLoading(true)

      const {data} = await api.post('/auth/login', {
        email, password
      })

      auth.login(data.token)
    } catch (e) {}

    setLoading(false)
  }

  return (
    <div className="login pt-4">
      <div className='login-form shadow p-4 rounded'>
        <form onSubmit={submitHandler}>
          <div className="form-outline mb-4">
            <label className="form-label">E-mail</label>
            <input 
              type="text" 
              className="form-control" 
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>
        
          <div className="form-outline mb-4">
            <label className="form-label">Пароль</label>
            <input 
              type="password" 
              id="formpassword" 
              className="form-control"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary btn-block">
            {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login