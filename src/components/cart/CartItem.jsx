import React from "react";
import styled from "styled-components";
import AmountButtons from "./AmountButtons";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../store/reducers/cart";
import { formatPrice } from "../../utils/price";

const CartItem = ({ id, title, image, price, quantity, stock }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const initialStockData = JSON.parse(localStorage.getItem("allProducts"));

  const handleRemoveCart = () => {
    dispatch(removeFromCart(id));
    const updatedStock = initialStockData.map((product) => {
      const cartItem = cart.find((item) => item.id === product.id);
      if (cartItem) {
        if (cartItem.id === id) {
          return { ...product, stock: product.stock + cartItem.quantity };
        }
      }
      return product;
    });
    localStorage.setItem("allProducts", JSON.stringify(updatedStock));
  };

  return (
    <Wrapper>
      <div className="title">
        <img
          src={image}
          alt={title}
          style={{ width: "auto", height: "100px" }}
        />
        <div>
          <h5 className="name">{title}</h5>
          <h5 className="price-small">{formatPrice(price)}</h5>
        </div>
      </div>
      <h5 className="price">{formatPrice(price)}</h5>
      <AmountButtons productId={id} quantity={quantity} stock={stock} />
      <h5 className="subtotal">{formatPrice(price * quantity)}</h5>
      <button type="button" className="remove-btn" onClick={handleRemoveCart}>
        <FaTrash size={15} />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .subtotal {
    display: none;
  }
  .price {
    display: none;
  }
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  .title {
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 0.25rem;
    object-fit: cover;
  }
  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
    margin-left: 35px;
  }
  .color {
    font-size: 0.75rem;
    letter-spacing: 0.1rem;
    text-transform: capitalize;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: red;
      margin-left: 0.5rem;
      border-radius: 0.25rem;
    }
  }
  .price-small {
    color: hsl(22, 31%, 52%);
  }
  .amount-btns {
    width: 75px;
    button {
      width: 1rem;
      height: 0.5rem;
      font-size: 0.75rem;
    }
    h2 {
      font-size: 1rem;
    }
  }
  .remove-btn {
    color: #ffff;
    background: transparent;
    border: transparent;
    letter-spacing: 0.1rem;
    background: hsl(360, 67%, 44%);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    cursor: pointer;
  }
  @media (min-width: 776px) {
    .subtotal {
      display: block;
      margin-bottom: 0;
      font-weight: bold;
      font-size: 1rem;
    }
    .price-small {
      display: none;
    }
    .price {
      display: block;
      font-size: 1rem;
      font-weight: bold;
    }
    .name {
      font-size: 0.85rem;
    }
    .color {
      font-size: 0.85rem;
      span {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 75px;
    img {
      height: 100%;
    }
    .title {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
    .amount-btns {
      width: 100px;
      button {
        width: 1.5rem;
        height: 1rem;
        font-size: 1rem;
      }
      h2 {
        font-size: 1.5rem;
      }
    }
  }
`;

export default CartItem;
