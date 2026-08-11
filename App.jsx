import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Additional routes (e.g. product detail pages) can be added here */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center text-gray-500">
            404 — Page not found
          </div>
        }
      />
    </Routes>
  );
}
