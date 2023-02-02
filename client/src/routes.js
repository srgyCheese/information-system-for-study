import Login from "./pages/Login/Login"
import Categories from "./pages/Categories/Categories"
import Profile from "./pages/Profile/Profile"
import CreateCategory from "./pages/CreateCategory/CreateCategory"

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
    path: '/categories/:id/create',
    component: <CreateCategory />
  },
  {
    path: '/categories/create',
    component: <CreateCategory />
  }
]

export default routes