import React from 'react';
import { Product } from '../../Interfaces/Interfaces';
import classes from './ProductOverview.module.css';
import mockedImage from '../../mock/mockOverviewHeadphone.png';
import mockedUserPicture from '../../mock/mockedUserPicture.png';
import Rating1Star from '../../assets/Rating1Stars.png';
import Rating2Stars from '../../assets/Rating2Stars.png';
import Rating3Stars from '../../assets/Rating3Stars.png';
import Rating4Stars from '../../assets/Rating4Stars.png';
import Rating5Stars from '../../assets/Rating5Stars.png';
import CarousselView from '../Caroussel/CarousselView';

interface ProductOverviewProps {
    product: Product;
}

const ProductOverview: React.FC<ProductOverviewProps> = ({ product }) => {
    

    return (
        <>
            <div className={classes.contentWithMargin}>
                
                <div className={classes.imageContainer}>
                    <img className={classes.image} src={mockedImage} alt="Failed to load" />
                </div>
                
                <div className={classes.reviewList}>
                    <p className={classes.reviewQuantity}>Reviews  ({product.reviews?.length})</p>
                    {product.reviews?.map((review) => {
                        let ratingImage;
                        switch (review.rating) {
                            case 1:
                                ratingImage = Rating1Star;
                                break;
                            case 2:
                                ratingImage = Rating2Stars;
                                break;
                            case 3:
                                ratingImage = Rating3Stars;
                                break;
                            case 4:
                                ratingImage = Rating4Stars;
                                break;
                            case 5:
                                ratingImage = Rating5Stars;
                                break;
                            default:
                                ratingImage = ""; 
                                break;
                        }
                        return (
                            <>
                                <div className={classes.reviewFrame}>
                                    <img className={classes.reviewImage} src={mockedUserPicture} alt="Failed to load" />
                                    <div className={classes.reviewContent}>
                                        <p className={classes.reviewUser}>{review.user}</p>
                                        <img className={classes.ratingImage} src={ratingImage} alt="Rating image"/>
                                        <p className={classes.reviewDescription}>{review.description}</p>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
                    <CarousselView title="Another Product" />
            </div>
        </>
    )
};

export default ProductOverview;
