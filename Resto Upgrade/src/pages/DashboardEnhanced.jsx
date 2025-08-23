import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  Star,
  Package,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  Search
} from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardEnhanced = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data - replace with API calls
  const sampleData = {
    overview: {
      totalRevenue: 125000,
      totalOrders: 342,
      totalCustomers: 89,
      averageOrderValue: 365,
      revenueGrowth: 12.5,
      orderGrowth: 8.3,
      customerGrowth: 15.2,
      avgOrderGrowth: 5.7
    },
    recentOrders: [
      {
        id: 'ORD-001',
        customer: 'Amara Perera',
        items: ['Chicken Kottu', 'Fresh Juice'],
        total: 1250,
        status: 'preparing',
        time: '10 mins ago',
        delivery: 'pickup'
      },
      {
        id: 'ORD-002',
        customer: 'Kasun Silva',
        items: ['Fried Rice', 'Egg Hoppers'],
        total: 1400,
        status: 'ready',
        time: '15 mins ago',
        delivery: 'delivery'
      },
      {
        id: 'ORD-003',
        customer: 'Nimali Fernando',
        items: ['String Hoppers', 'Milk Rice'],
        total: 1500,
        status: 'delivered',
        time: '25 mins ago',
        delivery: 'delivery'
      }
    ],
    popularItems: [
      { name: 'Chicken Kottu', orders: 45, revenue: 42750 },
      { name: 'Fried Rice', orders: 38, revenue: 45600 },
      { name: 'Egg Hoppers', orders: 62, revenue: 12400 },
      { name: 'String Hoppers', orders: 28, revenue: 22400 }
    ]
  };

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setOrders(sampleData.recentOrders);
      setMenuItems(sampleData.popularItems);
      setAnalytics(sampleData.overview);
      setLoading(false);
    }, 1000);
  }, []);

  // Chart data
  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (LKR)',
        data: [85000, 92000, 98000, 105000, 115000, 125000],
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const ordersChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Orders',
        data: [45, 52, 48, 61, 55, 67, 73],
        backgroundColor: 'rgba(249, 115, 22, 0.8)',
        borderRadius: 8
      }
    ]
  };

  const orderStatusData = {
    labels: ['Preparing', 'Ready', 'Delivered', 'Cancelled'],
    datasets: [
      {
        data: [25, 15, 55, 5],
        backgroundColor: [
          '#fbbf24',
          '#10b981',
          '#3b82f6',
          '#ef4444'
        ],
        borderWidth: 0
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const StatCard = ({ title, value, icon: Icon, growth, prefix = '', suffix = '' }) => (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">
            {prefix}{value?.toLocaleString()}{suffix}
          </p>
          {growth && (
            <p className={`text-sm mt-2 flex items-center gap-1 ${
              growth > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="w-4 h-4" />
              {growth > 0 ? '+' : ''}{growth}%
            </p>
          )}
        </div>
        <div className="bg-orange-100 p-3 rounded-2xl">
          <Icon className="w-8 h-8 text-orange-600" />
        </div>
      </div>
    </motion.div>
  );

  const OrderCard = ({ order }) => (
    <motion.div
      className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-bold text-gray-800">{order.id}</h4>
          <p className="text-sm text-gray-600">{order.customer}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
          order.status === 'ready' ? 'bg-blue-100 text-blue-800' :
          order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-700">
          {order.items.join(', ')}
        </p>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="font-bold text-orange-600">LKR {order.total}</span>
        <div className="flex items-center gap-2 text-gray-500">
          <Clock className="w-4 h-4" />
          {order.time}
        </div>
      </div>
    </motion.div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'menu', label: 'Menu', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your restaurant.</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap font-medium transition-colors duration-300 ${
                    activeTab === tab.id
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value={analytics.totalRevenue}
                icon={DollarSign}
                growth={analytics.revenueGrowth}
                prefix="LKR "
              />
              <StatCard
                title="Total Orders"
                value={analytics.totalOrders}
                icon={ShoppingCart}
                growth={analytics.orderGrowth}
              />
              <StatCard
                title="Total Customers"
                value={analytics.totalCustomers}
                icon={Users}
                growth={analytics.customerGrowth}
              />
              <StatCard
                title="Avg Order Value"
                value={analytics.averageOrderValue}
                icon={TrendingUp}
                growth={analytics.avgOrderGrowth}
                prefix="LKR "
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Revenue Chart */}
              <motion.div
                className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue Trend</h3>
                <Line data={revenueChartData} options={chartOptions} />
              </motion.div>

              {/* Order Status */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4">Order Status</h3>
                <Doughnut data={orderStatusData} options={{ responsive: true }} />
              </motion.div>
            </div>

            {/* Recent Orders & Popular Items */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
                  <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              </motion.div>

              {/* Popular Items */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-6">Popular Items</h3>
                <div className="space-y-4">
                  {menuItems.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.orders} orders</p>
                        </div>
                      </div>
                      <p className="font-bold text-orange-600">LKR {item.revenue.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Orders Header */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex-1 w-full lg:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="delivered">Delivered</option>
                  </select>
                  <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Order ID</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Customer</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Items</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Total</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Time</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{order.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{order.customer}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{order.items.join(', ')}</td>
                        <td className="px-6 py-4 text-sm font-medium text-orange-600">LKR {order.total}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'ready' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{order.time}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-700">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-700">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Weekly Orders Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Weekly Orders</h3>
              <Bar data={ordersChartData} options={chartOptions} />
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">4.8</div>
                <div className="text-gray-600">Average Rating</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">18 min</div>
                <div className="text-gray-600">Avg Prep Time</div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">96%</div>
                <div className="text-gray-600">Customer Satisfaction</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardEnhanced;
