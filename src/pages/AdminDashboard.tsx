import React, { useEffect, useState } from 'react';
import {
  LayoutDashboardIcon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
  TagIcon,
  SettingsIcon,
  LogOutIcon,
  ArrowUpRightIcon,
  MoreVerticalIcon,
  SearchIcon,
  PlusIcon,
  EditIcon,
  Trash2Icon,
  BellIcon } from
'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
export function AdminDashboard() {
  const { state, dispatch, formatPrice } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  // Redirect if not admin
  useEffect(() => {
    if (!state.isAuthenticated || state.user?.role !== 'admin') {
      dispatch({
        type: 'SET_CURRENT_PAGE',
        payload: 'home'
      });
    }
  }, [state.isAuthenticated, state.user, dispatch]);
  if (!state.isAuthenticated || state.user?.role !== 'admin') return null;
  const sidebarItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboardIcon
  },
  {
    id: 'products',
    label: 'Products',
    icon: PackageIcon
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: ShoppingCartIcon
  },
  {
    id: 'users',
    label: 'Customers',
    icon: UsersIcon
  },
  {
    id: 'promotions',
    label: 'Promotions',
    icon: TagIcon
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: SettingsIcon
  }];

  // Mock Data for Admin
  const stats = [
  {
    label: 'Total Revenue',
    value: formatPrice(1250000),
    change: '+12.5%'
  },
  {
    label: 'Total Orders',
    value: '1,245',
    change: '+8.2%'
  },
  {
    label: 'Total Customers',
    value: '8,549',
    change: '+15.3%'
  },
  {
    label: 'Total Products',
    value: products.length.toString(),
    change: '+2.1%'
  }];

  const recentOrders = [
  {
    id: 'ORD-7829',
    customer: 'Sarah Jenkins',
    date: '2026-03-27',
    total: 15400,
    status: 'pending'
  },
  {
    id: 'ORD-7828',
    customer: 'Michael Chen',
    date: '2026-03-26',
    total: 8900,
    status: 'shipped'
  },
  {
    id: 'ORD-7827',
    customer: 'Emma Watson',
    date: '2026-03-26',
    total: 24500,
    status: 'delivered'
  },
  {
    id: 'ORD-7826',
    customer: 'David Ochieng',
    date: '2026-03-25',
    total: 12000,
    status: 'delivered'
  }];

  const mockUsers = [
  {
    id: 'USR-001',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    role: 'customer',
    status: 'active',
    spent: 45000
  },
  {
    id: 'USR-002',
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    role: 'customer',
    status: 'active',
    spent: 12500
  },
  {
    id: 'USR-003',
    name: 'Admin User',
    email: 'admin@redstore.com',
    role: 'admin',
    status: 'active',
    spent: 0
  },
  {
    id: 'USR-004',
    name: 'Emma Watson',
    email: 'emma.w@example.com',
    role: 'customer',
    status: 'inactive',
    spent: 8900
  }];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <span className="font-poppins font-bold text-xl tracking-tighter text-red-600">
            REDSTORE<span className="text-white">.</span>{' '}
            <span className="text-xs font-normal text-gray-400 ml-2">
              ADMIN
            </span>
          </span>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-red-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                  
                  <Icon size={20} />
                  {item.label}
                </button>);

            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() =>
            dispatch({
              type: 'SET_CURRENT_PAGE',
              payload: 'home'
            })
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            
            <ArrowUpRightIcon size={20} />
            Back to Store
          </button>
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-gray-800 transition-colors mt-2">
            
            <LogOutIcon size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center md:hidden">
            <span className="font-poppins font-bold text-xl tracking-tighter text-red-600">
              REDSTORE<span className="text-gray-900 dark:text-white">.</span>
            </span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden md:block capitalize">
            {activeTab}
          </h1>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <SearchIcon
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-lg text-sm focus:ring-2 focus:ring-red-500 w-64" />
              
            </div>
            <button className="relative p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <BellIcon size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
              <img
                src={state.user.avatar}
                alt="Admin"
                className="w-8 h-8 rounded-full border border-gray-300" />
              
              <div className="hidden sm:block text-sm">
                <p className="font-medium text-gray-900 dark:text-white leading-none">
                  {state.user.name}
                </p>
                <p className="text-gray-500 text-xs mt-1">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' &&
          <div className="space-y-6 animate-fade-in">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) =>
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      {stat.label}
                    </p>
                    <div className="flex items-end justify-between">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </h3>
                      <span className="text-sm font-medium text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                        {stat.change}
                      </span>
                    </div>
                  </div>
              )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Mockup */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Revenue Overview
                    </h3>
                    <select className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm px-3 py-1">
                      <option>Last 7 Days</option>
                      <option>This Month</option>
                      <option>This Year</option>
                    </select>
                  </div>
                  <div className="h-64 flex items-end gap-2 justify-between pt-4">
                    {/* CSS Bar Chart */}
                    {[40, 65, 45, 80, 55, 90, 75].map((height, i) =>
                  <div
                    key={i}
                    className="w-full flex flex-col items-center gap-2 group">
                    
                        <div className="w-full bg-red-100 dark:bg-red-900/20 rounded-t-md relative flex items-end justify-center h-full">
                          <div
                        className="w-full bg-red-700 rounded-t-md transition-all duration-500 group-hover:bg-red-600"
                        style={{
                          height: `${height}%`
                        }}>
                      </div>
                          <div className="absolute -top-8 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {formatPrice(height * 1000)}
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          Day {i + 1}
                        </span>
                      </div>
                  )}
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-6">
                    Top Selling Products
                  </h3>
                  <div className="space-y-4">
                    {products.slice(0, 4).map((product, idx) =>
                  <div key={product.id} className="flex items-center gap-4">
                        <span className="font-bold text-gray-400 w-4">
                          {idx + 1}
                        </span>
                        <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded object-cover" />
                    
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product.category}
                          </p>
                        </div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {Math.floor(Math.random() * 50) + 10} sold
                        </div>
                      </div>
                  )}
                  </div>
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Recent Orders
                  </h3>
                  <button
                  onClick={() => setActiveTab('orders')}
                  className="text-sm text-red-700 font-medium hover:underline">
                  
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                        <th className="p-4 font-medium">Order ID</th>
                        <th className="p-4 font-medium">Customer</th>
                        <th className="p-4 font-medium">Date</th>
                        <th className="p-4 font-medium">Total</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {recentOrders.map((order) =>
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      
                          <td className="p-4 font-medium text-gray-900 dark:text-white">
                            {order.id}
                          </td>
                          <td className="p-4 text-gray-600 dark:text-gray-300">
                            {order.customer}
                          </td>
                          <td className="p-4 text-gray-600 dark:text-gray-300">
                            {order.date}
                          </td>
                          <td className="p-4 font-medium text-gray-900 dark:text-white">
                            {formatPrice(order.total)}
                          </td>
                          <td className="p-4">
                            <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : order.status === 'shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                          
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                              <MoreVerticalIcon size={18} />
                            </button>
                          </td>
                        </tr>
                    )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          }

          {/* PRODUCTS TAB */}
          {activeTab === 'products' &&
          <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Products Management
                </h2>
                <button className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
                  <PlusIcon size={18} /> Add Product
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="relative w-full sm:w-64">
                    <SearchIcon
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  
                    <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-red-500" />
                  
                  </div>
                  <div className="flex gap-2">
                    <select className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm px-3 py-2">
                      <option>All Categories</option>
                      <option>Men</option>
                      <option>Women</option>
                    </select>
                    <select className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm px-3 py-2">
                      <option>Status</option>
                      <option>In Stock</option>
                      <option>Out of Stock</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                        <th className="p-4 font-medium">Product</th>
                        <th className="p-4 font-medium">Category</th>
                        <th className="p-4 font-medium">Price</th>
                        <th className="p-4 font-medium">Stock</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {products.map((product) =>
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-10 h-10 rounded object-cover" />
                          
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                  {product.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {product.brand}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-gray-600 dark:text-gray-300 text-sm">
                            {product.category}
                          </td>
                          <td className="p-4 font-medium text-gray-900 dark:text-white text-sm">
                            {formatPrice(product.price)}
                          </td>
                          <td className="p-4 text-gray-600 dark:text-gray-300 text-sm">
                            {product.stock}
                          </td>
                          <td className="p-4">
                            <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${product.stock > 10 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                          
                              {product.stock > 10 ?
                          'In Stock' :
                          product.stock > 0 ?
                          'Low Stock' :
                          'Out of Stock'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                                <EditIcon size={16} />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                                <Trash2Icon size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                    )}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm text-gray-500">
                  <span>
                    Showing 1 to {products.length} of {products.length} entries
                  </span>
                  <div className="flex gap-1">
                    <button
                    className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 disabled:opacity-50"
                    disabled>
                    
                      Prev
                    </button>
                    <button className="px-3 py-1 border border-red-700 rounded bg-red-700 text-white">
                      1
                    </button>
                    <button
                    className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 disabled:opacity-50"
                    disabled>
                    
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }

          {/* USERS TAB */}
          {activeTab === 'users' &&
          <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Customers Management
                </h2>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                        <th className="p-4 font-medium">Customer</th>
                        <th className="p-4 font-medium">Role</th>
                        <th className="p-4 font-medium">Total Spent</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {mockUsers.map((user) =>
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {user.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                          
                              {user.role}
                            </span>
                          </td>
                          <td className="p-4 font-medium text-gray-900 dark:text-white text-sm">
                            {formatPrice(user.spent)}
                          </td>
                          <td className="p-4">
                            <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                          
                              {user.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button className="text-sm text-red-700 font-medium hover:underline">
                              {user.status === 'active' ?
                          'Suspend' :
                          'Activate'}
                            </button>
                          </td>
                        </tr>
                    )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          }

          {/* Placeholder for other tabs */}
          {['orders', 'promotions', 'settings'].includes(activeTab) &&
          <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
              <SettingsIcon
              size={64}
              className="text-gray-300 dark:text-gray-600 mb-4" />
            
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 capitalize">
                {activeTab} Module
              </h2>
              <p className="text-gray-500 max-w-md">
                This module is currently under development. Check back later for
                full functionality.
              </p>
            </div>
          }
        </div>
      </main>
    </div>);

}