const mongoose=require('mongoose');
const deliveryAgentSchema=new mongoose.Schema({
    name:{type:String,required:true},
    phone:{type:String,required:true,unique:true},
    vehicleType:{type:String},
    location:{
        lat:{type:Number,defualt:0},
        lon:{type:Number,default:0}
    },
    status:{
        type:String,
        enum:['Available','Busy','Offline'],
        default:'Available'
    },
    exchange:{
        withAgentId:{type:String,defualt:null},
        orderId:{type:String,default:null},
        status: {
            type: String,
            enum: ['Pending', 'Accepted', 'Declined', null],
            default: null
          }
    }
}, { timestamps: true });
module.exports=mongoose.model('DeliveryAgent',deliveryAgentSchema);
