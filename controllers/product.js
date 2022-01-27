const Category = require('../models/category');
const Product = require('../models/product');

module.exports = {
  getProduct: async (req, res) => {
    try {
      const products = await Product.find().populate({
        path: 'categoryId',
        select: 'id name',
      });

      res.status(200).json(products);
    } catch (error) {
      res.status(404).json(error.message);
    }
  },

  addProduct: async (req, res) => {
    const { categoryId, title, price, description, size, weight } = req.body;
    try {
      const category = await Category.findOne({ _id: categoryId });
      const newProduct = {
        categoryId: category._id,
        title,
        price,
        description,
        size,
        weight,
      };

      const product = await Product.create(newProduct);

      category.productId.push({ _id: product._id });

      res.status(201).json(product);
    } catch (error) {
      res.status(404).json(error.message);
    }
  },
};
