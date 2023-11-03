import { toast } from "react-toastify";

export const addToCart = (product) => {
  return (dispatch, getState) => {

    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });

    const cartData = getState().cart;

    localStorage.setItem("cart", JSON.stringify(cartData));

    toast.success("Product added to cart successfully!");
  };
};
export default addToCart;