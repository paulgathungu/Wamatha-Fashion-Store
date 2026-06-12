import React, { useEffect, useState, Component } from 'react';
import {
  ArrowRightIcon,
  StarIcon,
  ShoppingBagIcon,
  HeartIcon,
  EyeIcon,
  ClockIcon } from
'lucide-react';
import { useStore } from '../context/StoreContext';
import { products, categories, testimonials } from '../data/products';
export function HomePage() {
  const { dispatch, formatPrice, state } = useStore();
  // Countdown timer logic for flash sale
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0)
        return {
          ...prev,
          seconds: prev.seconds - 1
        };
        if (prev.minutes > 0)
        return {
          ...prev,
          minutes: prev.minutes - 1,
          seconds: 59
        };
        if (prev.hours > 0)
        return {
          hours: prev.hours - 1,
          minutes: 59,
          seconds: 59
        };
        return {
          hours: 24,
          minutes: 0,
          seconds: 0
        }; // Reset for demo
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const handleNavigate = (page: string) => {
    dispatch({
      type: 'SET_CURRENT_PAGE',
      payload: page
    });
    window.scrollTo(0, 0);
  };
  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity: 1,
        selectedSize: product.sizes[0],
        selectedColor: product.colors[0]?.name || ''
      }
    });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        title: 'Added to Cart',
        message: `Added ${product.name} to cart`,
        type: 'info',
        read: false,
        date: new Date().toISOString()
      }
    });
  };
  const handleToggleWishlist = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    dispatch({
      type: 'TOGGLE_WISHLIST',
      payload: product
    });
  };
  // Mock data filters
  const featuredProducts = products.slice(0, 4);
  const flashSaleProducts = products.filter((p) => p.price < 100).slice(0, 4);
  const newArrivals = products.slice(4, 8);
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full bg-gray-900 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Hero Fashion"
            className="w-full h-full object-cover opacity-60" />
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-red-700 text-white text-xs font-bold tracking-wider mb-6 animate-fade-in">
              NEW COLLECTION 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-poppins font-bold text-white leading-tight mb-6 animate-slide-up">
              Redefine Your <br />
              <span className="text-red-600">Style.</span>
            </h1>
            <p
              className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg animate-slide-up"
              style={{
                animationDelay: '0.1s'
              }}>
              
              Discover the latest trends in premium fashion. Elevate your
              wardrobe with our exclusive new arrivals.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 animate-slide-up"
              style={{
                animationDelay: '0.2s'
              }}>
              
              <button
                onClick={() => handleNavigate('shop')}
                className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 flex items-center justify-center group">
                
                Shop Now
                <ArrowRightIcon
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20} />
                
              </button>
              <button
                onClick={() => handleNavigate('shop')}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 flex items-center justify-center">
                
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sales Section */}
      <section className="py-16 bg-red-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-red-700 dark:text-red-500 font-bold mb-2">
                <ClockIcon size={20} />
                <span>FLASH SALE</span>
              </div>
              <h2 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white">
                Grab Them Fast
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Ends in:
              </span>
              <div className="flex gap-2">
                <div className="bg-red-700 text-white w-12 h-12 rounded flex flex-col items-center justify-center">
                  <span className="font-bold text-lg leading-none">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px]">HRS</span>
                </div>
                <div className="bg-red-700 text-white w-12 h-12 rounded flex flex-col items-center justify-center">
                  <span className="font-bold text-lg leading-none">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px]">MIN</span>
                </div>
                <div className="bg-red-700 text-white w-12 h-12 rounded flex flex-col items-center justify-center">
                  <span className="font-bold text-lg leading-none">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px]">SEC</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSaleProducts.map((product) =>
            <ProductCard
              key={product.id}
              product={product}
              formatPrice={formatPrice}
              onNavigate={() => handleNavigate(`product-${product.id}`)}
              onAddToCart={(e) => handleAddToCart(e, product)}
              onToggleWishlist={(e) => handleToggleWishlist(e, product)}
              isWishlisted={state.wishlist.some((p) => p.id === product.id)}
              isSale={true} />

            )}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our wide range of collections tailored for every style and
              occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((category, idx) =>
            <div
              key={category.id}
              onClick={() => handleNavigate('shop')}
              className="relative h-80 rounded-xl overflow-hidden group cursor-pointer">
              
                <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <span className="inline-flex items-center text-white text-sm font-medium group-hover:text-red-400 transition-colors">
                    Explore <ArrowRightIcon size={16} className="ml-1" />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 dark:text-white">
              Trending Now
            </h2>
            <button
              onClick={() => handleNavigate('shop')}
              className="hidden md:flex items-center text-red-700 dark:text-red-500 font-medium hover:underline">
              
              View All <ArrowRightIcon size={16} className="ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) =>
            <ProductCard
              key={product.id}
              product={product}
              formatPrice={formatPrice}
              onNavigate={() => handleNavigate(`product-${product.id}`)}
              onAddToCart={(e) => handleAddToCart(e, product)}
              onToggleWishlist={(e) => handleToggleWishlist(e, product)}
              isWishlisted={state.wishlist.some((p) => p.id === product.id)} />

            )}
          </div>
          <div className="mt-8 text-center md:hidden">
            <button
              onClick={() => handleNavigate('shop')}
              className="inline-flex items-center justify-center w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-3 rounded-md font-medium">
              
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden bg-gray-900">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Sale Banner"
              className="absolute inset-0 w-full h-full object-cover opacity-50" />
            
            <div className="relative z-10 p-10 md:p-20 flex flex-col items-center text-center">
              <span className="text-yellow-400 font-bold tracking-widest uppercase mb-4">
                End of Season
              </span>
              <h2 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6">
                Up to 50% Off
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                Upgrade your wardrobe with our premium collection at unbeatable
                prices. Limited time offer.
              </p>
              <button
                onClick={() => handleNavigate('shop')}
                className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-md font-medium text-lg transition-colors">
                
                Shop The Sale
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our community has to
              say about our products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) =>
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) =>
                <StarIcon
                  key={i}
                  size={18}
                  fill={i < testimonial.rating ? 'currentColor' : 'none'} />

                )}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4" />
                
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Verified Buyer
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>);

}
// Reusable Product Card Component
function ProductCard({
  product,
  formatPrice,
  onNavigate,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  isSale = false
}: any) {
  return (
    <div className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
      <div
        className="relative aspect-[4/5] overflow-hidden cursor-pointer"
        onClick={onNavigate}>
        
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isSale &&
          <span className="bg-red-700 text-white text-xs font-bold px-2 py-1 rounded">
              -30%
            </span>
          }
          {product.isNew &&
          <span className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
              NEW
            </span>
          }
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex justify-center gap-2 bg-gradient-to-t from-black/60 to-transparent">
          <button
            onClick={onAddToCart}
            className="bg-red-700 hover:bg-red-800 text-white p-3 rounded-full shadow-lg transition-colors"
            title="Add to Cart">
            
            <ShoppingBagIcon size={20} />
          </button>
          <button
            onClick={onToggleWishlist}
            className={`p-3 rounded-full shadow-lg transition-colors ${isWishlisted ? 'bg-red-100 text-red-700' : 'bg-white text-gray-900 hover:bg-gray-100'}`}
            title="Wishlist">
            
            <HeartIcon
              size={20}
              fill={isWishlisted ? 'currentColor' : 'none'} />
            
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-gray-900 p-3 rounded-full shadow-lg transition-colors"
            title="Quick View">
            
            <EyeIcon size={20} />
          </button>
        </div>
      </div>

      <div className="p-5 cursor-pointer" onClick={onNavigate}>
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          {product.brand}
        </div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-2 truncate">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-red-700 dark:text-red-500">
              {formatPrice(product.price)}
            </span>
            {isSale &&
            <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.price * 1.3)}
              </span>
            }
          </div>
          <div className="flex items-center text-yellow-400 text-sm">
            <StarIcon size={14} fill="currentColor" />
            <span className="text-gray-600 dark:text-gray-400 ml-1">
              {product.rating}
            </span>
          </div>
        </div>
      </div>
    </div>);

}