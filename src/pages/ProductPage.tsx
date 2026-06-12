import React, { useEffect, useState } from 'react';
import {
  StarIcon,
  HeartIcon,
  ShoppingBagIcon,
  TruckIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon } from
'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
export function ProductPage() {
  const { state, dispatch, formatPrice } = useStore();
  const productId = state.currentPage.split('-')[1];
  const product = products.find((p) => p.id === productId) || products[0];
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  // Reset state when product changes
  useEffect(() => {
    setMainImage(product.images[0]);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [product]);
  const isWishlisted = state.wishlist.some((p) => p.id === product.id);
  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity,
        selectedSize,
        selectedColor: selectedColor.name
      }
    });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        title: 'Added to Cart',
        message: `Added ${quantity}x ${product.name} to cart`,
        type: 'info',
        read: false,
        date: new Date().toISOString()
      }
    });
  };
  const handleBuyNow = () => {
    handleAddToCart();
    dispatch({
      type: 'SET_CURRENT_PAGE',
      payload: 'checkout'
    });
  };
  const toggleWishlist = () => {
    dispatch({
      type: 'TOGGLE_WISHLIST',
      payload: product
    });
  };
  const colorMap: Record<string, string> = {
    Black: '#000000',
    White: '#FFFFFF',
    Red: '#DC2626',
    Blue: '#2563EB',
    Green: '#16A34A',
    Gray: '#6B7280',
    Navy: '#1E3A8A',
    Brown: '#78350F'
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8">
        <button
          onClick={() =>
          dispatch({
            type: 'SET_CURRENT_PAGE',
            payload: 'home'
          })
          }
          className="hover:text-red-700">
          
          Home
        </button>
        <ChevronRightIcon size={14} className="mx-1" />
        <button
          onClick={() =>
          dispatch({
            type: 'SET_CURRENT_PAGE',
            payload: 'shop'
          })
          }
          className="hover:text-red-700">
          
          Shop
        </button>
        <ChevronRightIcon size={14} className="mx-1" />
        <span className="hover:text-red-700 cursor-pointer">
          {product.category}
        </span>
        <ChevronRightIcon size={14} className="mx-1" />
        <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        {/* Image Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible md:w-24 flex-shrink-0">
            {product.images.map((img, idx) =>
            <button
              key={idx}
              onClick={() => setMainImage(img)}
              className={`w-20 h-24 md:w-full md:h-32 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${mainImage === img ? 'border-red-700' : 'border-transparent hover:border-gray-300'}`}>
              
                <img
                src={img}
                alt={`${product.name} ${idx}`}
                className="w-full h-full object-cover" />
              
              </button>
            )}
          </div>
          {/* Main Image */}
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden relative aspect-[4/5] md:aspect-auto">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover" />
            
            {product.isNew &&
            <span className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider">
                New Arrival
              </span>
            }
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-2 text-red-700 dark:text-red-500 font-bold tracking-wider text-sm uppercase">
            {product.brand}
          </div>
          <h1 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) =>
              <StarIcon
                key={i}
                size={18}
                fill={
                i < Math.floor(product.rating) ? 'currentColor' : 'none'
                } />

              )}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {product.reviews} Reviews
            </span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <span className="text-sm text-green-600 dark:text-green-500 font-medium">
              In Stock ({product.stock})
            </span>
          </div>

          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {formatPrice(product.price)}
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-gray-900 dark:text-white">
                Color:{' '}
                <span className="text-gray-500 font-normal">
                  {selectedColor.name}
                </span>
              </span>
            </div>
            <div className="flex gap-3">
              {product.colors.map((color) =>
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor.name === color.name ? 'border-red-700 scale-110' : 'border-transparent hover:scale-110 shadow-sm'}`}
                style={{
                  backgroundColor: color.hex || '#ccc'
                }}
                title={color.name}>
                
                  {colorMap[color] === '#FFFFFF' &&
                <div className="w-full h-full rounded-full border border-gray-200"></div>
                }
                </button>
              )}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-gray-900 dark:text-white">
                Size:{' '}
                <span className="text-gray-500 font-normal">
                  {selectedSize}
                </span>
              </span>
              <button className="text-sm text-red-700 dark:text-red-500 underline">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) =>
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-14 h-12 flex items-center justify-center border rounded-md font-medium transition-colors ${selectedSize === size ? 'bg-red-700 border-red-700 text-white' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:border-red-700'}`}>
                
                  {size}
                </button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Quantity */}
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md h-14 w-32 bg-white dark:bg-gray-800">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-red-700 transition-colors">
                
                <MinusIcon size={18} />
              </button>
              <span className="flex-1 text-center font-medium text-gray-900 dark:text-white">
                {quantity}
              </span>
              <button
                onClick={() =>
                setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-red-700 transition-colors">
                
                <PlusIcon size={18} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-900 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-600 text-white h-14 rounded-md font-bold flex items-center justify-center gap-2 transition-colors">
              
              <ShoppingBagIcon size={20} /> Add to Cart
            </button>

            <button
              onClick={toggleWishlist}
              className={`w-14 h-14 flex items-center justify-center border rounded-md transition-colors ${isWishlisted ? 'border-red-700 bg-red-50 dark:bg-red-900/20 text-red-700' : 'border-gray-300 dark:border-gray-700 text-gray-500 hover:border-red-700 hover:text-red-700'}`}>
              
              <HeartIcon
                size={24}
                fill={isWishlisted ? 'currentColor' : 'none'} />
              
            </button>
          </div>

          <button
            onClick={handleBuyNow}
            className="w-full bg-red-700 hover:bg-red-800 text-white h-14 rounded-md font-bold text-lg transition-colors mb-8 shadow-lg shadow-red-700/30">
            
            Buy It Now
          </button>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-200 dark:border-gray-800 pt-8">
            <div className="flex flex-col items-center text-center">
              <TruckIcon size={24} className="text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Free Shipping
              </span>
              <span className="text-xs text-gray-500">
                On orders over {formatPrice(10000)}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <RefreshCwIcon size={24} className="text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Easy Returns
              </span>
              <span className="text-xs text-gray-500">
                30-day return policy
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <ShieldCheckIcon size={24} className="text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Secure Payment
              </span>
              <span className="text-xs text-gray-500">
                100% secure checkout
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900 mb-16">
        <div className="flex border-b border-gray-200 dark:border-gray-800 overflow-x-auto custom-scrollbar">
          {['description', 'specifications', 'shipping', 'reviews'].map(
            (tab) =>
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === tab ? 'text-red-700 border-b-2 border-red-700 bg-red-50/50 dark:bg-gray-800' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
              
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>

          )}
        </div>
        <div className="p-8">
          {activeTab === 'description' &&
          <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {product.description}
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Elevate your everyday style with this premium piece from{' '}
                {product.brand}. Crafted with attention to detail and designed
                for both comfort and durability. Whether you're dressing up for
                a special occasion or keeping it casual, this versatile item is
                a must-have addition to your wardrobe.
              </p>
            </div>
          }
          {activeTab === 'specifications' &&
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                <span className="text-gray-500">Brand</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {product.brand}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                <span className="text-gray-500">Category</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {product.category}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                <span className="text-gray-500">Material</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  100% Premium Cotton
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                <span className="text-gray-500">Fit</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  Regular Fit
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                <span className="text-gray-500">Care</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  Machine Wash Cold
                </span>
              </div>
            </div>
          }
          {activeTab === 'shipping' &&
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <h4 className="font-bold text-gray-900 dark:text-white">
                Delivery Options
              </h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Standard Delivery (3-5 business days): {formatPrice(500)} or
                  FREE on orders over {formatPrice(10000)}
                </li>
                <li>
                  Express Delivery (1-2 business days): {formatPrice(1000)}
                </li>
                <li>Same Day Delivery (Nairobi only): {formatPrice(1500)}</li>
              </ul>
              <h4 className="font-bold text-gray-900 dark:text-white mt-6">
                Returns Policy
              </h4>
              <p>
                We accept returns within 30 days of delivery. Items must be
                unworn, unwashed, and have original tags attached. Return
                shipping is free for all registered members.
              </p>
            </div>
          }
          {activeTab === 'reviews' &&
          <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="text-5xl font-bold text-gray-900 dark:text-white">
                  {product.rating}
                </div>
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) =>
                  <StarIcon
                    key={i}
                    size={20}
                    fill={
                    i < Math.floor(product.rating) ?
                    'currentColor' :
                    'none'
                    } />

                  )}
                  </div>
                  <span className="text-gray-500">
                    Based on {product.reviews} reviews
                  </span>
                </div>
              </div>
              {/* Mock Reviews List */}
              <div className="space-y-6">
                {[1, 2, 3].map((i) =>
              <div
                key={i}
                className="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0">
                
                    <div className="flex justify-between mb-2">
                      <div className="font-medium text-gray-900 dark:text-white">
                        Customer {i}
                      </div>
                      <span className="text-sm text-gray-500">2 weeks ago</span>
                    </div>
                    <div className="flex text-yellow-400 mb-3">
                      {[...Array(5)].map((_, j) =>
                  <StarIcon key={j} size={14} fill="currentColor" />
                  )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Great quality and perfect fit! The material feels premium
                      and it looks exactly like the pictures. Will definitely
                      buy again from this brand.
                    </p>
                  </div>
              )}
              </div>
            </div>
          }
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-8">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.
          filter(
            (p) => p.category === product.category && p.id !== product.id
          ).
          slice(0, 4).
          map((related) =>
          <div
            key={related.id}
            className="group cursor-pointer"
            onClick={() =>
            dispatch({
              type: 'SET_CURRENT_PAGE',
              payload: `product-${related.id}`
            })
            }>
            
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-4 bg-gray-100 dark:bg-gray-800">
                  <img
                src={related.images[0]}
                alt={related.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  {related.brand}
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1 truncate">
                  {related.name}
                </h3>
                <div className="font-bold text-red-700 dark:text-red-500">
                  {formatPrice(related.price)}
                </div>
              </div>
          )}
        </div>
      </div>
    </div>);

}