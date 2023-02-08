import Login from "./pages/Login/Login"
import Categories from "./pages/Categories/Categories"
import Profile from "./pages/Profile/Profile"
import Products from "./pages/Products/Products"

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
    path: '/categories',
    component: <Categories />
  },
  {
    path: '/categories/:id',
    component: <Categories />
  },
  {
    path: '/products',
    component: <Products />
  },
]

export default routes