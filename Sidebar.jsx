import React from 'react';
import CategoryFilter from './CategoryFilter';
import PriceRangeFilter from './PriceRangeFilter';
import RatingFilter from './RatingFilter';
import { useFilterContext } from '../context/FilterContext';

export default function Sidebar() {
  const { resetFilters } = useFilterContext();

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="lg:sticky lg:top-6 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          <button
            onClick={resetFilters}
            className="text-xs font-medium text-brand-600 hover:text-brand-700 hover:underline"
          >
            Clear all
          </button>
        </div>

        <CategoryFilter />
        <hr className="border-gray-100 mb-6" />
        <PriceRangeFilter />
        <hr className="border-gray-100 mb-6" />
        <RatingFilter />
      </div>
    </aside>
  );
}
