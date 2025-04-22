const mongoose=require('mongoose');
const menuItemSchema=new mongoose.Schema({
    restaurant:{type:mongoose.Schema.Types.ObjectId,ref:'Restaurant'/*forign key*/, required:true},
    name:{type:String,required:true},
    price:{type:Number,required:true},
    description:String,
    image:String
},{timestamps:true});
module.exports=mongoose.model('MenuItem',menuItemSchema);
