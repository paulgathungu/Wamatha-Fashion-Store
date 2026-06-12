import React from 'react';
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon } from
'lucide-react';
import { useStore } from '../context/StoreContext';
export function Footer() {
  const { dispatch } = useStore();
  const handleNavigation = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    dispatch({
      type: 'SET_CURRENT_PAGE',
      payload: page
    });
    window.scrollTo(0, 0);
  };
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 md:pb-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <h3 className="font-poppins font-bold text-2xl tracking-tighter text-white mb-6">
              REDSTORE<span className="text-red-600">.</span>
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Redefining premium fashion with curated collections for the modern
              individual. Quality, style, and elegance in every stitch.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">
                
                <FacebookIcon size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">
                
                <TwitterIcon size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">
                
                <InstagramIcon size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">
                
                <YoutubeIcon size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  onClick={(e) => handleNavigation(e, 'home')}
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleNavigation(e, 'shop')}
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  
                  Shop Collection
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleNavigation(e, 'shop')}
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleNavigation(e, 'shop')}
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  
                  Flash Sales
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">
              Customer Service
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  onClick={(e) => handleNavigation(e, 'dashboard')}
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  
                  My Account
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  
                  Track Order
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            <form
              className="flex flex-col space-y-3"
              onSubmit={(e) => e.preventDefault()}>
              
              <div className="relative">
                <MailIcon
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-md py-2.5 pl-10 pr-4 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                  required />
                
              </div>
              <button
                type="submit"
                className="w-full bg-red-700 hover:bg-red-800 text-white font-medium py-2.5 rounded-md transition-colors text-sm">
                
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} REDSTORE. All rights reserved.
          </p>
          <div className="flex space-x-4">
            {/* Mock Payment Icons */}
            <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-[10px] font-bold text-gray-400">
              VISA
            </div>
            <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-[10px] font-bold text-gray-400">
              MC
            </div>
            <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-[10px] font-bold text-gray-400">
              PAYPAL
            </div>
            <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-[10px] font-bold text-gray-400 text-green-500">
              M-PESA
            </div>
          </div>
        </div>
      </div>
    </footer>);

}