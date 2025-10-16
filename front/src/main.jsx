import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Services from './components/Services.jsx'
import AboutUs from './components/AboutUs.jsx'
import Products from './components/Products.jsx'

import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/services", element: <Services />},
  {path: '/aboutus', element: <AboutUs/>},
  {path: '/products', element: <Products/>}

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
