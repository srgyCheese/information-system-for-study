import Main from "./pages/Main"
import Login from "./pages/Login/Login"

const routes = [
  {
    path: '/',
    component: <Main />
  },
  {
    path: '/login',
    component: <Login />
  },
]

export default routes