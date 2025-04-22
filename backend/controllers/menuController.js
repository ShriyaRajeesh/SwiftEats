const MenuItem=require('../models/MenuItem');
exports.addMenuItem=async(req,res)=>{
    try{
        const menuItem=new MenuItem(req.body);
        await menuItem.save();
        res.status(201).json(menuItem);

    }
catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getMenuByRestaurant=async(req,res)=>{
    try{
        const items=await MenuItem.find({restaurant:req.params.restaurantId});
        res.json(items);

    }
    catch(err){
        res.status(500).json({ error: err.message });

    }
};
