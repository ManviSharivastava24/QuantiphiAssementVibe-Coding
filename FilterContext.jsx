import React, { createContext, useContext, useState, useCallback } from 'react';

const DEFAULT_FILTERS = {
  categories: [],
  minPrice: '',
  maxPrice: '',
  minRating: null,
  sortBy: 'top_rated',
};

const FilterContext = createContext(null);

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const toggleCategory = useCallback((category) => {
    setFilters((prev) => {
      const exists = prev.categories.includes(category);
      const categories = exists
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories };
    });
  }, []);

  const setPriceRange = useCallback((minPrice, maxPrice) => {
    setFilters((prev) => ({ ...prev, minPrice, maxPrice }));
  }, []);

  const setMinRating = useCallback((rating) => {
    setFilters((prev) => ({
      // Clicking the already-selected rating clears it (toggle behavior)
      ...prev,
      minRating: prev.minRating === rating ? null : rating,
    }));
  }, []);

  const setSortBy = useCallback((sortBy) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const value = {
    filters,
    toggleCategory,
    setPriceRange,
    setMinRating,
    setSortBy,
    resetFilters,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilterContext() {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return ctx;
}
