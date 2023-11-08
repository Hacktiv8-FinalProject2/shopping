import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, setCart } from "../../store/reducers/cart";
import CartColumns from "./CartColums";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";

const CartContent = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const initialStockData = JSON.parse(localStorage.getItem("allProducts"));

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      dispatch(setCart(cartData));
    }
  }, [dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.removeItem("cart");
    const updatedStock = initialStockData.map((product) => {
      const cartItem = cart.find((item) => item.id === product.id);
      if (cartItem) {
        return { ...product, stock: product.stock + cartItem.quantity };
      }
      return product;
    });
    localStorage.setItem("allProducts", JSON.stringify(updatedStock));
  };

  return (
    <Wrapper className="container section section-center">
      <CartColumns />
      {cart.map((item) => {
        return <CartItem key={item.id} stock={item.stock} {...item} />;
      })}
      <hr />
      <div className="link-container">
        <Link to="/products" className="link-btn">
          continue shopping
        </Link>
        <button
          type="button"
          className="link-btn clear-btn"
          onClick={handleClearCart}
        >
          clear shopping cart
        </button>
      </div>
      <CartTotals />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: hsl(22, 31%, 52%);
    text-decoration: none;
    color: #ffff;
    border-radius: 0.25rem;
    letter-spacing: 0.1rem;
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: red;
  }
`;

export default CartContent;
