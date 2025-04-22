const mongoose=require('mongoose');
const orderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    restaurantId:{type:String,required:true},
    items:[{name:String,quantity:Number}],
    status:{
        type:String,
        enum:['Placed','Picked up','Exchanged','Delivered'],
        default:'Placed'
    },
    deliveryAgentId:{type:String,default:null}
},{timestamps:true});
module.exports=mongoose.model('Order',orderSchema);
