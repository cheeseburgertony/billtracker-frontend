import { useRoutes } from 'react-router-dom'
import { ConfigProvider } from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'

import routes from './router'

function App() {

  return (
    <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
      {useRoutes(routes)}
    </ConfigProvider>
  )
}

export default App
