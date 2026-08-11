import React from 'react';
import { useFilterContext } from '../context/FilterContext';

const CATEGORIES = ['Electronics', 'Apparel', 'Footwear'];

export default function CategoryFilter() {
  const { filters, toggleCategory } = useFilterContext();

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
        Category
      </h3>
      <div className="space-y-2">
        {CATEGORIES.map((category) => (
          <label
            key={category}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <input
              type="checkbox"
              checked={filters.categories.includes(category)}
              onChange={() => toggleCategory(category)}
              className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
            />
            <span className="text-sm text-gray-700 group-hover:text-brand-700 transition-colors">
              {category}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
