import React, { useEffect, useState } from 'react';
import {
  SearchIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
  MenuIcon,
  XIcon,
  BellIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon } from
'lucide-react';
import { useStore } from '../context/StoreContext';
export function Navbar() {
  const {
    state,
    dispatch,
    cartCount,
    cartTotal,
    formatPrice,
    unreadNotifications
  } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
  {
    name: 'Men',
    id: 'men'
  },
  {
    name: 'Women',
    id: 'women'
  },
  {
    name: 'Kids',
    id: 'kids'
  },
  {
    name: 'Accessories',
    id: 'accessories'
  },
  {
    name: 'New Arrivals',
    id: 'new'
  },
  {
    name: 'Sale',
    id: 'sale'
  }];

  const handleNavigation = (page: string) => {
    dispatch({
      type: 'SET_CURRENT_PAGE',
      payload: page
    });
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsCartPreviewOpen(false);
  };
  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-white dark:bg-gray-900'}`}>
      
      {/* Top Bar */}
      <div className="bg-red-700 text-white text-xs py-1.5 px-4 flex justify-between items-center">
        <div className="hidden md:block">
          Free shipping on orders over {formatPrice(10000)}
        </div>
        <div className="flex-1 md:hidden text-center">
          Free shipping over {formatPrice(10000)}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <select
            className="bg-transparent border-none text-white text-xs focus:ring-0 cursor-pointer"
            value={state.currency}
            onChange={(e) =>
            dispatch({
              type: 'SET_CURRENCY',
              payload: e.target.value
            })
            }>
            
            <option value="KES" className="text-black">
              KES
            </option>
            <option value="USD" className="text-black">
              USD
            </option>
            <option value="EUR" className="text-black">
              EUR
            </option>
            <option value="GBP" className="text-black">
              GBP
            </option>
          </select>
          <button
            onClick={() =>
            dispatch({
              type: 'TOGGLE_DARK_MODE'
            })
            }
            className="hover:text-yellow-400 transition-colors"
            aria-label="Toggle Dark Mode">
            
            {state.darkMode ? <SunIcon size={14} /> : <MoonIcon size={14} />}
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-900 dark:text-white hover:text-red-700 dark:hover:text-red-500">
              
              {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => handleNavigation('home')}>
            
            <span className="font-poppins font-bold text-2xl tracking-tighter text-red-700 dark:text-red-600">
              REDSTORE<span className="text-gray-900 dark:text-white">.</span>
            </span>
          </div>

          {/* Desktop Navigation (Mega Menu placeholder) */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) =>
            <div key={link.name} className="relative group">
                <button
                onClick={() => handleNavigation('shop')}
                className="text-gray-900 dark:text-gray-100 hover:text-red-700 dark:hover:text-red-500 font-medium text-sm transition-colors py-5">
                
                  {link.name}
                </button>
                {/* Simple Dropdown for Mega Menu feel */}
                <div className="absolute top-full left-0 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-y-0 group-hover:scale-y-100 z-50">
                  <div className="py-2">
                    {['Tops', 'Bottoms', 'Shoes', 'Accessories'].map((sub) =>
                  <button
                    key={sub}
                    onClick={() => handleNavigation('shop')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-700 hover:text-red-700 dark:hover:text-red-400">
                    
                        {sub}
                      </button>
                  )}
                  </div>
                </div>
              </div>
            )}
          </nav>

          {/* Right Section Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              onClick={() => handleNavigation('search')}
              className="text-gray-900 dark:text-white hover:text-red-700 dark:hover:text-red-500 transition-colors">
              
              <SearchIcon size={20} />
            </button>

            <button
              onClick={() => handleNavigation('wishlist')}
              className="text-gray-900 dark:text-white hover:text-red-700 dark:hover:text-red-500 transition-colors relative hidden sm:block">
              
              <HeartIcon size={20} />
              {state.wishlist.length > 0 &&
              <span className="absolute -top-2 -right-2 bg-red-700 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {state.wishlist.length}
                </span>
              }
            </button>

            {/* Cart with Preview Dropdown */}
            <div
              className="relative"
              onMouseLeave={() => setIsCartPreviewOpen(false)}>
              
              <button
                onClick={() => handleNavigation('cart')}
                onMouseEnter={() => setIsCartPreviewOpen(true)}
                className="text-gray-900 dark:text-white hover:text-red-700 dark:hover:text-red-500 transition-colors relative">
                
                <ShoppingCartIcon size={20} />
                {cartCount > 0 &&
                <span className="absolute -top-2 -right-2 bg-red-700 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                }
              </button>

              {/* Cart Preview Dropdown */}
              {isCartPreviewOpen && state.cart.length > 0 &&
              <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden z-50 border border-gray-100 dark:border-gray-700 animate-fade-in">
                  <div className="p-4 max-h-64 overflow-y-auto custom-scrollbar">
                    {state.cart.slice(0, 3).map((item, idx) =>
                  <div
                    key={`${item.product.id}-${idx}`}
                    className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100 dark:border-gray-700 last:border-0 last:mb-0 last:pb-0">
                    
                        <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded" />
                    
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Qty: {item.quantity} ×{' '}
                            {formatPrice(item.product.price)}
                          </p>
                        </div>
                      </div>
                  )}
                    {state.cart.length > 3 &&
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                        + {state.cart.length - 3} more items
                      </p>
                  }
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Subtotal:
                      </span>
                      <span className="text-sm font-bold text-red-700 dark:text-red-500">
                        {formatPrice(cartTotal)}
                      </span>
                    </div>
                    <button
                    onClick={() => handleNavigation('cart')}
                    className="w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded-md text-sm font-medium transition-colors">
                    
                      View Cart
                    </button>
                  </div>
                </div>
              }
            </div>

            {/* User Dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center text-gray-900 dark:text-white hover:text-red-700 dark:hover:text-red-500 transition-colors">
                
                {state.user?.avatar ?
                <img
                  src={state.user.avatar}
                  alt="User"
                  className="w-6 h-6 rounded-full object-cover border border-gray-200" /> :


                <UserIcon size={20} />
                }
                <ChevronDownIcon size={14} className="ml-1" />
              </button>

              {isUserMenuOpen &&
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden z-50 border border-gray-100 dark:border-gray-700 animate-fade-in">
                  {state.isAuthenticated ?
                <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {state.user?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {state.user?.email}
                        </p>
                      </div>
                      <button
                    onClick={() => handleNavigation('dashboard')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    
                        Dashboard
                      </button>
                      <button
                    onClick={() => handleNavigation('dashboard')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    
                        Orders
                      </button>
                      {state.user?.role === 'admin' &&
                  <button
                    onClick={() => handleNavigation('admin')}
                    className="block w-full text-left px-4 py-2 text-sm text-red-700 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-gray-700 border-t border-gray-100 dark:border-gray-700">
                    
                          Admin Panel
                        </button>
                  }
                      <button
                    onClick={() => {
                      dispatch({
                        type: 'LOGOUT'
                      });
                      handleNavigation('home');
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-t border-gray-100 dark:border-gray-700">
                    
                        Logout
                      </button>
                    </div> :

                <div className="py-1">
                      <button
                    onClick={() => handleNavigation('login')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    
                        Login
                      </button>
                      <button
                    onClick={() => handleNavigation('register')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    
                        Register
                      </button>
                    </div>
                }
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMobileMenuOpen(false)}>
        
        <div
          className={`fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}>
          
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <span className="font-poppins font-bold text-xl text-red-700 dark:text-red-600">
              REDSTORE.
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-500 hover:text-red-700">
              
              <XIcon size={24} />
            </button>
          </div>

          <div className="p-4 overflow-y-auto h-full pb-20">
            <div className="space-y-1 mb-8">
              {navLinks.map((link) =>
              <button
                key={link.name}
                onClick={() => handleNavigation('shop')}
                className="block w-full text-left px-4 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-red-50 dark:hover:bg-gray-800 hover:text-red-700 rounded-md transition-colors">
                
                  {link.name}
                </button>
              )}
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-4">
              {state.isAuthenticated ?
              <>
                  <div className="flex items-center px-4 py-2">
                    {state.user?.avatar ?
                  <img
                    src={state.user.avatar}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover mr-3" /> :


                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                        <UserIcon size={20} className="text-gray-500" />
                      </div>
                  }
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {state.user?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {state.user?.email}
                      </p>
                    </div>
                  </div>
                  <button
                  onClick={() => handleNavigation('dashboard')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  
                    My Dashboard
                  </button>
                  {state.user?.role === 'admin' &&
                <button
                  onClick={() => handleNavigation('admin')}
                  className="block w-full text-left px-4 py-2 text-sm text-red-700 dark:text-red-500 font-medium">
                  
                      Admin Panel
                    </button>
                }
                  <button
                  onClick={() => {
                    dispatch({
                      type: 'LOGOUT'
                    });
                    handleNavigation('home');
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  
                    Logout
                  </button>
                </> :

              <div className="px-4 flex space-x-4">
                  <button
                  onClick={() => handleNavigation('login')}
                  className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-2 rounded-md text-sm font-medium text-center">
                  
                    Login
                  </button>
                  <button
                  onClick={() => handleNavigation('register')}
                  className="flex-1 bg-red-700 text-white py-2 rounded-md text-sm font-medium text-center">
                  
                    Register
                  </button>
                </div>
              }
            </div>

            <div className="mt-8 px-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Dark Mode
              </span>
              <button
                onClick={() =>
                dispatch({
                  type: 'TOGGLE_DARK_MODE'
                })
                }
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
                
                {state.darkMode ?
                <SunIcon size={16} /> :

                <MoonIcon size={16} />
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>);

}