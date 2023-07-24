import classes from "./MainHeader.module.css";

export interface MainHeaderProps {
    price?: string;
    name?: string;
}

const MainHeader = (props: MainHeaderProps) => {
    return (
        <div className={classes.mainHeader}>
            <p className={classes.price}>USD {props.price}</p>
           
            <p className={classes.name}>{props.name}</p>
        </div>
    );
}

export default MainHeader;