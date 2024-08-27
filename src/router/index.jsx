import Data from "@/pages/Data"
import Detail from "@/pages/Detail"
import Home from "@/pages/Home"
import User from "@/pages/User"

const routes = [
  { path: '/', element: <Home /> },
  { path: '/data', element: <Data /> },
  { path: '/user', element: <User /> },
  { path: '/detail', element: <Detail /> }
]

export default routes
