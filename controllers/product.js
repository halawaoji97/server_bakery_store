const Category = require('../models/category');
const Product = require('../models/product');
const path = require('path');
const fs = require('fs-extra');
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
    try {
      const { categoryId, title, price, description, size, weight } = req.body;
      const category = await Category.findOne({ _id: categoryId });
      const newProduct = {
        categoryId: category._id,
        title,
        price,
        description,
        size,
        weight,
        imageUrl: `images/${req.file.filename}`,
      };

      await Product.create(newProduct);

      res.status(201).json(newProduct);
    } catch (error) {
      res.status(404).json(error.message);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ _id: id });
      await fs.unlink(path.join(`public/${product.imageUrl}`));
      await product.remove();
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json(error.message);
    }
  },
  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { title, price, description, size, weight } = req.body;
    try {
      const product = await Product.findOne({ _id: id });

      if (req.file == undefined) {
        product.title = title;
        product.price = price;
        product.description = description;
        product.size = size;
        product.weight = weight;
        await product.save();

        res.status(200).json(product);
      } else {
        await fs.unlink(path.join(`public/${product.imageUrl}`));
        product.title = title;
        product.price = price;
        product.description = description;
        product.size = size;
        product.weight = weight;
        product.imageUrl = `images/${req.file.filename}`;
        await product.save();
        res.status(200).json(product);
      }
    } catch (error) {
      res.status(404).json(error.message);
    }
  },
  findProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
