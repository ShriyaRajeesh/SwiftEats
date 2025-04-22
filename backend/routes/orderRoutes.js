const express=require('express');
const router=express.Router();
const orderController=require('../controllers/orderController');
router.post('/',orderController.placeOrder);

router.get('/user/:userId',orderController.getUserOrders);
router.patch('/:id/assign',orderController.assignDeliveryAgent);
router.patch('/:id/status',orderController.updateOrderStatus);
module.exports=router;
