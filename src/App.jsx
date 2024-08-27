import { useRoutes } from 'react-router-dom'

import routes from '@/router'
import NavBar from '@/components/NavBar'

function App() {

  return (
    <>
      {useRoutes(routes)}
      <NavBar showNav={true} />
    </>
  )
}

export default App
