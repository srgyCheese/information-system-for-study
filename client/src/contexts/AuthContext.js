import {createContext} from 'react'

export const AuthContext = createContext({
  token: null,
  userId: null,
  setToken: () => {},
  logout: () => {},
  isAuthenticated: false
})