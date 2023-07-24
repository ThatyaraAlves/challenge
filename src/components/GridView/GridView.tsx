import classes from "./GridView.module.css";
import {Product} from '../../Interfaces/Interfaces';
import ProductItem from "../ProductItem/ProductItem";

interface GridViewProps {
    items: Product[];
}

const GridView = (props: GridViewProps) => {
    
    console.log("Props no gridview", props);
    return (
        <div className={classes.grid}>
           { props.items.map((item) => (
                <ProductItem id={item.id} image={item.image} name={item.name} price={item.price} rating={item.rating} reviews={item.reviews} showReview={true}/>
            ))}
            
        </div>
    );
}

export default GridView;