import React from 'react';
import { useFilterContext } from '../context/FilterContext';

const SORT_OPTIONS = [
  { value: 'top_rated', label: 'Top Rated First' },
  { value: 'price_low_high', label: 'Price: Low to High' },
];

export default function SortDropdown() {
  const { filters, setSortBy } = useFilterContext();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sortBy" className="text-sm text-gray-600 hidden sm:block">
        Sort by
      </label>
      <select
        id="sortBy"
        value={filters.sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none cursor-pointer"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
