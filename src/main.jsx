import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'lib-flexible'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
