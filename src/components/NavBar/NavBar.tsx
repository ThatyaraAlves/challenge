import React from 'react';
import classes from "./NavBar.module.css";
import leftIcon from "../../assets/chevron-left.svg";
import rightIcon from "../../assets/shopping-cart.svg";
import { useLocation, useNavigate } from 'react-router-dom';
import { useNavBar } from '../../templates/NavBarContext';
import {useCart} from '../../templates/CartContext';
export interface NavBarProps {
  navTitle?: string;
  
}


const NavBar: React.FC<NavBarProps> = (props) => {
  const { title } = useNavBar();
  const location = useLocation();
  const navigate = useNavigate();
  const {rightIcon} = useNavBar();
  const { clearCart } = useCart();
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleRightIconClick = () => {
    if (location.pathname === "/cart") {
      clearCart();
    } else {
      navigate("/cart");
    }
  };
  
if (location.pathname === '/login' || location.pathname === '/signup') {
    return null; 
  }

  return (
    <div className={classes.NavBar}>
      <img className={classes.IconLeft} src={leftIcon} alt="Left Icon" onClick={handleGoBack} />
      <h1 className={classes.NavTitle}>{title}</h1>
      <img className={classes.IconRight} src={rightIcon} alt="Right Icon" onClick={handleRightIconClick}/>
    </div>
  );
}

export default NavBar;
