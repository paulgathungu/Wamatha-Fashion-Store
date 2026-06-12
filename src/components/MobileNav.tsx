import React from 'react';
import {
  HomeIcon,
  SearchIcon,
  ShoppingCartIcon,
  HeartIcon,
  UserIcon } from
'lucide-react';
import { useStore } from '../context/StoreContext';
export function MobileNav() {
  const { state, dispatch, cartCount } = useStore();
  const handleNavigation = (page: string) => {
    dispatch({
      type: 'SET_CURRENT_PAGE',
      payload: page
    });
    window.scrollTo(0, 0);
  };
  const navItems = [
  {
    id: 'home',
    icon: HomeIcon,
    label: 'Home'
  },
  {
    id: 'search',
    icon: SearchIcon,
    label: 'Search'
  },
  {
    id: 'cart',
    icon: ShoppingCartIcon,
    label: 'Cart',
    badge: cartCount
  },
  {
    id: 'wishlist',
    icon: HeartIcon,
    label: 'Wishlist',
    badge: state.wishlist.length
  },
  {
    id: state.isAuthenticated ? 'dashboard' : 'login',
    icon: UserIcon,
    label: 'Profile'
  }];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
          state.currentPage === item.id ||
          item.id === 'dashboard' && state.currentPage === 'admin';
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative ${isActive ? 'text-red-700 dark:text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
              
              <div className="relative">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                {item.badge ?
                <span className="absolute -top-1.5 -right-2 bg-red-700 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span> :
                null}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>);

        })}
      </div>
    </div>);

}