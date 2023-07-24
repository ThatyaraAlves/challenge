import classes from './ProductHorizontal.module.css';
import { Product } from '../../Interfaces/Interfaces';
import imagem from '../../assets/image-1.png';
import StarIcon from '../../assets/star-filled.svg';
import dot from '../../assets/more-vertical.svg'

interface ProductHorizontalProps {
    product: Product;
  }

const ProductHorizontal: React.FC<ProductHorizontalProps> = ({product}) => {
    return (
        <div className={classes.productsList}>
            <li key={product.id} className={classes.productItem}>
                <div className={classes.productImageContainer}>
                    <img src={imagem} alt={product.name} className={classes.productImage} />
                </div>
                <div className={classes.productDetails}>
                    <h3 className={classes.productName}>{product.name}</h3>
                    <div className={classes.productPrice}>Price:  {product.price}</div>
                    <div className={classes.productReviewCount}>
                        <div className={classes.productRating}>
                            <img src={StarIcon} alt="Star Icon" />
                            {product.rating}
                        </div>
                        <div className={classes.productReview}>{product.totalReviews} reviews</div>
                    </div>
                    <img src={dot} className={classes.dotIcon} />
                </div>
            </li>
        </div>
    )
}

export default ProductHorizontal;