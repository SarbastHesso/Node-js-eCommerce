const router = require('express').Router();
const productModel = require('../models/products/productModel');
const auth = require('../authentication/auth');

router.get('/', productModel.getProducts);
router.get('/:id', productModel.getOneProduct);
router.post('/new', auth.verifyToken, auth.verifyAdminToken, productModel.createProduct);
router.patch('/:id', auth.verifyToken, auth.verifyAdminToken, productModel.upduteProduct);
router.delete('/:id', auth.verifyToken, auth.verifyAdminToken, productModel.deleteProduct);





module.exports = router;