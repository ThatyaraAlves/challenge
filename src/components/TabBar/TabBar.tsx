import React, { useState } from 'react';
import classes from './TabBar.module.css';

interface TabBarProps {
    onButtonClicked: (buttonClicked: string) => void;
  }

const TabBar: React.FC<TabBarProps> = ({ onButtonClicked }) => {

  const [activeButton, setActiveButton] = useState('overview');

  const handleButtonClick = (optionSelected: string) => {
    
    if (optionSelected == "overview") {
      onButtonClicked("overview"); 
    } else if (optionSelected == "features") {
      onButtonClicked("features"); 
    }
    setActiveButton(optionSelected);
  };

  return (
    <div className={classes.tabBar}>
      <button className={`${classes.buttonTabBar} ${activeButton === 'overview' ? classes.active : ''}`} onClick={() => handleButtonClick("overview")}>Overview</button>
      <button className={`${classes.buttonTabBar} ${activeButton === 'features' ? classes.active : ''}`} onClick={() => handleButtonClick("features")}>Features</button>
    </div>
  );
};

export default TabBar;