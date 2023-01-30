import { useState, useCallback, useEffect } from 'react'
import { useRequest } from './useRequest'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  const request = useRequest()

  const login = useCallback((jwtToken) => {
    setToken(jwtToken)
    localStorage.setItem(storageName, JSON.stringify({
      token: jwtToken
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token)
    }

    setReady(true)
  }, [login])

  const recieveUser = async () => {
    if (!token) {
      return
    }

    try {
      const data = await request('/api/users/current-user')

      setUser(data.user)
    } catch (e) {}
  }

  useEffect(() => {
    recieveUser()
  }, [token])

  return { login, logout, token, ready, user }
}

export default useAuth