import classes from "./ProductDetail.module.css";
import { useState } from 'react';
import { Product } from '../../Interfaces/Interfaces';
import { Link } from 'react-router-dom'
import MainHeader from "../../components/MainHeader/MainHeader";
import TabBar from "../../components/TabBar/TabBar";
import ProductOverview from "../../components/ProductOverview/ProductOverview";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from '../../templates/CartContext';




const ProductDetail = ()  => {
    const { addToCart } = useCart();
    const { idParam } = useParams();
    const [product, setProduct] = useState<Product>();
    const [tab, setTab] = useState('overview'); 
    

const handleTabChange = (tabSelected: string) => {
        console.log(`Selected tab: ${tabSelected}`);
        setTab(tabSelected); 
    };

    useEffect(() => {
        fetch('https://run.mocky.io/v3/7e727637-a4bf-4ff4-865f-51197042bc89')
          .then(response => response.json())
          .then(data => {
            
            const filteredById = data.filter((product: Product) => {
                return Number(product.id) == Number(idParam);
            });

            setProduct(filteredById[0]);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);



    return (
        <div className={classes.ExploreProducts}>
            <MainHeader price={product?.price} name={product?.name} />
            <TabBar onButtonClicked={handleTabChange} />
            {tab === 'overview' && product && <ProductOverview
          product={product}
        />}
            {tab === 'features' &&
                <div className={classes.feature}>
                    <h1 className={classes.featureTitle}>{product?.name}</h1>
                    
                    <p className={classes.featureDescription}>The speaker unit contains a diaphragm that is precision-grown from NAC Audio bio-cellulose, making it stiffer, lighter and stronger than regular PET speaker units, and allowing the sound-producing diaphragm to vibrate without the levels of distortion found in other speakers. </p>
                </div>}
                {product !== undefined && ( 
                <Link to="/cart" className={classes.link}>
                        <button className={classes.cartButton} onClick={() => addToCart(product)}>
                            Add to cart
                        </button>
                    </Link>
                    )}
        </div>
        
    )
}

export default ProductDetail;