import styles from "./ProductReview.module.css";
import starSVG from "../../../assets/star.svg";
import { Product } from "../../../Interfaces/Interfaces";



const ProductReview: React.FC<Product> = (props) => {
    console.log("Product props -> ", props);
    return (
        <div className={styles.review}>
            <div className={styles.starContainer}>
                <span className={styles.starImageContainer}>
                    <img src={starSVG} className={styles.imageSizing} />
                </span>
                <p className={styles.starsNumber}>{props.rating}</p>
            </div>
            <p className={styles.totalReviewsText}>{props.reviews?.length} Reviews</p>
            <span>...</span>
        </div>
    );
}

export default ProductReview;