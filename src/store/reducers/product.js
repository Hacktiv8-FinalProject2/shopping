import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      localStorage.setItem("allProducts", JSON.stringify(action.payload));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUpdateStock: (state, action) => {
      const updatedProducts = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return { ...product, stock: action.payload.stock };
        }
        return product;
      });
      state.products = updatedProducts;
      localStorage.setItem("allProducts", JSON.stringify(updatedProducts));
      toast.success("Update stock product success");
    },
  },
});

export const { setProducts, setLoading, setUpdateStock } = productSlice.actions;

export default productSlice.reducer;
