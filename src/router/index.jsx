/* eslint-disable react-refresh/only-export-components */
import About from "@/pages/About"
import Account from "@/pages/Account"
import UserInfo from "@/pages/UserInfo"
import { lazy } from "react"

const Home = lazy(() => import('@/pages/Home'))
const Data = lazy(() => import('@/pages/Data'))
const User = lazy(() => import('@/pages/User'))
const Login = lazy(() => import('@/pages/Login'))
const Detail = lazy(() => import('@/pages/Detail'))

const routes = [
  { path: '/', element: <Home /> },
  { path: '/data', element: <Data /> },
  { path: '/user', element: <User /> },
  { path: '/detail', element: <Detail /> },
  { path: '/login', element: <Login /> },
  { path: '/userinfo', element: <UserInfo /> },
  { path: '/account', element: <Account /> },
  { path: '/about', element: <About /> }
]

export default routes
