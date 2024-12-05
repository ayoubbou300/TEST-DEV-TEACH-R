import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../utils/api";

const initialState = {
  products: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};


export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await getProducts();
  return response.data;
});

export const addProduct = createAsyncThunk("products/addProduct", async (data) => {
  const response = await createProduct(data);
  return response.data;
});

export const editProduct = createAsyncThunk("products/editProduct", async ({ id, data }) => {
  const response = await updateProduct(id, data);
  return response.data;
});

export const removeProduct = createAsyncThunk("products/removeProduct", async (id) => {
  await deleteProduct(id);
  return id;
});


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        state.products[index] = action.payload;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
