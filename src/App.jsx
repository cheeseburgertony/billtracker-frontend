import { useLocation, useRoutes } from 'react-router-dom'
import { Suspense, useEffect, useState } from 'react'

import routes from '@/router'
import NavBar from '@/components/NavBar'

function App() {
  const [showNav, setShowNav] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    // pathname一改变看pathname是否需要NavBar从而来控制显示和隐藏NavBar
    const needNav = ['/', '/data', '/user']
    setShowNav(needNav.includes(pathname))
  }, [pathname])

  return (
    <>
      <Suspense fallback='loading'>
        {useRoutes(routes)}
      </Suspense>
      <NavBar showNav={showNav} />
    </>
  )
}

export default App
