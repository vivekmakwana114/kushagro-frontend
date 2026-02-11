import { api } from "@/lib/api";

// Get all products with filters
export const getProducts = (params) => {
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append("page", params.page);
  if (params.limit) queryParams.append("limit", params.limit);
  if (params.search) queryParams.append("name", params.search);

  // Appending filters
  if (params.status && params.status !== "all")
    queryParams.append("status", params.status);

  if (params.minPrice) queryParams.append("minPrice", params.minPrice);
  if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice);

  if (params.categoryId) queryParams.append("categoryId", params.categoryId);

  if (params.dateFrom) queryParams.append("dateFrom", params.dateFrom);
  if (params.dateTo) queryParams.append("dateTo", params.dateTo);

  const queryString = queryParams.toString();
  const url = queryString ? `/v1/product?${queryString}` : "/v1/product";

  return api.get(url);
};

// Get product by ID
export const getProductById = (id) => {
  return api.get(`/v1/product/${id}`);
};

// Update product status
export const updateProductStatus = (id, status) => {
  return api.patch(`/v1/product/${id}`, { status });
};
