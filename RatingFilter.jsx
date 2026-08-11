import React from 'react';
import { useFilterContext } from '../context/FilterContext';

const RATINGS = [5, 4, 3, 2, 1];

export default function RatingFilter() {
  const { filters, setMinRating } = useFilterContext();

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
        Minimum Rating
      </h3>
      <div className="space-y-2">
        {RATINGS.map((rating) => (
          <label
            key={rating}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <input
              type="radio"
              name="minRating"
              checked={filters.minRating === rating}
              onChange={() => setMinRating(rating)}
              className="h-4 w-4 border-gray-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
            />
            <span className="flex items-center text-sm text-gray-700 group-hover:text-brand-700 transition-colors">
              {'★'.repeat(rating)}
              <span className="text-gray-300">{'★'.repeat(5 - rating)}</span>
              <span className="ml-1.5 text-gray-500">&amp; up</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
