import { useState, useEffect } from 'react';
import api from '../../services/api';

const AdminAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAgents: 0,
    activeAgents: 0,
    averageRating: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentsRes, statsRes] = await Promise.all([
          api.get('/admin/agents'),
          api.get('/admin/agents/stats')
        ]);
        setAgents(agentsRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleAgentStatus = async (agentId, currentStatus) => {
    try {
      await api.patch(`/admin/agents/${agentId}`, { active: !currentStatus });
      setAgents(agents.map(agent => 
        agent._id === agentId ? { ...agent, active: !currentStatus } : agent
      ));
    } catch (error) {
      console.error('Error updating agent:', error);
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
      <h1 className="text-2xl font-bold text-white mb-6">Delivery Agents</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#222222] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#1DCD9F] mb-2">Total Agents</h3>
          <p className="text-4xl font-bold text-white">{stats.totalAgents}</p>
        </div>
        <div className="bg-[#222222] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#1DCD9F] mb-2">Active Agents</h3>
          <p className="text-4xl font-bold text-white">{stats.activeAgents}</p>
        </div>
        <div className="bg-[#222222] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#1DCD9F] mb-2">Avg. Rating</h3>
          <div className="flex items-center">
            <span className="text-4xl font-bold text-white mr-2">{stats.averageRating.toFixed(1)}</span>
            <div className="text-yellow-400">★★★★★</div>
          </div>
        </div>
      </div>

      {/* Agents Table */}
      <div className="bg-[#222222] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#1DCD9F]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Agent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Completed Deliveries</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#444444]">
              {agents.map(agent => (
                <tr key={agent._id} className="hover:bg-[#333333]">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#444444] flex items-center justify-center">
                        <span className="text-white">{agent.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-white">{agent.name}</div>
                        <div className="text-gray-400 text-sm">{agent.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {agent.completedDeliveries || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-2">{"★".repeat(Math.round(agent.rating || 0))}</span>
                      <span className="text-white">({agent.rating?.toFixed(1) || '0.0'})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${agent.active ? 'bg-green-500' : 'bg-red-500'}`}>
                      {agent.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-[#1DCD9F] hover:text-[#169976] mr-3">
                      View
                    </button>
                    <button 
                      onClick={() => toggleAgentStatus(agent._id, agent.active)}
                      className={`${agent.active ? 'text-red-500 hover:text-red-400' : 'text-green-500 hover:text-green-400'}`}
                    >
                      {agent.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAgents;