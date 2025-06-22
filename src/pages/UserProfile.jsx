import { useState } from 'react';
import { motion } from 'framer-motion';

export default function UserProfile() {
  // Demo user data
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    joinedDate: '2023-01-15',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    orders: [
      { id: 1, date: '2024-05-01', total: 299.99, status: 'Delivered', items: 3 },
      { id: 2, date: '2024-06-15', total: 89.99, status: 'Processing', items: 1 },
      { id: 3, date: '2024-06-22', total: 149.99, status: 'Shipped', items: 2 },
    ],
    addresses: [
      { id: 1, name: 'Home', street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'USA', isDefault: true },
      { id: 2, name: 'Work', street: '456 Business Ave', city: 'Brooklyn', state: 'NY', zip: '11201', country: 'USA', isDefault: false },
    ],
    paymentMethods: [
      { id: 1, type: 'Visa', last4: '1234', expiry: '12/25', isDefault: true },
      { id: 2, type: 'Mastercard', last4: '5678', expiry: '08/24', isDefault: false },
    ],
    preferences: {
      newsletter: true,
      smsNotifications: false,
      darkMode: false
    }
  });
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState({...user});
  
  const handleEdit = () => {
    setIsEditing(true);
    setTempUser({...user});
  };
  
  const handleSave = () => {
    setUser(tempUser);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTempUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleAddressChange = (id, field, value) => {
    setTempUser(prev => ({
      ...prev,
      addresses: prev.addresses.map(address => 
        address.id === id ? {...address, [field]: value} : address
      )
    }));
  };
  
  const setDefaultAddress = (id) => {
    setTempUser(prev => ({
      ...prev,
      addresses: prev.addresses.map(address => 
        ({...address, isDefault: address.id === id})
      )
    }));
  };
  
  const setDefaultPayment = (id) => {
    setTempUser(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map(payment => 
        ({...payment, isDefault: payment.id === id})
      )
    }));
  };
  
  const statusColors = {
    'Delivered': 'bg-green-100 text-green-800',
    'Processing': 'bg-yellow-100 text-yellow-800',
    'Shipped': 'bg-blue-100 text-blue-800',
    'Cancelled': 'bg-red-100 text-red-800'
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-16 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full blur-[100px] opacity-30 -z-10"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full blur-[100px] opacity-30 -z-10"></div>
      
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="flex flex-col md:flex-row gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sticky top-8">
              {/* Profile header */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg mx-auto">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
                <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Member since {new Date(user.joinedDate).toLocaleDateString()}</p>
              </div>
              
              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                  { id: 'orders', label: 'Orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
                  { id: 'settings', label: 'Account Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
                  { id: 'addresses', label: 'Addresses', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
                  { id: 'payments', label: 'Payment Methods', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
                  { id: 'preferences', label: 'Preferences', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all ${
                      activeTab === item.id 
                        ? 'bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-400 font-semibold' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="w-full md:w-3/4">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Account Overview</h2>
                    <button 
                      onClick={handleEdit}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Profile
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-indigo-50 dark:bg-gray-700 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Personal Information</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                          <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                          <p className="font-medium text-gray-800 dark:text-white">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                          <p className="font-medium text-gray-800 dark:text-white">{user.phone}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-indigo-50 dark:bg-gray-700 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Account Statistics</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Total Orders</span>
                          <span className="font-semibold">{user.orders.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Total Spent</span>
                          <span className="font-semibold">${user.orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Member Since</span>
                          <span className="font-semibold">{new Date(user.joinedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recent Orders */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Recent Orders</h2>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Order ID</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Date</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Items</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Total</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {user.orders.slice(0, 3).map(order => (
                          <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="py-3 px-4 font-medium">#{order.id}</td>
                            <td className="py-3 px-4">{new Date(order.date).toLocaleDateString()}</td>
                            <td className="py-3 px-4">{order.items}</td>
                            <td className="py-3 px-4 font-semibold">${order.total.toFixed(2)}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Order History</h2>
                
                {user.orders.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-6" />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Orders Yet</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">You haven't placed any orders yet.</p>
                    <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {user.orders.map(order => (
                      <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                        <div className="flex flex-wrap justify-between items-center bg-gray-50 dark:bg-gray-700 p-4">
                          <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Order #</span>
                            <span className="font-semibold">{order.id}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Date: </span>
                            <span>{new Date(order.date).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Total: </span>
                            <span className="font-semibold">${order.total.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between">
                            <button className="text-indigo-600 dark:text-indigo-400 hover:underline">View Details</button>
                            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                              Reorder
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Account Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Account Settings</h2>
                
                {isEditing ? (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={tempUser.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={tempUser.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={tempUser.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-4">
                      <button 
                        onClick={handleCancel}
                        className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-indigo-50 dark:bg-gray-700 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Personal Information</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                            <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
                          </div>
                          <button className="text-indigo-600 dark:text-indigo-400 hover:underline" onClick={handleEdit}>
                            Edit
                          </button>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                          <p className="font-medium text-gray-800 dark:text-white">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                          <p className="font-medium text-gray-800 dark:text-white">{user.phone}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-indigo-50 dark:bg-gray-700 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Password & Security</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Password</p>
                            <p className="font-medium text-gray-800 dark:text-white">••••••••</p>
                          </div>
                          <button className="text-indigo-600 dark:text-indigo-400 hover:underline" onClick={handleEdit}>
                            Change
                          </button>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Two-Factor Authentication</p>
                          <p className="font-medium text-gray-800 dark:text-white">Not enabled</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Saved Addresses</h2>
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:bg-gradient-to-r hover:from-indigo-700 hover:to-purple-700 transition-all">
                    + Add New Address
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tempUser.addresses.map(address => (
                    <div 
                      key={address.id} 
                      className={`border rounded-2xl p-6 relative ${
                        address.isDefault 
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-gray-700' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      {address.isDefault && (
                        <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{address.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{address.street}</p>
                      <p className="text-gray-600 dark:text-gray-300">{address.city}, {address.state} {address.zip}</p>
                      <p className="text-gray-600 dark:text-gray-300">{address.country}</p>
                      
                      <div className="flex justify-end gap-3 mt-6">
                        <button 
                          onClick={() => setDefaultAddress(address.id)}
                          className={`text-sm ${
                            address.isDefault 
                              ? 'text-indigo-600 dark:text-indigo-400' 
                              : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                          }`}
                        >
                          {address.isDefault ? 'Default Address' : 'Set as Default'}
                        </button>
                        <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                          Edit
                        </button>
                        <button className="text-sm text-red-600 hover:text-red-800">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Payment Methods Tab */}
            {activeTab === 'payments' && (
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Payment Methods</h2>
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:bg-gradient-to-r hover:from-indigo-700 hover:to-purple-700 transition-all">
                    + Add New Card
                  </button>
                </div>
                
                <div className="space-y-6">
                  {tempUser.paymentMethods.map(payment => (
                    <div 
                      key={payment.id} 
                      className={`border rounded-2xl p-6 relative ${
                        payment.isDefault 
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-gray-700' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      {payment.isDefault && (
                        <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-8 mr-4" />
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white">{payment.type} ending in {payment.last4}</h3>
                          <p className="text-gray-600 dark:text-gray-300">Expires {payment.expiry}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-3 mt-4">
                        <button 
                          onClick={() => setDefaultPayment(payment.id)}
                          className={`text-sm ${
                            payment.isDefault 
                              ? 'text-indigo-600 dark:text-indigo-400' 
                              : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                          }`}
                        >
                          {payment.isDefault ? 'Default Payment' : 'Set as Default'}
                        </button>
                        <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                          Edit
                        </button>
                        <button className="text-sm text-red-600 hover:text-red-800">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Preferences</h2>
                
                <div className="space-y-8">
                  <div className="bg-indigo-50 dark:bg-gray-700 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Communication Preferences</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">Email Newsletter</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Receive updates, offers, and promotions</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            name="newsletter"
                            checked={tempUser.preferences.newsletter}
                            onChange={handleInputChange}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">SMS Notifications</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Receive order updates via SMS</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            name="smsNotifications"
                            checked={tempUser.preferences.smsNotifications}
                            onChange={handleInputChange}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 dark:bg-gray-700 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Display Preferences</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">Dark Mode</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Toggle between light and dark themes</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            name="darkMode"
                            checked={tempUser.preferences.darkMode}
                            onChange={handleInputChange}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      onClick={handleSave}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}