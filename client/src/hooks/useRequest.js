import {useCallback, useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext'

export const useRequest = () => {
  const auth = useContext(AuthContext)

  return useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    if (body) {
      body = JSON.stringify(body)
      headers['Content-Type'] = 'application/json'
    }

    let token = auth?.token

    if (!token) {
      const authData = JSON.parse(localStorage.getItem('userData'))

      token = authData?.token
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(url, {method, body, headers})
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Что-то пошло не так')
    }

    return data
  }, [auth])
}