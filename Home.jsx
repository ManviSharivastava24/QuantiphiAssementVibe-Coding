import React from 'react';
import Sidebar from '../components/Sidebar';
import ProductGrid from '../components/ProductGrid';
import { FilterProvider } from '../context/FilterContext';

export default function Home() {
  return (
    <FilterProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <h1 className="text-xl font-extrabold text-gray-900">🛍️ The Product Store</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <Sidebar />
            <ProductGrid />
          </div>
        </main>
      </div>
    </FilterProvider>
  );
}
