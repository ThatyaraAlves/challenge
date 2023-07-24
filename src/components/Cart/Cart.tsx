import React from 'react';
import { useCart } from '../../templates/CartContext';
import { useEffect } from 'react';
import { useNavBar } from '../../templates/NavBarContext';
import image from '../../assets/image-1.png'
import classes from './Cart.module.css';
import trashIcon from '../../assets/trash-2.svg'
import minusIcon from '../../assets/minus.svg'
import plusIcon from '../../assets/plus.svg'
import cartIcon from '../../assets/shopping-cart.svg'
import chevronIcon from '../../assets/chevron-right.png'

const Cart: React.FC = () => {
  const { setTitle, setRightIcon } = useNavBar();
  const { cartItems, removeFromCart,increaseQuantity, decreaseQuantity } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce((total, item) => {
    if (item.price) {
      return total + parseFloat(item.price.replace('$', '')) * item.quantity;
    }
    return total;
  }, 0);
  

  useEffect(() => {
    setTitle('Shopping Cart');
    setRightIcon(trashIcon)

    return () => {
      setTitle('');  // limpa o título quando o componente é desmontado
      setRightIcon(cartIcon);
    };
  }, [setTitle]);
  
  return (
    <div>

      <div>
        
        {cartItems.length === 0 ? (
          <p className={classes.checkoutInfo}>The cart is empty</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className={classes.productList}>
                <div className={classes.productImageContainer}>
                  <img src={image} alt="" className={classes.productImage} />
                </div>
                <div className={classes.productInfo}>
                  <div className={classes.productDetails}>
                    <p className={classes.productName}>{item.name}</p>
                    <p className={classes.productPrice}>{item.price}</p>
                  </div>
                  <div className={classes.buttons}>
                    <div className={classes.quantityButtons}>
                      <button className={classes.button} onClick={() => decreaseQuantity(item.id)}>
                        <img className={classes.buttonImage} src={minusIcon} alt="" /></button>
                      <p>{item.quantity}</p>
                      <button className={classes.button} onClick={() => increaseQuantity(item.id)}>
                        <img src={plusIcon} alt="" /></button>
                    </div>
                    <button className={classes.trashButton} onClick={() => {
                      if (typeof item.id !== 'undefined') {
                        removeFromCart(item.id);
                      }
                    }}>
                      <img className={classes.buttonImage} src={trashIcon} alt="Garbage bin" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
       {(cartItems.length > 0) && <div className={classes.checkoutInfo}>
        <p className={classes.checkoutTotalItems}>Total {totalItems} Items</p>
        <p className={classes.checkoutTotalPrice}>USD {totalAmount.toFixed(2)}</p>
      </div>}
      <button className={classes.checkoutButton} onClick={() => console.log("Botão pressionado")}>
        <p>Proceed to checkout</p>
        <img className={classes.buttonIcon} src={chevronIcon} alt="Righ Chevron" />
      </button>
    </div>
  );
};

export default Cart;
