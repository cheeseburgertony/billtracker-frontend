import Data from "@/pages/Data"
import Detail from "@/pages/Detail"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import User from "@/pages/User"
import UserInfo from "@/pages/UserInfo"

const routes = [
  { path: '/', element: <Home /> },
  { path: '/data', element: <Data /> },
  { path: '/user', element: <User /> },
  { path: '/detail', element: <Detail /> },
  { path: '/login', element: <Login /> },
  { path: '/userinfo', element: <UserInfo /> }
]

export default routes
