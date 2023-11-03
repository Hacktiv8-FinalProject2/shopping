import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import productReducer from "./reducers/product";
import cartReducer from "./reducers/cart";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer
  },
});
