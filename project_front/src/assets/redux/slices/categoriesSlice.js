import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../utils/api";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  const response = await getCategories();
  return response.data;
});

export const addCategory = createAsyncThunk("categories/addCategory", async (data) => {
  const response = await createCategory(data);
  return response.data;
});

export const editCategory = createAsyncThunk("categories/editCategory", async ({ id, data }) => {
  const response = await updateCategory(id, data);
  return response.data;
});

export const removeCategory = createAsyncThunk("categories/removeCategory", async (id) => {
  await deleteCategory(id);
  return id;
});


const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((c) => c.id === action.payload.id);
        state.categories[index] = action.payload;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((c) => c.id !== action.payload);
      });
  },
});

export default categoriesSlice.reducer;
