const express=require('express');
const router=express.Router();
const deliveryAgentController=require('../controllers/deliveryAgentController');

router.post('/register',deliveryAgentController.registerOrUpdateAgent);
router.patch('/:id/location',deliveryAgentController.updateLocation);
router.patch('/:id/status',deliveryAgentController.updateStatus);
router.post('/:id/exchange',deliveryAgentController.requestExchange);
router.post('/:id/exchange/respond',deliveryAgentController.respondToExchange);
module.exports=router;
