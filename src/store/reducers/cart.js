import { toast } from "react-toastify";

export const addToCart = (product, stock) => {
  return (dispatch, getState) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, stock },
    });

    const cartData = getState().cart;
    localStorage.setItem("cart", JSON.stringify(cartData));
    toast.success("Product added to cart successfully!");
  };
};

export const removeFromCart = (productId) => {
  return (dispatch, getState) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: productId,
    });

    const cartData = getState().cart;
    localStorage.setItem("cart", JSON.stringify(cartData));
  };
};

export const clearCart = () => ({
  type: "CLEAR_CART",
});

export const setCart = (product) => ({
  type: "SET_CART",
  payload: product,
});

export const updateQuantity = (productId, type) => {
  return (dispatch, getState) => {
    const cart = getState().cart;
    const productToUpdate = cart.find((item) => item.id === productId);

    if (type === "increase") {
      if (productToUpdate.quantity >= productToUpdate.stock) {
        toast.error("Quantity not met. Product stock is insufficient.");
        return;
      }
    }

    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, type },
    });

    const cartData = getState().cart;
    localStorage.setItem("cart", JSON.stringify(cartData));
  };
};

export const updateStock = (productId, newStock) => {
  return {
    type: "UPDATE_STOCK",
    payload: { productId, newStock },
  };
};

const initialState = [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProduct = state.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        return [
          ...state,
          { ...action.payload, quantity: action.payload.quantity },
        ];
      }

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);

    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.productId
          ? {
              ...item,
              quantity:
                action.payload.type === "increase"
                  ? item.quantity + 1
                  : item.quantity - 1,
            }
          : item
      );

    case "CLEAR_CART":
      return [];

    case "SET_CART":
      return action.payload;

    case "UPDATE_STOCK":
      const productId = action.payload.productId;
      const newStock = action.payload.newStock;
      return state.map((product) =>
        product.id === productId ? { ...product, stock: newStock } : product
      );

    default:
      return state;
  }
};

export default cartReducer;
