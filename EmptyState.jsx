import React from 'react';
import { useFilterContext } from '../context/FilterContext';

export default function EmptyState() {
  const { resetFilters } = useFilterContext();

  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-6 bg-white rounded-xl border border-dashed border-gray-300">
      <div className="text-5xl mb-4">🔍</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        No items match your criteria.
      </h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm">
        Try widening your price range, removing a category, or lowering the minimum rating.
      </p>
      <button
        onClick={resetFilters}
        className="px-5 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
      >
        Reset filters
      </button>
    </div>
  );
}
