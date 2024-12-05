import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import categoriesReducer from "./slices/categoriesSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
  },
});

export default store;
