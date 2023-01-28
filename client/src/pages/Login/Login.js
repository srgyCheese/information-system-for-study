import React, { useContext, useState } from 'react'
import './Login.scss'
import { useRequest } from '../../hooks/useRequest'
import { AuthContext } from '../../contexts/AuthContext'

const Login = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const auth = useContext(AuthContext)

  const request = useRequest()

  const submitHandler = async e => {
    e.preventDefault()

    if (login.length < 5) {
      return setError('Длина логина должна быть не менее 5 символов')
    }

    if (password.length < 5) {
      return setError('Длина пароля должна быть не менее 6 символов')
    }

    try {
      setLoading(true)

      const response = await request('/api/auth/login', 'POST', {
        login, password
      })

      auth.login(response.token)
    } catch (e) {
      setError(e.message)
    }

    setLoading(false)
  }

  return (
    <div className="login">
      <div className='login-form shadow mt-4 p-4 rounded'>
        <form onSubmit={submitHandler}>
          <div className="form-outline mb-4">
            <label className="form-label">Login</label>
            <input 
              type="text" 
              className="form-control" 
              onChange={e => setLogin(e.target.value)}
              value={login}
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          {error && <div className={`alert alert-danger alert-dismissible fade show`}>
              {error}
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setError('')}></button>
            </div>
          }
          <button type="submit" disabled={loading} className="btn btn-primary btn-block">Sign in</button>
        </form>
      </div>
    </div>
  )
}

export default Login