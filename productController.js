const Product = require('../models/Product');

const VALID_CATEGORIES = ['Electronics', 'Apparel', 'Footwear'];
const VALID_SORTS = ['price_low_high', 'top_rated'];

/**
 * Parses and validates raw query params into a clean, typed filter object.
 * Any malformed / out-of-range value is safely dropped rather than throwing,
 * so the API degrades gracefully instead of 500-ing on bad input.
 */
function parseFilterParams(query) {
  const filters = {
    categories: [],
    minPrice: null,
    maxPrice: null,
    minRating: null,
    sortBy: null,
  };

  // --- Categories ---
  if (query.categories) {
    const raw = Array.isArray(query.categories)
      ? query.categories
      : String(query.categories).split(',');
    filters.categories = raw
      .map((c) => c.trim())
      .filter((c) => VALID_CATEGORIES.includes(c));
  }

  // --- Price boundaries ---
  if (query.minPrice !== undefined && query.minPrice !== '') {
    const val = Number(query.minPrice);
    if (!Number.isNaN(val) && val >= 0) filters.minPrice = val;
  }
  if (query.maxPrice !== undefined && query.maxPrice !== '') {
    const val = Number(query.maxPrice);
    if (!Number.isNaN(val) && val >= 0) filters.maxPrice = val;
  }
  // Guard against an inverted range (e.g. minPrice=500 & maxPrice=10)
  if (
    filters.minPrice !== null &&
    filters.maxPrice !== null &&
    filters.minPrice > filters.maxPrice
  ) {
    // Swap so the range is always logically valid
    [filters.minPrice, filters.maxPrice] = [filters.maxPrice, filters.minPrice];
  }

  // --- Rating ---
  if (query.minRating !== undefined && query.minRating !== '') {
    const val = Number(query.minRating);
    if (!Number.isNaN(val) && val >= 1 && val <= 5) filters.minRating = val;
  }

  // --- Sort ---
  if (query.sortBy && VALID_SORTS.includes(query.sortBy)) {
    filters.sortBy = query.sortBy;
  }

  return filters;
}

/**
 * Builds a Mongo query object that intersects (logical AND) every active
 * filter criterion. Any criterion that is null/empty is simply omitted,
 * which causes Mongo to bypass that reduction — satisfying the
 * "graceful null handling / return full inventory" requirement.
 */
function buildMongoFilterQuery(filters) {
  const mongoQuery = {};

  if (filters.categories.length > 0) {
    mongoQuery.category = { $in: filters.categories };
  }

  if (filters.minPrice !== null || filters.maxPrice !== null) {
    mongoQuery.price = {};
    if (filters.minPrice !== null) mongoQuery.price.$gte = filters.minPrice;
    if (filters.maxPrice !== null) mongoQuery.price.$lte = filters.maxPrice;
  }

  if (filters.minRating !== null) {
    mongoQuery.rating = { $gte: filters.minRating };
  }

  return mongoQuery;
}

/**
 * Maps a validated sortBy key to a Mongoose-compatible sort object.
 * Defaults to newest-first when no valid sort is supplied.
 */
function resolveSortOrder(sortBy) {
  switch (sortBy) {
    case 'price_low_high':
      return { price: 1 };
    case 'top_rated':
      return { rating: -1, price: 1 }; // tie-break by price ascending
    default:
      return { createdAt: -1 };
  }
}

/**
 * GET /api/products
 * Combinatorial intersect filtering: a product is only returned if it
 * satisfies ALL active criteria simultaneously (category AND price range
 * AND minimum rating). All computation happens here, server-side.
 */
async function getProducts(req, res) {
  try {
    const filters = parseFilterParams(req.query);
    const mongoQuery = buildMongoFilterQuery(filters);
    const sortOrder = resolveSortOrder(filters.sortBy);

    const products = await Product.find(mongoQuery).sort(sortOrder).lean();

    return res.status(200).json({
      success: true,
      count: products.length,
      appliedFilters: filters,
      data: products,
    });
  } catch (error) {
    console.error('Error in getProducts:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching products. Please try again.',
    });
  }
}

/**
 * GET /api/products/categories
 * Convenience endpoint returning the distinct category list, so the
 * frontend never has to hardcode filter options.
 */
async function getCategories(req, res) {
  try {
    return res.status(200).json({ success: true, data: VALID_CATEGORIES });
  } catch (error) {
    console.error('Error in getCategories:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching categories.',
    });
  }
}

module.exports = {
  getProducts,
  getCategories,
  // exported for unit testing
  parseFilterParams,
  buildMongoFilterQuery,
  resolveSortOrder,
};
