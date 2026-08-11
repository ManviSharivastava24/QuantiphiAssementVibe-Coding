/**
 * Seed script — wipes the products collection and inserts 20 dummy products
 * spread across Electronics, Apparel, and Footwear.
 *
 * Run with: npm run seed
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');

const products = [
  // Electronics (7)
  { name: 'Wireless Noise-Cancelling Headphones', price: 199.99, category: 'Electronics', rating: 5, thumbnail: 'https://picsum.photos/seed/headphones/400/400' },
  { name: '4K Ultra HD Smart TV 55"', price: 549.0, category: 'Electronics', rating: 4, thumbnail: 'https://picsum.photos/seed/smarttv/400/400' },
  { name: 'Mechanical Gaming Keyboard', price: 89.5, category: 'Electronics', rating: 4, thumbnail: 'https://picsum.photos/seed/keyboard/400/400' },
  { name: 'Portable Bluetooth Speaker', price: 45.0, category: 'Electronics', rating: 3, thumbnail: 'https://picsum.photos/seed/speaker/400/400' },
  { name: 'Smartwatch Series 7', price: 299.99, category: 'Electronics', rating: 5, thumbnail: 'https://picsum.photos/seed/smartwatch/400/400' },
  { name: 'Compact Digital Camera', price: 429.0, category: 'Electronics', rating: 4, thumbnail: 'https://picsum.photos/seed/camera/400/400' },
  { name: 'Budget Wireless Mouse', price: 15.99, category: 'Electronics', rating: 2, thumbnail: 'https://picsum.photos/seed/mouse/400/400' },

  // Apparel (7)
  { name: 'Classic Denim Jacket', price: 79.99, category: 'Apparel', rating: 4, thumbnail: 'https://picsum.photos/seed/denimjacket/400/400' },
  { name: 'Organic Cotton T-Shirt', price: 19.99, category: 'Apparel', rating: 5, thumbnail: 'https://picsum.photos/seed/tshirt/400/400' },
  { name: 'Slim Fit Chino Trousers', price: 54.5, category: 'Apparel', rating: 3, thumbnail: 'https://picsum.photos/seed/chinos/400/400' },
  { name: 'Wool Blend Overcoat', price: 189.0, category: 'Apparel', rating: 5, thumbnail: 'https://picsum.photos/seed/overcoat/400/400' },
  { name: 'Athletic Performance Hoodie', price: 49.99, category: 'Apparel', rating: 4, thumbnail: 'https://picsum.photos/seed/hoodie/400/400' },
  { name: 'Summer Floral Dress', price: 39.99, category: 'Apparel', rating: 3, thumbnail: 'https://picsum.photos/seed/dress/400/400' },
  { name: 'Clearance Graphic Tee', price: 9.99, category: 'Apparel', rating: 2, thumbnail: 'https://picsum.photos/seed/graphictee/400/400' },

  // Footwear (6)
  { name: 'Running Sneakers Pro', price: 129.99, category: 'Footwear', rating: 5, thumbnail: 'https://picsum.photos/seed/sneakers/400/400' },
  { name: 'Leather Chelsea Boots', price: 159.0, category: 'Footwear', rating: 4, thumbnail: 'https://picsum.photos/seed/chelseaboots/400/400' },
  { name: 'Casual Canvas Shoes', price: 44.99, category: 'Footwear', rating: 3, thumbnail: 'https://picsum.photos/seed/canvasshoes/400/400' },
  { name: 'Trail Hiking Boots', price: 139.5, category: 'Footwear', rating: 5, thumbnail: 'https://picsum.photos/seed/hikingboots/400/400' },
  { name: 'Everyday Flip Flops', price: 12.99, category: 'Footwear', rating: 2, thumbnail: 'https://picsum.photos/seed/flipflops/400/400' },
  { name: 'Studio Dance Sneakers', price: 69.99, category: 'Footwear', rating: 4, thumbnail: 'https://picsum.photos/seed/dancesneakers/400/400' },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    console.log('Existing products cleared.');

    const inserted = await Product.insertMany(products);
    console.log(`Successfully seeded ${inserted.length} products.`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
