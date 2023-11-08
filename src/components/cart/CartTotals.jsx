import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { formatPrice } from "../../utils/price";
import { clearCart, updateStock } from "../../store/reducers/cart";
import { toast } from "react-toastify";

const CartTotals = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const allProducts = useSelector((state) => state.product.products);

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    const storedCart = JSON.parse(localStorage.getItem("checkout")) || [];
    const combinedCart = [...storedCart, ...cartItems];

    localStorage.setItem("checkout", JSON.stringify(combinedCart));

    cartItems.forEach((item) => {
      dispatch(updateStock(item.id, item.stock - item.quantity));
    });

    const updatedAllProducts = allProducts.map((product) => {
      const item = cartItems.find((item) => item.id === product.id);
      if (item) {
        return { ...product, stock: product.stock - item.quantity };
      }
      return product;
    });
    localStorage.setItem("allProducts", JSON.stringify(updatedAllProducts));

    dispatch(clearCart());
    localStorage.removeItem("cart");
    toast.success("Checkout successful!");
  };

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal : <span>{formatPrice(calculateTotalPrice())}</span>
          </h5>
          <p>
            shipping fee : <span>{formatPrice(1.55)}</span>
          </p>
          <hr />
          <h4>order total : {formatPrice(calculateTotalPrice() + 1.55)}</h4>
        </article>
        <button className="btn" onClick={handleCheckout}>
          CHECKOUT
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid hsl(20, 31%, 74%);
    border-radius: 0.25rem;
    padding: 1.5rem 3rem;
  }
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
    font-weight: bold;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
    background: hsl(22, 31%, 52%);
    text-decoration: none;
    color: #ffff;
  }
`;

export default CartTotals;
