import React from "react"
// import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from "./pages/AppRouter"
import { useAuth } from "./hooks/useAuth"
import { AuthContext } from "./contexts/AuthContext"

function App() {
  const {token, login, logout, ready, user} = useAuth()
  const isAuthenticated = !!token

  if (!ready) {
    return 'Loading...'
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{
        token, login, logout, isAuthenticated, user
      }}>
        <AppRouter />
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App