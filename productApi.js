import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

/**
 * Fetches products from the backend, forwarding only the active filter
 * criteria. All actual filtering/sorting computation happens server-side —
 * this function is a thin transport layer only.
 */
export async function fetchFilteredProducts(filters) {
  const params = {};

  if (filters.categories && filters.categories.length > 0) {
    params.categories = filters.categories.join(',');
  }
  if (filters.minPrice !== null && filters.minPrice !== undefined && filters.minPrice !== '') {
    params.minPrice = filters.minPrice;
  }
  if (filters.maxPrice !== null && filters.maxPrice !== undefined && filters.maxPrice !== '') {
    params.maxPrice = filters.maxPrice;
  }
  if (filters.minRating) {
    params.minRating = filters.minRating;
  }
  if (filters.sortBy) {
    params.sortBy = filters.sortBy;
  }

  const response = await apiClient.get('/products', { params });
  return response.data; // { success, count, appliedFilters, data }
}

export default apiClient;
