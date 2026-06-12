import React from 'react';
import {
  Trash2Icon,
  MinusIcon,
  PlusIcon,
  ArrowRightIcon,
  ShoppingBagIcon } from
'lucide-react';
import { useStore } from '../context/StoreContext';
export function CartPage() {
  const { state, dispatch, formatPrice, cartTotal } = useStore();
  const shippingCost = cartTotal > 10000 ? 0 : 500;
  const tax = cartTotal * 0.16; // 16% VAT example
  const finalTotal = cartTotal + shippingCost + tax;
  const handleQuantityChange = (
  productId: string,
  size: string,
  color: string,
  newQuantity: number) =>
  {
    if (newQuantity < 1) return;
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: {
        productId,
        size,
        color,
        quantity: newQuantity
      }
    });
  };
  const handleRemove = (productId: string, size: string, color: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: `${productId}-${size}-${color}`
    });
  };
  if (state.cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-red-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-red-700 dark:text-red-500">
            <ShoppingBagIcon size={48} />
          </div>
        </div>
        <h2 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Discover our
          latest collections and find something you love.
        </p>
        <button
          onClick={() =>
          dispatch({
            type: 'SET_CURRENT_PAGE',
            payload: 'shop'
          })
          }
          className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-md font-medium transition-colors inline-flex items-center">
          
          Start Shopping <ArrowRightIcon size={20} className="ml-2" />
        </button>
      </div>);

  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white mb-8">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {state.cart.map((item, idx) =>
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                  {/* Product Info */}
                  <div className="col-span-1 md:col-span-6 flex gap-4">
                    <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-md cursor-pointer"
                    onClick={() =>
                    dispatch({
                      type: 'SET_CURRENT_PAGE',
                      payload: `product-${item.product.id}`
                    })
                    } />
                  
                    <div className="flex flex-col justify-center">
                      <h3
                      className="font-medium text-gray-900 dark:text-white mb-1 cursor-pointer hover:text-red-700"
                      onClick={() =>
                      dispatch({
                        type: 'SET_CURRENT_PAGE',
                        payload: `product-${item.product.id}`
                      })
                      }>
                      
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Size: {item.selectedSize} | Color: {item.selectedColor}
                      </p>
                      <button
                      onClick={() =>
                      handleRemove(
                        item.product.id,
                        item.selectedSize,
                        item.selectedColor
                      )
                      }
                      className="text-sm text-red-600 hover:text-red-800 flex items-center w-fit">
                      
                        <Trash2Icon size={14} className="mr-1" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price (Mobile hidden, Desktop visible) */}
                  <div className="hidden md:block col-span-2 text-center font-medium text-gray-900 dark:text-white">
                    {formatPrice(item.product.price)}
                  </div>

                  {/* Quantity & Mobile Price */}
                  <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                    <div className="md:hidden font-medium text-gray-900 dark:text-white">
                      {formatPrice(item.product.price)}
                    </div>
                    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md h-10 w-28 bg-white dark:bg-gray-800">
                      <button
                      onClick={() =>
                      handleQuantityChange(
                        item.product.id,
                        item.selectedSize,
                        item.selectedColor,
                        item.quantity - 1
                      )
                      }
                      className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-red-700">
                      
                        <MinusIcon size={14} />
                      </button>
                      <span className="flex-1 text-center font-medium text-gray-900 dark:text-white text-sm">
                        {item.quantity}
                      </span>
                      <button
                      onClick={() =>
                      handleQuantityChange(
                        item.product.id,
                        item.selectedSize,
                        item.selectedColor,
                        item.quantity + 1
                      )
                      }
                      className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-red-700">
                      
                        <PlusIcon size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="hidden md:block col-span-2 text-right font-bold text-gray-900 dark:text-white">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() =>
              dispatch({
                type: 'SET_CURRENT_PAGE',
                payload: 'shop'
              })
              }
              className="text-gray-600 dark:text-gray-400 hover:text-red-700 font-medium flex items-center">
              
              &larr; Continue Shopping
            </button>
            <button
              onClick={() =>
              dispatch({
                type: 'CLEAR_CART'
              })
              }
              className="text-gray-500 hover:text-red-700 text-sm underline">
              
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 sticky top-24">
            <h2 className="text-xl font-poppins font-bold text-gray-900 dark:text-white mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Estimated Tax</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatPrice(tax)}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="text-2xl font-bold text-red-700 dark:text-red-500">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" />
                
                <button className="bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-black dark:hover:bg-gray-600 transition-colors">
                  Apply
                </button>
              </div>
            </div>

            <button
              onClick={() =>
              dispatch({
                type: 'SET_CURRENT_PAGE',
                payload: 'checkout'
              })
              }
              className="w-full bg-red-700 hover:bg-red-800 text-white py-4 rounded-md font-bold text-lg transition-colors flex items-center justify-center shadow-lg shadow-red-700/20">
              
              Proceed to Checkout
            </button>

            <div className="mt-4 flex justify-center gap-2">
              <div className="h-6 w-10 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-[8px] font-bold text-gray-500">
                VISA
              </div>
              <div className="h-6 w-10 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-[8px] font-bold text-gray-500">
                MC
              </div>
              <div className="h-6 w-10 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-[8px] font-bold text-gray-500">
                PAYPAL
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}