import { useState, useEffect } from 'react';
import api from '../../services/api';

const AgentExchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New states for route functionality
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const response = await api.get('/exchanges');
        setExchanges(response.data);
      } catch (error) {
        console.error('Error fetching exchanges:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  // Function to handle route request
  const getRoute = async () => {
    if (!fromLocation || !toLocation) {
      alert("Please select both 'from' and 'to' locations.");
      return;
    }
    try {
      const response = await api.get(`/routes/route?from=${fromLocation}&to=${toLocation}`);
      setRoute(response.data.path);
    } catch (error) {
      console.error('Error fetching route:', error);
      alert("Couldn't fetch the route. Please try again.");
    }
  };

  const handleExchangeAction = async (exchangeId, action) => {
    try {
      await api.patch(`/exchanges/${exchangeId}`, { status: action });
      setExchanges(exchanges.map(ex =>
        ex._id === exchangeId ? { ...ex, status: action } : ex
      ));
    } catch (error) {
      console.error('Error updating exchange:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DCD9F]"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Package Exchanges</h1>
      
      <div className="space-y-4">
        {exchanges.length === 0 ? (
          <div className="bg-[#222222] rounded-lg p-8 text-center">
            <p className="text-gray-400">No package exchange requests</p>
          </div>
        ) : (
          exchanges.map(exchange => (
            <div key={exchange._id} className="bg-[#222222] rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">Exchange #{exchange.exchangeNumber}</h3>
                  <p className="text-gray-400">From: {exchange.fromAgent.name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  exchange.status === 'Pending' ? 'bg-yellow-500' :
                  exchange.status === 'Accepted' ? 'bg-green-500' :
                  exchange.status === 'Rejected' ? 'bg-red-500' :
                  'bg-gray-500'
                }`}>
                  {exchange.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Package Details</p>
                  <p className="text-white">{exchange.packageDescription}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Meeting Point</p>
                  <p className="text-white">{exchange.meetingPoint}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {exchange.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleExchangeAction(exchange._id, 'Accepted')}
                      className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white"
                    >
                      Accept Exchange
                    </button>
                    <button
                      onClick={() => handleExchangeAction(exchange._id, 'Rejected')}
                      className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                    >
                      Reject Exchange
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleExchangeAction(exchange._id, 'Completed')}
                  className={`px-3 py-1 rounded ${exchange.status === 'Completed' ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                  disabled={exchange.status === 'Completed' || exchange.status === 'Rejected'}
                >
                  Mark as Completed
                </button>
                <button className="px-3 py-1 rounded bg-[#1DCD9F] hover:bg-[#169976] text-white">
                  View on Map
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New section for Route */}
      <div className="mt-8 bg-[#222222] p-4 rounded-lg">
        <h2 className="text-xl text-white mb-4">Get Shortest Route</h2>

        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="From Location"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="To Location"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
          />
        </div>

        <button
          onClick={getRoute}
          className="px-4 py-2 rounded bg-[#1DCD9F] hover:bg-[#169976] text-white"
        >
          Get Route
        </button>

        {route && (
          <div className="mt-4">
            <h3 className="text-lg text-white">Route:</h3>
            <ul className="text-white">
              {route.map((location, index) => (
                <li key={index}>{location}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentExchanges;
