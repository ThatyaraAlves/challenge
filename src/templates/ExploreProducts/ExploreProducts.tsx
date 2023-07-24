import classes from "./ExploreProducts.module.css";
import {Product} from '../../Interfaces/Interfaces';
import { useLocation } from "react-router-dom";
import Button from '../../components/Button/Button';
import GridView from "../../components/GridView/GridView";
import { useState, useEffect } from "react";
import { BottomSheet } from 'react-spring-bottom-sheet';
import sliders from '../../assets/sliders.svg';
import 'react-spring-bottom-sheet/dist/style.css';
import { Category } from "../../Interfaces/Interfaces";

const ExploreProducts: React.FC = () => {
    const location = useLocation();
    const products: Product[] = location.state.filteredResults;
    const searchTerm: string = location.state.searchTerm;
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [filterBy, setFilterBy] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortByTemp, setSortByTemp] = useState('');
    const [isFilterOpen, setFilterOpen] = useState(false);
    
    const sortByOptions = ['popularity', 'newest', 'oldest', 'high price', 'low price', 'review'];

    const openFilter = () => {
        console.log("Opening Filter");
      setFilterOpen(true);
    };

    const closeFilter = () => {
      setFilterOpen(false);
    };

    const handleFilterApply = () => {
      setActiveCategory(filterBy);
      setSortBy(sortByTemp);
      closeFilter();
    };

    const handleFilterByChange = (category: string) => {
      setFilterBy(category);
    };

    const handleSortByChangeTemp = (option: string) => {
      setSortByTemp(option);
    };
    const filteredProducts = () => {
      let filtered = products;
    
      if (activeCategory) {
        filtered = filtered.filter((product) => product.category === activeCategory);
      }
    
      switch (sortBy) {
        case 'popularity':
          filtered = filtered.sort();
          break;
        case 'newest':
          filtered = filtered.sort((a: Product, b: Product) => {
            const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
            const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
    
            if (dateA > dateB) return -1;
            if (dateA < dateB) return 1;
            return 0;
          });
          break;
        case 'oldest':
          filtered = filtered.sort((a: Product, b: Product) => {
            const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
            const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
    
            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;
            return 0;
          });
          break;
          case 'high price':
            filtered = filtered.sort((a, b) => {
              const priceA = a.price ? parseFloat(a.price.slice(1)) : 0;
              const priceB = b.price ? parseFloat(b.price.slice(1)) : 0;
              return priceB - priceA;
            });
            break;
          case 'low price':
            filtered = filtered.sort((a, b) => {
              const priceA = a.price ? parseFloat(a.price.slice(1)) : 0;
              const priceB = b.price ? parseFloat(b.price.slice(1)) : 0;
              return priceA - priceB;
            });
            break;
            case 'review':
              filtered = filtered.sort((a, b) => {
                const ratingA = a.rating ? a.rating : 0;
                const ratingB = b.rating ? b.rating : 0;
                return ratingB - ratingA;
              });
              break;
      }
    
      return filtered;
    };
    
    
    useEffect(() => {
      const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
      const categories = uniqueCategories.map((category, index) => ({
        id: index,
        name: category ?? '',
      }));
      setCategories(categories);
    }, [products]);

    return (
        <div className={classes.ExploreProducts}>
            <div className={classes.filterTitle}>
              { activeCategory && <h1 className={classes.category}>{activeCategory}</h1>}
              <h1 className={classes.sear}>{searchTerm}</h1>
            </div>
            <Button title="Filter" image={sliders} variant="white" onClick={openFilter} />
            <GridView items={filteredProducts()} />

            <BottomSheet
              open={isFilterOpen}
              onDismiss={closeFilter}
              snapPoints={({ maxHeight }) => [maxHeight * 0.4, maxHeight * 0.7]}
            >
              <div className={classes.filterContainer}>
                <h1 className={classes.title}>Filter</h1>
                
                <h2 className={classes.label}>Category</h2>
                <div className={classes.categoryButtons}>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`${classes.categoryButton} ${
                        filterBy === category.name ? classes.active : ''
                      }`}
                      onClick={() => handleFilterByChange(category.name)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
                <h2 className={classes.label}>Sort By</h2>
                <div className={classes.buttons}>
                  {sortByOptions.map(option => (
                    <button
                      key={option}
                      className={`${classes.sortButton} ${sortByTemp === option ? classes.active : ''}`}
                      onClick={() => handleSortByChangeTemp(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
              <button onClick={handleFilterApply} className={classes.btnSubmit}>
                Apply Filter
                </button>
              </div>
            </BottomSheet>
        </div>
    )
}

export default ExploreProducts;
