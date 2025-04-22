const express=require('express');
const router=express.Router();
//creates and instance of an express router
//a router helps you group route handlers by functionality-here for restaurants
const {addRestaurant,getRestaurant}=require('../controllers/restaurantController')
//Route:/api/restaurants
router.post('/',addRestaurant);
router.get('/',getRestaurant);
module.exports=router;

