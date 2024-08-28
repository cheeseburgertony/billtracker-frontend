import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'zarm'
import 'lib-flexible'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ConfigProvider primaryColor='#007fff' locale={zhCN}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
)
