import Data from "@/pages/Data"
import Home from "@/pages/Home"
import User from "@/pages/User"

const routes = [
  { path: '/', element: <Home /> },
  { path: '/data', element: <Data /> },
  { path: '/user', element: <User /> }
]

export default routes
