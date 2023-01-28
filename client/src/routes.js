import Login from "./pages/Login/Login"
import Products from "./pages/Products/Products"
import Profile from "./pages/Profile/Profile"

const routes = [
  {
    path: '/',
    component: <Profile />
  },
  {
    path: '/login',
    component: <Login />,
    isAuthenticated: false
  },
  {
    path: '/profile',
    component: <Profile />
  },
  {
    path: '/products',
    component: <Products />
  }
]

export default routes