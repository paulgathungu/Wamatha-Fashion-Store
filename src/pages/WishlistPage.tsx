import React from 'react';
import { HeartIcon, ShoppingCartIcon, Trash2Icon } from 'lucide-react';
import { useStore } from '../context/StoreContext';
export function WishlistPage() {
  const { state, dispatch, formatPrice } = useStore();
  const wishlistProducts = state.wishlist;
  const handleRemove = (product: any) => {
    dispatch({
      type: 'TOGGLE_WISHLIST',
      payload: product
    });
  };
  const handleMoveToCart = (product: any) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity: 1,
        selectedSize: product.sizes[0],
        selectedColor: product.colors[0]?.name || product.colors[0]
      }
    });
    dispatch({
      type: 'TOGGLE_WISHLIST',
      payload: product
    }); // Remove from wishlist
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        title: 'Moved to Cart',
        message: `Moved ${product.name} to cart`,
        type: 'info',
        read: false,
        date: new Date().toISOString()
      }
    });
  };
  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <HeartIcon
          size={64}
          className="mx-auto text-gray-300 dark:text-gray-600 mb-6" />
        
        <h2 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Save items you love to your wishlist. Review them anytime and easily
          move them to your cart.
        </p>
        <button
          onClick={() =>
          dispatch({
            type: 'SET_CURRENT_PAGE',
            payload: 'shop'
          })
          }
          className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-md font-medium transition-colors">
          
          Explore Products
        </button>
      </div>);

  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white">
          My Wishlist
        </h1>
        <span className="text-gray-500 font-medium">
          {wishlistProducts.length} Items
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((product) =>
        <div
          key={product.id}
          className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col">
          
            <div
            className="relative aspect-[4/5] cursor-pointer"
            onClick={() =>
            dispatch({
              type: 'SET_CURRENT_PAGE',
              payload: `product-${product.id}`
            })
            }>
            
              <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover" />
            
              <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(product);
              }}
              className="absolute top-3 right-3 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md text-gray-400 hover:text-red-700 transition-colors z-10">
              
                <Trash2Icon size={18} />
              </button>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-1">
                {product.name}
              </h3>
              <div className="font-bold text-lg text-red-700 dark:text-red-500 mb-4">
                {formatPrice(product.price)}
              </div>

              <button
              onClick={() => handleMoveToCart(product)}
              className="mt-auto w-full bg-gray-900 dark:bg-gray-700 hover:bg-black text-white py-2.5 rounded-md font-medium flex items-center justify-center gap-2 transition-colors">
              
                <ShoppingCartIcon size={18} /> Move to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>);

}