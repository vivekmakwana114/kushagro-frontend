import { api } from "@/lib/api";

// Get all products with filters
export const getProducts = (params) => {
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append("page", params.page);
  if (params.limit) queryParams.append("limit", params.limit);
  if (params.search) queryParams.append("search", params.search);

  // Appending filters
  if (params.status && params.status !== "all")
    queryParams.append("status", params.status);

  // Note: Add other filters here as backend expects them (e.g. price range, categories etc.)
  // Assuming backend takes these as query params for now based on user request "add params as required"

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
