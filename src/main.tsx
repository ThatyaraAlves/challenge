import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import NavBar from './components/NavBar/NavBar.tsx'
import { CartProvider } from './templates/CartContext.tsx'
import { NavBarProvider } from './templates/NavBarContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <NavBarProvider >
    <CartProvider>
   <App />
   </CartProvider>
   </NavBarProvider>
  ,
)
