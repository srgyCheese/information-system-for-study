import React from "react"
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from "./pages/AppRouter"
import { useAuth } from "./hooks/useAuth"
import { AuthContext } from "./contexts/AuthContext" 
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { PopupContext } from "./contexts/PopupContext"
import usePopup from "./hooks/usePopup"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css'
import Spinner from "./components/Spinner"
 
const queryClient = new QueryClient()

function App() {
  const {token, login, logout, ready, user, recieveUser } = useAuth()
  const {openPopup, closePopup, popup} = usePopup()
  const isAuthenticated = !!token

  if (!ready) {
    return (
      <Spinner />
    )
  }

  if (isAuthenticated && !user) {
    return (
      <Spinner />
    )
  }

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{
          token, login, logout, isAuthenticated, user, recieveUser
        }}>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            theme="light"
          />
          <PopupContext.Provider value={{openPopup, closePopup}}>
            {popup}
            <AppRouter />
          </PopupContext.Provider>
        </AuthContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App