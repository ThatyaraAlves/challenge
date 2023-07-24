import React from "react";
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import {initializeApp} from 'firebase/app'
import AuthRoute from "./components/AuthRoute";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/Login/LoginPage";
import  {config}  from './config/config'
import SearchPage from "./components/SearchPage/SearchPage";
import SignupPage from "./components/Login/SignUp";
import NavBar from "./components/NavBar/NavBar";
import './reset.css'
import ProductDetail from "./templates/ProductDetail/ProductDetail";
import './App.css'
import ExploreProducts from "./templates/ExploreProducts/ExploreProducts";
import Cart from "./components/Cart/Cart";

export interface IAppProps {}

initializeApp(config.firebaseConfig);
const App: React.FC <IAppProps> = (props) => {
  

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
      <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <AuthRoute>
              
              <HomePage />
            </AuthRoute>
          }
        />
        
        <Route path="/search" element={<SearchPage />} /> 
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/products" element={<ExploreProducts/>} />
        <Route path="/products/:idParam" element={<ProductDetail/>} />
        <Route path="/cart" element={<Cart/>} />
        
      </Routes>
    </BrowserRouter>
    

    
   


  );
};

export default App;
