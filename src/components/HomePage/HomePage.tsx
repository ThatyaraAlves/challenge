import React from 'react';
import ProductCarousel from '../Caroussel/ProductCarousel';
import SearchBar from '../SearchBar/SearchBar';
import classes from './HomePage.module.css';
import { IHomePageProps } from '../../Interfaces/Interfaces';
import { useEffect } from 'react';
import { useNavBar } from '../../templates/NavBarContext';
import rightIcon from '../../assets/shopping-cart.svg';

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const {setRightIcon } = useNavBar();
  useEffect(() => {
    setRightIcon(rightIcon);
  })


  return (
    <>
    
      <div className={classes.homePage}>
        <SearchBar />
        <ProductCarousel />
      </div>
      
      {/* <ProductDetail /> */}
      
      
      
     
    </>
  );
};

export default HomePage;
