import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CartContent from "../components/cart/CartContent";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../store/reducers/cart";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      dispatch(setCart(cartData));
    }
  }, [dispatch]);

  if (cart.length < 1) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>Your cart is empty</h2>
          <Link
            to="/products"
            className="btn"
            style={{ backgroundColor: "hsl(22, 31%, 52%)", color: "#fff" }}
          >
            Go Shopping
          </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <main>
      <Wrapper className="page">
        <CartContent />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    min-height: 100vh;
    margin-top: 4rem;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default Cart;
