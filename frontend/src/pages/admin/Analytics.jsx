import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../../services/api';


const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    ordersData: [],
    deliveryMetrics: {},
    userStats: {}
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get('/admin/analytics');
        setAnalyticsData(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DCD9F]"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Orders Summary Card */}
        <div className="bg-[#222222] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#1DCD9F] mb-4">Orders Overview</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-400">Today</p>
              <p className="text-2xl font-bold text-white">{analyticsData.deliveryMetrics.todayOrders || 0}</p>
            </div>
            <div>
              <p className="text-gray-400">This Week</p>
              <p className="text-2xl font-bold text-white">{analyticsData.deliveryMetrics.weekOrders || 0}</p>
            </div>
            <div>
              <p className="text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-white">{analyticsData.deliveryMetrics.monthOrders || 0}</p>
            </div>
          </div>
        </div>

        {/* Delivery Metrics Card */}
        <div className="bg-[#222222] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#1DCD9F] mb-4">Delivery Performance</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-400">Avg. Time</p>
              <p className="text-2xl font-bold text-white">
                {analyticsData.deliveryMetrics.avgDeliveryTime || 0} min
              </p>
            </div>
            <div>
              <p className="text-gray-400">On Time %</p>
              <p className="text-2xl font-bold text-white">
                {analyticsData.deliveryMetrics.onTimePercentage || 0}%
              </p>
            </div>
            <div>
              <p className="text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-white">
                {analyticsData.deliveryMetrics.successRate || 0}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Chart */}
      <div className="bg-[#222222] rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#1DCD9F] mb-4">Orders Last 14 Days</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData.ordersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
              <XAxis dataKey="date" stroke="#EDEDED" />
              <YAxis stroke="#EDEDED" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#222222', borderColor: '#444444' }}
                itemStyle={{ color: '#EDEDED' }}
              />
              <Legend />
              <Bar dataKey="orders" fill="#1DCD9F" name="Orders" />
              <Bar dataKey="deliveries" fill="#169976" name="Completed Deliveries" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#222222] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#1DCD9F] mb-4">Total Users</h3>
          <p className="text-4xl font-bold text-white">
            {analyticsData.userStats.totalUsers || 0}
          </p>
          <div className="mt-4">
            <p className="text-gray-400">Customers: {analyticsData.userStats.totalCustomers || 0}</p>
            <p className="text-gray-400">Agents: {analyticsData.userStats.totalAgents || 0}</p>
            <p className="text-gray-400">Admins: {analyticsData.userStats.totalAdmins || 0}</p>
          </div>
        </div>

        <div className="bg-[#222222] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#1DCD9F] mb-4">New Users (7d)</h3>
          <p className="text-4xl font-bold text-white">
            {analyticsData.userStats.newUsers || 0}
          </p>
          <div className="mt-4">
            <p className="text-gray-400">Customers: {analyticsData.userStats.newCustomers || 0}</p>
            <p className="text-gray-400">Agents: {analyticsData.userStats.newAgents || 0}</p>
          </div>
        </div>

        <div className="bg-[#222222] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#1DCD9F] mb-4">Active Users</h3>
          <p className="text-4xl font-bold text-white">
            {analyticsData.userStats.activeUsers || 0}
          </p>
          <div className="mt-4">
            <p className="text-gray-400">Today: {analyticsData.userStats.activeToday || 0}</p>
            <p className="text-gray-400">This Week: {analyticsData.userStats.activeThisWeek || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;