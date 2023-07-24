import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Product } from '../../Interfaces/Interfaces';
import SearchIcon from '../../assets/search.svg';
import classes from './SearchPage.module.css';
import ProductHorizontal from '../ProductHorizontal/ProductHorizontal';
import { useNavBar } from '../../templates/NavBarContext';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<Product[]>([]);
  const { setTitle } = useNavBar();

  useEffect(() => {
    setTitle('Search');

    return () => {
      setTitle('');
    };
  }, [setTitle]);


  // Crie uma ref
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    fetch('https://run.mocky.io/v3/7e727637-a4bf-4ff4-865f-51197042bc89')
      .then(response => response.json())
      .then(data => {
        console.log('Data:', data);
        data.map((product: Product) => {
          
          product.totalReviews = product.reviews?.length;
        })
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const searchParam = new URLSearchParams(location.search).get('search');
    setSearchTerm(searchParam || '');
  }, [location]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  
    
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filteredResults = data.filter(product =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase())
     );
     console.log('Filtered Results -> ', filteredResults);

     navigate('/products', { state: { filteredResults, searchTerm } });

  };


  return (
    <div>
      
      <div className={classes.searchContainer}>
        <div className={classes.searchBar}>
          <form onSubmit={handleSearchSubmit}>
            <img src={SearchIcon} alt="Search Icon" className={classes.searchIcon} />
            <input
              type="text"
              placeholder="Search headphone"
              className={classes.searchInput}
              value={searchTerm}
              onChange={handleSearchChange}
              ref={inputRef}
            />
          </form>
      </div>
      </div>
      <h2 className={classes.popularProduct}>Popular products:</h2>
     
        <div className={classes.products}>
          <ul className={classes.productList}>
            {data.slice(3, 6).map(product => (
              <Link to={`/products/${product.id}`} className={classes.link}>
              <ProductHorizontal product={product} />
            </Link>
            ))}
          </ul>
        </div>
    
    </div>
  );


}

export default SearchPage;
