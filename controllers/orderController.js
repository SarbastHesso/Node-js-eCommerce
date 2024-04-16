const router = require('express').Router();
const orderModel = require('../models/order/orderModel');
const auth = require('../authentication/auth');


router.post('/',auth.verifyToken, orderModel.createOrder);
router.get('/myOrders',auth.verifyToken, orderModel.getOrders);
router.get('/:id',auth.verifyToken, orderModel.getOneorder);
router.patch('/:id',auth.verifyToken, orderModel.updatePayment);
router.get('/',auth.verifyToken, auth.verifyAdminToken, orderModel.getAllOrders);
router.patch('/:id/complete',auth.verifyToken, auth.verifyAdminToken, orderModel.updateToCompleted);


module.exports = router;