import React, { useEffect, useState } from 'react';
import {
  UserIcon,
  PackageIcon,
  HeartIcon,
  MapPinIcon,
  SettingsIcon,
  LogOutIcon,
  ChevronRightIcon } from
'lucide-react';
import { useStore } from '../context/StoreContext';
export function UserDashboard() {
  const { state, dispatch, formatPrice } = useStore();
  const [activeTab, setActiveTab] = useState('profile');
  // Redirect if not authenticated
  useEffect(() => {
    if (!state.isAuthenticated) {
      dispatch({
        type: 'SET_CURRENT_PAGE',
        payload: 'login'
      });
    }
  }, [state.isAuthenticated, dispatch]);
  if (!state.isAuthenticated || !state.user) return null;
  const tabs = [
  {
    id: 'profile',
    label: 'My Profile',
    icon: UserIcon
  },
  {
    id: 'orders',
    label: 'Order History',
    icon: PackageIcon
  },
  {
    id: 'wishlist',
    label: 'Wishlist',
    icon: HeartIcon
  },
  {
    id: 'addresses',
    label: 'Saved Addresses',
    icon: MapPinIcon
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: SettingsIcon
  }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={state.user.avatar}
                alt={state.user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-red-700" />
              
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white">
                  {state.user.name}
                </h2>
                <p className="text-sm text-gray-500">{state.user.email}</p>
              </div>
            </div>
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (tab.id === 'wishlist') {
                        dispatch({
                          type: 'SET_CURRENT_PAGE',
                          payload: 'wishlist'
                        });
                      } else {
                        setActiveTab(tab.id);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id && tab.id !== 'wishlist' ? 'bg-red-50 dark:bg-gray-800 text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      {tab.label}
                    </div>
                    <ChevronRightIcon
                      size={16}
                      className={
                      activeTab === tab.id ? 'opacity-100' : 'opacity-0'
                      } />
                    
                  </button>);

              })}
              <button
                onClick={() => {
                  dispatch({
                    type: 'LOGOUT'
                  });
                  dispatch({
                    type: 'SET_CURRENT_PAGE',
                    payload: 'home'
                  });
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-4">
                
                <LogOutIcon size={18} />
                Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 min-h-[500px]">
            {activeTab === 'profile' &&
            <div className="animate-fade-in">
                <h2 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-6">
                  Personal Information
                </h2>
                <form className="space-y-6 max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                      type="text"
                      defaultValue={state.user.name.split(' ')[0]}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-red-500" />
                    
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                      type="text"
                      defaultValue={state.user.name.split(' ')[1] || ''}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-red-500" />
                    
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                      type="email"
                      defaultValue={state.user.email}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-red-500" />
                    
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                      type="tel"
                      placeholder="+254 700 000 000"
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-red-500" />
                    
                    </div>
                  </div>
                  <button
                  type="button"
                  className="bg-red-700 text-white px-6 py-2.5 rounded-md font-medium hover:bg-red-800 transition-colors">
                  
                    Save Changes
                  </button>
                </form>
              </div>
            }

            {activeTab === 'orders' &&
            <div className="animate-fade-in">
                <h2 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-6">
                  Order History
                </h2>
                {state.orders.length === 0 ?
              <div className="text-center py-12">
                    <PackageIcon
                  size={48}
                  className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No orders yet
                    </h3>
                    <p className="text-gray-500 mb-6">
                      When you place an order, it will appear here.
                    </p>
                    <button
                  onClick={() =>
                  dispatch({
                    type: 'SET_CURRENT_PAGE',
                    payload: 'shop'
                  })
                  }
                  className="bg-red-700 text-white px-6 py-2 rounded-md font-medium">
                  
                      Start Shopping
                    </button>
                  </div> :

              <div className="space-y-6">
                    {state.orders.map((order) =>
                <div
                  key={order.id}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                  
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 flex flex-wrap justify-between items-center gap-4 border-b border-gray-200 dark:border-gray-700">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                              Order Number
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {order.id}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                              Date Placed
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                              Total Amount
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {formatPrice(order.total)}
                            </p>
                          </div>
                          <div>
                            <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          {order.items.map((item, idx) =>
                    <div
                      key={idx}
                      className="flex items-center gap-4 mb-4 last:mb-0">
                      
                              <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded" />
                      
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {item.product.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  Qty: {item.quantity} | Size:{' '}
                                  {item.selectedSize} | Color:{' '}
                                  {item.selectedColor}
                                </p>
                              </div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {formatPrice(
                          item.product.price * item.quantity
                        )}
                              </div>
                            </div>
                    )}
                        </div>
                      </div>
                )}
                  </div>
              }
              </div>
            }

            {activeTab === 'addresses' &&
            <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white">
                    Saved Addresses
                  </h2>
                  <button className="text-red-700 font-medium text-sm hover:underline">
                    + Add New
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-red-700 bg-red-50 dark:bg-gray-800 rounded-lg p-5 relative">
                    <span className="absolute top-4 right-4 bg-red-700 text-white text-xs font-bold px-2 py-1 rounded">
                      DEFAULT
                    </span>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                      {state.user.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                      123 Fashion Avenue, Suite 400
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                      Nairobi, 00100
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Kenya
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Phone: +254 712 345 678
                    </p>
                    <div className="flex gap-3 text-sm font-medium">
                      <button className="text-red-700 hover:underline">
                        Edit
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            }

            {activeTab === 'settings' &&
            <div className="animate-fade-in">
                <h2 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-6">
                  Account Settings
                </h2>
                <div className="space-y-6 max-w-2xl">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                      Notifications
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                        type="checkbox"
                        defaultChecked
                        className="rounded text-red-700 focus:ring-red-700" />
                      
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                          Order updates (Email & SMS)
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                        type="checkbox"
                        defaultChecked
                        className="rounded text-red-700 focus:ring-red-700" />
                      
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                          Promotions and sales alerts
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                        type="checkbox"
                        className="rounded text-red-700 focus:ring-red-700" />
                      
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                          New arrivals newsletter
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                      Change Password
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Current Password
                        </label>
                        <input
                        type="password"
                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500" />
                      
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          New Password
                        </label>
                        <input
                        type="password"
                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500" />
                      
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Confirm New Password
                        </label>
                        <input
                        type="password"
                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500" />
                      
                      </div>
                      <button
                      type="button"
                      className="bg-gray-900 dark:bg-gray-700 text-white px-6 py-2 rounded-md font-medium hover:bg-black transition-colors mt-2">
                      
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}