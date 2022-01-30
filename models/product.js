const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  weight: {
    type: String,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  categoryId: {
    type: ObjectId,
    ref: 'Category',
  },
});

module.exports = mongoose.model('Product', ProductSchema);
