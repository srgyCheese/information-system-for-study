import Login from "./pages/Login/Login"
import Categories from "./pages/Categories/Categories"
import Profile from "./pages/Profile/Profile"
import Products from "./pages/Products/Products"
import Product from "./pages/Product/Product"
import Warehouses from "./pages/Warehouses/Warehouses"
import Users from "./pages/Users/Users"
import User from "./pages/User/User"
import EditUser from "./pages/EditUser/EditUser"
import Warehouse from "./pages/Warehouse/Warehouse"
import EditCategory from "./pages/EditCategory/EditCategory"

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
    path: '/categories/:categoryId/edit',
    component: <EditCategory />
  },
  {
    path: '/products',
    component: <Products />
  },
  {
    path: '/products/:productId',
    component: <Product />
  },
  {
    path: '/warehouses',
    component: <Warehouses />
  },
  {
    path: '/warehouses/:warehouseId',
    component: <Warehouse />
  },
  {
    path: '/users',
    component: <Users />
  },
  {
    path: '/users/:userId',
    component: <User />
  },
  {
    path: '/users/:userId/edit',
    component: <EditUser />
  },
]

export default routes