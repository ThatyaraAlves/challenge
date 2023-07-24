import classes from './ProductItem.module.css';
import ProductReview from './ProductReview/ProductReview';
import { Product } from '../../Interfaces/Interfaces';
import { Link } from 'react-router-dom';
import image from '../../assets/image-1.png'
interface ProductItemProps extends Product {
    showReview?: boolean;
  }


const ProductItem = (props: ProductItemProps) => {
    
    console.log("Props antes de passar -> ", props);
    console.log("Props.price antes de passar -> ", props.price);
    


    return (
        <Link to={`/products/${props.id}`} className={classes.link}>
            <div className={classes.card}>
                <div className={classes.imageCard} >
                    <img className={classes.imageSizing} src={image} alt="Failed to carregar" />
                </div>
                <div className={classes.textContainer}>
                    <h1 className={classes.title}>{props.name}</h1>
                    <p className={classes.price}>USD {props.price?.substring(1)}</p>
                </div>
                {
                    props.showReview && <ProductReview {...props} />
                }
            </div>
        </Link>
    )
};

export default ProductItem;