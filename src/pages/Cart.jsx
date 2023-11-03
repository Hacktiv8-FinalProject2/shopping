import { Link } from "react-router-dom";
import { formatPrice } from "../utils/price";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  setCart,
  updateQuantity,
} from "../store/reducers/cart";
import { useEffect } from "react";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const handleQuantityChange = (productId, type) => {
    dispatch(updateQuantity(productId, type));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      dispatch(setCart(cartData));
    }
  }, [dispatch]);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>Price: {formatPrice(item.price * item.quantity)}</p>
              <p>Quantity: {item.quantity}</p>
              <button
                onClick={() => handleQuantityChange(item.id, "increase")}
                disabled={item.quantity > item.stock}
              >
                +
              </button>
              <button
                onClick={() => handleQuantityChange(item.id, "decrease")}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          ))}
          <p>Total Price: {formatPrice(calculateTotalPrice())}</p>
        </div>
      )} 
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Cart;
