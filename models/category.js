const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  productId: [
    {
      type: ObjectId,
      ref: 'Product',
    },
  ],
});

module.exports = mongoose.model('Category', categorySchema);
