import { useState, useCallback, useEffect } from 'react'
import api from '../services/api'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  const login = useCallback((jwtToken) => {
    setToken(jwtToken)
    api.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
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

    
    api.interceptors.response.use((response) => response, (error) => {
      const responseCode = error?.response?.status

      if (responseCode == 401) {
        logout()
      }

      throw error
    })

    setReady(true)
  }, [login])

  const recieveUser = async () => {
    if (!token) {
      return
    }

    try {
      const {data} = await api.get('/users/current-user')

      setUser(data.user)
    } catch (e) {}
  }

  useEffect(() => {
    recieveUser()
  }, [token])

  return { login, logout, token, ready, user, recieveUser }
}

export default useAuth