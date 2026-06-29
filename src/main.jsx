import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { AuthProvider } from './context/AuthContext'
import {Provider} from 'react-redux' 
import { store } from './app/store'
import App from './App'

createRoot(document.getElementById('root')).render(

  <Provider store={store}>

    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
  
  

)
