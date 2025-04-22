const DeliveryAgent=require('../models/DeliveryAgent');
//Registe or update agent
exports.registerOrUpdateAgent=async(req,res)=>{
    try{
        const {phone}=req.body;
        const existing =await DeliveryAgent.findOneAndUpdate({phone},req.body,{new:true,upsert:true});
        res.json(existing);

    }catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//update location
exports.updateLocation=async(req,res)=>{
    try{
        const {id} =req.params;
        const {lat,lon}=req.body;
        const updated=await DeliveryAgent.findByIdAndUpdate(id,{location:{lat,lon}},{new:true});
        res.json(updated);


    }catch (err) {
    res.status(500).json({ error: err.message });
  }

};
//update availability status
exports.updateStatus =async(req,res)=>{
    try{
        const {id}=req.params;
        const {status}=req.body;
        const updated=await DeliveryAgent.findByIdAndUpdate(id,{status},{new:true});
        res.json(updated);


    }catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//request exchange
exports.requestExchange=async(req,res)=>{
    try{
        const { id } = req.params;
        const { withAgentId, orderId } = req.body;
    
        const updated = await DeliveryAgent.findByIdAndUpdate(id, {
          exchange: { withAgentId, orderId, status: 'Pending' }
        }, { new: true });
    
        await DeliveryAgent.findByIdAndUpdate(withAgentId, {
          exchange: { withAgentId: id, orderId, status: 'Pending' }
        });
    
        res.json(updated);
        

    }catch (err) {
        res.status(500).json({ error: err.message });
}
};
// Respond to exchange
exports.respondToExchange = async (req, res) => {
    try {
      const { id } = req.params;
      const { response } = req.body; // 'Accepted' or 'Declined'
  
      const agent = await DeliveryAgent.findById(id);
      if (!agent.exchange.withAgentId) return res.status(400).json({ error: "No exchange pending" });
  
      const withAgentId = agent.exchange.withAgentId;
  
      await DeliveryAgent.findByIdAndUpdate(id, {
        "exchange.status": response
      });
  
      await DeliveryAgent.findByIdAndUpdate(withAgentId, {
        "exchange.status": response
      });
  
      res.json({ message: `Exchange ${response.toLowerCase()}` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };



