import React, { useState, useEffect } from 'react';
import { useFilterContext } from '../context/FilterContext';

const ABSOLUTE_MAX = 600;

export default function PriceRangeFilter() {
  const { filters, setPriceRange } = useFilterContext();

  // Local UI state lets the slider feel smooth while the user drags;
  // the shared context (and thus the API call) updates alongside it.
  const [localMin, setLocalMin] = useState(filters.minPrice || 0);
  const [localMax, setLocalMax] = useState(filters.maxPrice || ABSOLUTE_MAX);

  useEffect(() => {
    setLocalMin(filters.minPrice === '' ? 0 : filters.minPrice);
    setLocalMax(filters.maxPrice === '' ? ABSOLUTE_MAX : filters.maxPrice);
  }, [filters.minPrice, filters.maxPrice]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), localMax);
    setLocalMin(value);
    setPriceRange(value, localMax);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), localMin);
    setLocalMax(value);
    setPriceRange(localMin, value);
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
        Price Range
      </h3>

      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
        <span className="font-medium text-brand-700">${localMin}</span>
        <span className="font-medium text-brand-700">${localMax}</span>
      </div>

      <div className="relative mb-4">
        <input
          type="range"
          min={0}
          max={ABSOLUTE_MAX}
          step={5}
          value={localMin}
          onChange={handleMinChange}
          className="w-full absolute top-0 h-2 bg-transparent pointer-events-auto"
        />
        <input
          type="range"
          min={0}
          max={ABSOLUTE_MAX}
          step={5}
          value={localMax}
          onChange={handleMaxChange}
          className="w-full absolute top-0 h-2 bg-transparent pointer-events-auto"
        />
        {/* Static track for visual reference */}
        <div className="h-2 rounded-full bg-gray-200 mt-6" />
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input
          type="number"
          min={0}
          value={localMin}
          onChange={handleMinChange}
          className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          aria-label="Minimum price"
        />
        <span className="text-gray-400">–</span>
        <input
          type="number"
          min={0}
          value={localMax}
          onChange={handleMaxChange}
          className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          aria-label="Maximum price"
        />
      </div>
    </div>
  );
}
