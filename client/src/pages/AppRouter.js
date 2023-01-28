import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import routes from '../routes'
import { AuthContext } from '../contexts/AuthContext'

const AppRouter = () => {
  const auth = useContext(AuthContext)

  return (
    <Routes>
      {
        routes.map(({ path, component, isAuthenticated }) => {
          if (isAuthenticated !== false && !auth.isAuthenticated) {
            return <Route key={path} path={path} element={<Navigate replace to="/login" />} />
          }

          if (isAuthenticated === false && isAuthenticated !== auth.isAuthenticated) {
            return
          }

          return (
            <Route key={path} path={path} element={component} exact />
          )
        })
      }

      <Route path='*' element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default AppRouter