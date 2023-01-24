import React, { useState } from 'react'
import './Login.scss'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="login">
      <div className='login-form shadow mt-4 p-4 rounded'>
        <form>
          <div className="form-outline mb-4">
            <label className="form-label" for="formemail">Email</label>
            <input 
              type="email" 
              id="formemail" 
              className="form-control" 
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>
        
          <div className="form-outline mb-4">
            <label className="form-label" for="formpassword">Password</label>
            <input 
              type="password" 
              id="formpassword" 
              className="form-control"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>        
          <button type="submit" className="btn btn-primary btn-block">Sign in</button>
        </form>
      </div>
    </div>
  )
}

export default Login