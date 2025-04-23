const Restaurant=require('../models/Restaurant');
exports.addRestaurant = async (req, res) => {
    try {
      const { restaurantId } = req.body;
      // Check if restaurantId already exists
      const existingRestaurant = await Restaurant.findOne({ restaurantId });
      if (existingRestaurant) {
        return res.status(400).json({ error: "Restaurant ID already exists" });
      }
  
      const newRestaurant = new Restaurant(req.body);
      await newRestaurant.save();
      res.status(201).json(newRestaurant);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
        
    
    exports.getRestaurant=async(req,res)=>{
        try{
            const restaurants=await Restaurant.find();
            res.json(restaurants);

        } catch(err){
            res.status(500).json({ error: err.message });
            
        }

    };

    exports.getRestaurantById = async (req, res) => {
      try {
        const restaurant = await Restaurant.findOne({ restaurantId: req.params.restaurantId });
        if (!restaurant) {
          return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.json(restaurant);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
    

