const express = require('express');
const router = express.Router();
const { getProducts, getCategories } = require('../controllers/productController');

// GET /api/products?categories=Electronics,Apparel&minPrice=10&maxPrice=200&minRating=3&sortBy=price_low_high
router.get('/', getProducts);

// GET /api/products/categories
router.get('/categories', getCategories);

module.exports = router;
