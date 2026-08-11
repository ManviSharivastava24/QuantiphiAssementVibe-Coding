import { useState, useEffect, useRef } from 'react';
import { fetchFilteredProducts } from '../api/productApi';
import { useFilterContext } from '../context/FilterContext';

/**
 * Instantly refetches products from the server any time a filter or sort
 * option changes. Debounced slightly to avoid firing a request on every
 * keystroke when typing in the price inputs, and guards against race
 * conditions from out-of-order responses.
 */
export function useProducts() {
  const { filters } = useFilterContext();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const requestIdRef = useRef(0);

  useEffect(() => {
    const currentRequestId = ++requestIdRef.current;
    const debounceTimer = setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchFilteredProducts(filters);
        // Ignore stale responses if a newer request has since been fired
        if (currentRequestId === requestIdRef.current) {
          setProducts(result.data || []);
        }
      } catch (err) {
        if (currentRequestId === requestIdRef.current) {
          console.error('Failed to fetch products:', err);
          setError(
            err.response?.data?.message ||
              'Unable to load products right now. Please check your connection and try again.'
          );
          setProducts([]);
        }
      } finally {
        if (currentRequestId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    }, 300); // debounce window

    return () => clearTimeout(debounceTimer);
  }, [
    filters.categories,
    filters.minPrice,
    filters.maxPrice,
    filters.minRating,
    filters.sortBy,
  ]);

  return { products, isLoading, error };
}
