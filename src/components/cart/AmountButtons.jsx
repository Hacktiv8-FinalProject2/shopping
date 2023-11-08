import React from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../../store/reducers/cart";

const AmountButtons = ({ productId, quantity, stock }) => {
  const dispatch = useDispatch();
  const initialStockData = JSON.parse(localStorage.getItem("allProducts"));

  const handleQuantityChange = (productId, type) => {
    if (type === "increase") {
      dispatch(updateQuantity(productId, type));
      const updatedProducts = initialStockData.map((p) => {
        if (p.id === productId) {
          return { ...p, stock: p.stock - 1 };
        }
        return p;
      });
      localStorage.setItem("allProducts", JSON.stringify(updatedProducts));
    } else if (type === "decrease") {
      dispatch(updateQuantity(productId, type));
      const updatedProducts = initialStockData.map((p) => {
        if (p.id === productId) {
          return { ...p, stock: p.stock + 1 };
        }
        return p;
      });
      localStorage.setItem("allProducts", JSON.stringify(updatedProducts));
    }
  };

  return (
    <Wrapper className="amount-btns">
      <button
        type="button"
        className="amount-btn"
        onClick={() => handleQuantityChange(productId, "decrease")}
        disabled={quantity <= 1}
      >
        <FaMinus />
      </button>
      <h2 className="amount">{quantity}</h2>
      <button
        type="button"
        className="amount-btn"
        onClick={() => handleQuantityChange(productId, "increase")}
        disabled={quantity > stock}
      >
        <FaPlus />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`;

export default AmountButtons;
