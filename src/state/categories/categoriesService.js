import { api } from "@/lib/api";

// Get all categories
export const getAllCategories = (page, limit, search) => {
  let url = "/v1/category";
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);
  if (search) params.append("search", search);

  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  return api.get(url);
};

// Get category by ID
export const getCategoryById = (id) => {
  return api.get(`/v1/category/${id}`);
};

// Create a new category
export const createCategory = (categoryData) => {
  return api.post("/v1/category", categoryData);
};

// Update a category
export const updateCategory = (id, categoryData) => {
  return api.patch(`/v1/category/${id}`, categoryData);
};

// Update category status
export const updateCategoryStatus = (id, status) => {
  return api.patch(`/v1/category/status/${id}`, { status });
};

// Delete a category
export const deleteCategory = (id) => {
  return api.delete(`/v1/category/${id}`);
};
