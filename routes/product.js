const router = require('express').Router();
const productController = require('../controllers/product');

router.get('/product', productController.getProduct);
router.post('/product', productController.addProduct);

module.exports = router;
