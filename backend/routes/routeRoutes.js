const express=require('express');
const {getRoute}=require('../controllers/routeController');
const router=express.Router();
//route for calculating the shortest path
router.get('/',getRoute);
module.exports=router;