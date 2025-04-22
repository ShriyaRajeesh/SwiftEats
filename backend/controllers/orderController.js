const Order=require('../models/order');

//place a new order
exports.placeOrder=async(req,res) =>{
    try{
        const newOrder=new Order(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);

    }catch (err) {
        res.status(500).json({ error: err.message });
      }
};
//view order by users
exports.getUserOrders=async(req,res)=>{
    try{
        const orders=await Order.find({userId:req.params.userId});
        res.json(orders)
    }catch (err) {
        res.status(500).json({ error: err.message });
      }
};
//assign a delivery agent patch req like
exports.assignDeliveryAgent=async(req,res)=>{
    try{
        const updated=await Order.findByIdAndUpdate(
            req.params.id,
            {deliveryAgentId:req.body.deliveryAgentId},
            {new:true}
        );
        res.json(updated);

    }catch (err) {
        res.status(500).json({ error: err.message });
      }
};
//update order status 
exports.updateOrderStatus=async(req,res)=>{
    try{
        const updated=await Order.findByIdAndUpdate(
            req.params.id,
            {status:req.body.status},
            {new:true}
        );
        res.json(updated);

    }catch (err) {
    res.status(500).json({ error: err.message });
  }
};


