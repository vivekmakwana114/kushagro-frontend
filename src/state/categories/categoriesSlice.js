import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  updateCategoryStatus,
  deleteCategory,
  getCategoryById,
} from "./categoriesService";

// fetch category by id
export const fetchCategoryById = createAsyncThunk(
  "categories/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getCategoryById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Here is the thunk which will call the API's
// this are used to perform the async actions
// and it gives promises in return with the status of pending, failure, fulfilled.

// fetch all categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await getAllCategories(page, limit, search);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// create category
export const createNewCategory = createAsyncThunk(
  "categories/create",
  async (categoryData, { rejectWithValue, dispatch }) => {
    try {
      const response = await createCategory(categoryData);
      dispatch(fetchCategories({})); // Fetch all after create
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// update category
export const updateExistingCategory = createAsyncThunk(
  "categories/update",
  async ({ id, categoryData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await updateCategory(id, categoryData);
      dispatch(fetchCategories({})); // Fetch all after update
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// update category status
export const updateExistingCategoryStatus = createAsyncThunk(
  "categories/updateStatus",
  async ({ id, status }, { rejectWithValue, dispatch }) => {
    try {
      const response = await updateCategoryStatus(id, status);
      dispatch(fetchCategories({})); // Fetch all after status update
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// delete category
export const removeCategory = createAsyncThunk(
  "categories/delete",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await deleteCategory(id);
      dispatch(fetchCategories({})); // Fetch all after delete
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// initial stage data.
const initialState = {
  categories: [], //the main list of category data
  totalPages: 1,
  totalResults: 0,
  loading: false, // for showing loaders
  error: null, // for error messages
  success: false, // to know when an action completed successfully
};

// slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  // standard reduces for the synchronus actions
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // fetch  categories handlers
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        // API response structure: { success: true, data: [...] }
        const responseData = action.payload.data || action.payload; // fallback if payload IS the array

        if (Array.isArray(responseData)) {
          state.categories = responseData;
          state.totalResults = responseData.length;
          state.totalPages = 1; // API doesn't seem to return pagination metadata yet
        } else {
          // Handle if it DOES return results object (for future proofing or if mixed)
          state.categories =
            responseData.results || responseData.categories || [];
          state.totalPages = responseData.totalPages || 1;
          state.totalResults = responseData.totalResults || 0;
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //   create categories handlers
    builder
      .addCase(createNewCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createNewCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // re-fetch the categories to get instant feedback
        const newCategory = action.payload.data || action.payload;
        state.categories.unshift(newCategory);
      })
      .addCase(createNewCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // upate categories handlers
    builder
      .addCase(updateExistingCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateExistingCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updatedCategory = action.payload.data || action.payload;
        const index = state.categories.findIndex(
          (item) =>
            (item._id || item.id) ===
            (updatedCategory._id || updatedCategory.id)
        );
        if (index !== -1) {
          state.categories[index] = updatedCategory;
        }
      })
      .addCase(updateExistingCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update category status handlers
      .addCase(updateExistingCategoryStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExistingCategoryStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updatedCategory = action.payload.data || action.payload;

        if (updatedCategory && (updatedCategory._id || updatedCategory.id)) {
          const index = state.categories.findIndex(
            (item) =>
              (item._id || item.id) ===
              (updatedCategory._id || updatedCategory.id)
          );
          if (index !== -1) {
            state.categories[index] = updatedCategory;
          }
        }
      })
      .addCase(updateExistingCategoryStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // deletecategories
    builder
      .addCase(removeCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors } = categoriesSlice.actions;
export default categoriesSlice.reducer;
