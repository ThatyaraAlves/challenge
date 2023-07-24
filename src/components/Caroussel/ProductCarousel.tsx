import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import classes from "./ProductCarousel.module.css";
import image1 from "../../assets/image-1.png";
import { Product, Category } from '../../Interfaces/Interfaces';
import { Link } from 'react-router-dom';
import CarouselView from './CarousselView';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 
  }
};

const ProductCarousel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeProductIndex, setActiveProductIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://run.mocky.io/v3/7e727637-a4bf-4ff4-865f-51197042bc89')
      .then(response => response.json())
      .then((data: Product[]) => {
        setProducts(data);
        const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
        const categories = uniqueCategories.map((category, index) => ({
          id: index,
          name: category ?? '',
        }));
        setCategories(categories);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  const filterProductsByCategory = (categoryName: string) => {
    if (categoryName === activeCategory) {
      
      setActiveCategory(null);
    } else {
      
      setActiveCategory(categoryName);
    }
  };

  const filteredProducts = activeCategory
    ? products.filter((product) => product.category === activeCategory)
    : products;

  return (
    <div className={classes.carouselContainer}>
      <div className={classes.categoryButtons}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${classes.categoryButton} ${
              activeCategory === category.name ? classes.active : ''
            }`}
            onClick={() => filterProductsByCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <Carousel
        swipeable={true}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true}
        infinite={false}
        autoPlay={false}
        keyBoardControl={true}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        customTransition="transform 500ms ease-in-out"
        afterChange={newIndex => setActiveProductIndex(newIndex)}
      >
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className={`${classes.carouselItem} ${
              index === activeProductIndex ? classes.active : ''
            }`}
          >
            <div className={classes.card}>
              <div className={classes.leftContent}>
                <h3 className={classes.title}>{product.name}</h3>
                <Link to={`/products/${product.id}`} >
                  <a href="#" className={classes.buyLink}>
                    Shop Now ➔
                  </a>
                </Link>
              </div>
              <div className={classes.rightContent}>
                <img src={image1} alt={product.name} className={classes.image} />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      <CarouselView title={"Feature Products"} />
    </div>
  );
};

export default ProductCarousel;
