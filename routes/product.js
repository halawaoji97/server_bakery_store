const router = require('express').Router();
const productController = require('../controllers/product');
const { uploadSingle } = require('../middleware/multer');

router.get('/product', productController.getProduct);
router.post('/product', uploadSingle, productController.addProduct);
router.delete('/product/:id', productController.deleteProduct);
router.put('/product/:id', uploadSingle, productController.updateProduct);
router.get('/product/find/:id', productController.findProduct);

module.exports = router;
