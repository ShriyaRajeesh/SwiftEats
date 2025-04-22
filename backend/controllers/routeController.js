const Restaurant=require('../models/Restaurant');
//function to fetch restaurants and create the graph
async function createGraph(){
    const restaurants=await Restaurant.find();
    const graph=new Map();
    //build the graph dynamically from mongodb
    //nested loop(i-j)
    restaurants.forEach(restaurant=>{
        const neighbors=new Map();
        restaurants.forEach(nearByRestaurant=>{
            if(restaurant.restaurantId!=nearByRestaurant.restaurantId){
                //dummy distance for now
                const distance=40;
                neighbors.set(nearByRestaurant.name,distance);

            }
        });
        graph.set(restaurant.name,neighbors);

    });
    return graph;

}
//priorityqueue class to manage nodes with priority(distance)
class PriorityQueue{
    constructor(){
        this.queue=[];

    }
    enqueue(value,priority){
        this.queue.push({value,priority});
        this.queue.sort((a,b)=> a.priority-b.priority);//sort by priority

    }
    dequeue(){
        return this.queue.shift();//remove and return the node with highest priority
    }
    isEmpty(){
        return this.queue.length === 0;

         
    }
}
// Dijkstra's Algorithm to find the shortest path
async function dijkstra(start, end) {
    const graph = await createGraph();
  
    const distances = {};
    const previous = {};
    const nodes = new PriorityQueue();
  
    // Initialize distances and previous node maps
    for (let node of graph.keys()) {
      distances[node] = node === start ? 0 : Infinity;
      previous[node] = null;
      nodes.enqueue(node, distances[node]);
    }
  
    while (!nodes.isEmpty()) {
      const currentNode = nodes.dequeue().value;
      
      // If we reach the end, stop early
      if (currentNode === end) break;
  
      for (let [neighbor, distance] of graph.get(currentNode)) {
        const alt = distances[currentNode] + distance;
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = currentNode;
          nodes.enqueue(neighbor, distances[neighbor]);
        }
      }
    }
  
    // Reconstruct the shortest path
    const path = [];
    let temp = end;
    while (temp) {
      path.unshift(temp);
      temp = previous[temp];
    }
    return path.length ? path : null;
  }
  
  // API handler to get the route
  const getRoute = async (req, res) => {
    const { from, to } = req.query;
    
    if (!from || !to) {
      return res.status(400).send("Both 'from' and 'to' locations must be provided.");
    }
  
    // Call Dijkstra's algorithm to get the shortest path
    const path = await dijkstra(from, to);
  
    if (!path) {
      return res.status(404).send("No path found.");
    }
  
    return res.json({ path });
  };
  
  module.exports = { getRoute };
  
