import React from 'react';

function StarRating({ rating }) {
  return (
    <div className="flex items-center text-sm" aria-label={`Rated ${rating} out of 5 stars`}>
      <span className="text-amber-400">{'★'.repeat(rating)}</span>
      <span className="text-gray-300">{'★'.repeat(5 - rating)}</span>
      <span className="ml-1.5 text-xs text-gray-500">({rating}.0)</span>
    </div>
  );
}

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <img
          src={product.thumbnail}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/400x400?text=No+Image';
          }}
        />
      </div>
      <div className="p-4">
        <span className="inline-block text-[11px] font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full mb-2">
          {product.category}
        </span>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <StarRating rating={product.rating} />
        </div>
      </div>
    </div>
  );
}
