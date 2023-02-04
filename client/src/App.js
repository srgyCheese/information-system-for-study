import React from "react"
// import 'bootstrap/dist/css/bootstrap.min.css'
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
 
const queryClient = new QueryClient()

function App() {
  const {token, login, logout, ready, user} = useAuth()
  const {openPopup, closePopup, popup} = usePopup()
  const isAuthenticated = !!token

  if (!ready) {
    return 'Loading...'
  }

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{
          token, login, logout, isAuthenticated, user
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