import React, { useContext, useEffect, useState } from 'react'
import './Login.scss'
import { AuthContext } from '../../contexts/AuthContext'
import api from '../../services/api'
import { toast } from 'react-toastify'

const Login = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const auth = useContext(AuthContext)

  const submitHandler = async e => {
    e.preventDefault()

    if (login.length < 5) {
      return toast('Длина логина должна быть не менее 5 символов', {
        type: 'error'
      })
    }

    if (password.length < 5) {
      return toast('Длина пароля должна быть не менее 6 символов', {
        type: 'error'
      })
    }

    try {
      setLoading(true)

      const {data} = await api.post('/auth/login', {
        login, password
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
            <label className="form-label">Login</label>
            <input 
              type="text" 
              className="form-control" 
              onChange={e => setLogin(e.target.value)}
              value={login}
            />
          </div>
        
          <div className="form-outline mb-4">
            <label className="form-label">Password</label>
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
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login