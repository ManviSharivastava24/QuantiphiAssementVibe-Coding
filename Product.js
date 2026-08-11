const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: {
        values: ['Electronics', 'Apparel', 'Footwear'],
        message: '{VALUE} is not a supported category',
      },
    },
    rating: {
      type: Number,
      required: [true, 'Product rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    thumbnail: {
      type: String,
      required: [true, 'Product thumbnail URL is required'],
    },
  },
  { timestamps: true }
);

// Indexes to speed up the most common filter fields
ProductSchema.index({ category: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ rating: 1 });

module.exports = mongoose.model('Product', ProductSchema);
