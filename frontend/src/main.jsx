import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './store/auth.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './store/themeProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <ThemeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </ThemeProvider>
      <Toaster position='top-center' toastOptions={{
        error: {
          duration: 5000
        }
      }} />
    </React.StrictMode>
  </AuthProvider>
)
