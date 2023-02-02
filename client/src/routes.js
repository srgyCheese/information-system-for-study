import Login from "./pages/Login/Login"
import Categories from "./pages/Categories/Categories"
import Profile from "./pages/Profile/Profile"

const routes = [
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
    component: <Categories />
  }
]

export default routes