import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import classes from "./ProductCarousel.module.css";
import image1 from "../../assets/image-1.png";
import ProductItem from '../ProductItem/ProductItem';
import image2 from "../../assets/image5.png";
import { Product, Category} from '../../Interfaces/Interfaces';


import { useNavigate } from 'react-router-dom';


const CarousselView: React.FC<{ title?: string }> = ({ title }) =>{
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();
    const handleSeeAll = () => {
      navigate('/products/', { state: { filteredResults: products }});
    }
    
    useEffect(() => {
      fetch('https://run.mocky.io/v3/7e727637-a4bf-4ff4-865f-51197042bc89')
        .then(response => response.json())
        .then((data: Product[]) => {
          setProducts(data);
        })
        .catch(error => {
          console.error('Error fetching product data:', error);
        });
    }, []);

    return(
        <div>
            <div className={classes.aside}>
            <p className={classes.featureProducts}>{title}</p><button onClick={handleSeeAll} className={classes.link}>See All</button>

                  </div>
            
                  <Carousel
            swipeable={true}
            draggable={false}
            showDots={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024
                },
                items: 3,
                partialVisibilityGutter: 40
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0
                },
                items: 2,
                partialVisibilityGutter: 30
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464
                },
                items: 2,
                partialVisibilityGutter: 30
              }
            }}
            ssr={true} 
            infinite={true}
            autoPlay={false}
            keyBoardControl={true}
            removeArrowOnDeviceType={['tablet', 'mobile']}
            >
            
            {products.map((item) => (
              <div className={classes.carouselContainer}>
                <div className={classes.smallCards}>
                
                    <ProductItem id={item.id} image={image2}
                    name={item.name} showReview={false} price={item.price}
                    />
                  
                            </div>
                </div>
            ))}
                  </Carousel>
        </div>
    )




}
export default CarousselView;