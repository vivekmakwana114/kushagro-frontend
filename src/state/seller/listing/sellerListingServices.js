import { api } from "@/lib/api";

export const getSellerProducts = (sellerId, params = {}) => {
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append("page", params.page);
  if (params.limit) queryParams.append("limit", params.limit);
  if (params.search) queryParams.append("search", params.search);

  if (params.status && params.status !== "all")
    queryParams.append("status", params.status);

  const queryString = queryParams.toString();
  const url = queryString
    ? `/v1/product/seller/${sellerId}?${queryString}`
    : `/v1/product/seller/${sellerId}`;

  console.log("Making API call to:", url);
  return api.get(url);
};

export const updateProductStatus = (id, status) => {
  return api.patch(`/v1/product/${id}`, { status });
};
