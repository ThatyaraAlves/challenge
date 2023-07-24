import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './SearchBar.module.css';
import SearchIcon from '../../assets/search.svg';

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/search');
  };
  

  return (
    <>
      <div className={classes.homePage}>
        <div className={classes.presentation}>
          <p className={classes.user}>Hi, Andrea</p>
          <h1 className={classes.tittle}>What are you looking for today?</h1>
        </div>
        <form onClick={handleSearch}>
          <div className={classes.searchBar}>
            <img src={SearchIcon} alt="Search Icon" className={classes.searchIcon} />
            <input
              type="text"
              placeholder="Search headphone"
              className={classes.searchInput}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
