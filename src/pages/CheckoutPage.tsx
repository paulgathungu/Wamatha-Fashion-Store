import React, { useState } from 'react';
import {
  CheckCircleIcon,
  CreditCardIcon,
  SmartphoneIcon,
  LockIcon } from
'lucide-react';
import { useStore } from '../context/StoreContext';
export function CheckoutPage() {
  const { state, dispatch, formatPrice, cartTotal } = useStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<
    'card' | 'mpesa' | 'paypal'>(
    'card');
  const shippingCost = cartTotal > 10000 ? 0 : 500;
  const tax = cartTotal * 0.16;
  const finalTotal = cartTotal + shippingCost + tax;
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock order creation
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toISOString(),
      total: finalTotal,
      status: 'pending' as const,
      items: [...state.cart],
      shippingAddress: 'Nairobi, Kenya',
      paymentMethod: paymentMethod === 'mpesa' ? 'M-Pesa' : paymentMethod === 'paypal' ? 'PayPal' : 'Card'
    };
    dispatch({
      type: 'ADD_ORDER',
      payload: newOrder
    });
    dispatch({
      type: 'CLEAR_CART'
    });
    setStep(3);
  };
  if (state.cart.length === 0 && step !== 3) {
    dispatch({
      type: 'SET_CURRENT_PAGE',
      payload: 'cart'
    });
    return null;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Steps Indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-center max-w-2xl mx-auto">
          <div
            className={`flex flex-col items-center ${step >= 1 ? 'text-red-700' : 'text-gray-400'}`}>
            
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 1 ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-500'}`}>
              
              1
            </div>
            <span className="text-xs font-medium uppercase tracking-wider">
              Shipping
            </span>
          </div>
          <div
            className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-red-700' : 'bg-gray-200'}`}>
          </div>
          <div
            className={`flex flex-col items-center ${step >= 2 ? 'text-red-700' : 'text-gray-400'}`}>
            
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 2 ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-500'}`}>
              
              2
            </div>
            <span className="text-xs font-medium uppercase tracking-wider">
              Payment
            </span>
          </div>
          <div
            className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-red-700' : 'bg-gray-200'}`}>
          </div>
          <div
            className={`flex flex-col items-center ${step >= 3 ? 'text-red-700' : 'text-gray-400'}`}>
            
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 3 ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-500'}`}>
              
              3
            </div>
            <span className="text-xs font-medium uppercase tracking-wider">
              Review
            </span>
          </div>
        </div>
      </div>

      {step === 3 ?
      <div className="max-w-2xl mx-auto text-center py-16 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <CheckCircleIcon size={80} className="text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Thank you for your purchase. Your order has been received.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Order ID:{' '}
            <span className="font-bold text-gray-900 dark:text-white">
              {state.orders[0]?.id}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
            onClick={() =>
            dispatch({
              type: 'SET_CURRENT_PAGE',
              payload: 'dashboard'
            })
            }
            className="bg-gray-900 dark:bg-gray-700 hover:bg-black text-white px-8 py-3 rounded-md font-medium transition-colors">
            
              View Order
            </button>
            <button
            onClick={() =>
            dispatch({
              type: 'SET_CURRENT_PAGE',
              payload: 'shop'
            })
            }
            className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-md font-medium transition-colors">
            
              Continue Shopping
            </button>
          </div>
        </div> :

      <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Form Area */}
          <div className="w-full lg:w-2/3">
            <form
            onSubmit={
            step === 1 ?
            (e) => {
              e.preventDefault();
              setStep(2);
            } :
            handlePlaceOrder
            }>
            
              {step === 1 &&
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                  <h2 className="text-xl font-poppins font-bold text-gray-900 dark:text-white mb-6">
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                    required
                    type="text"
                    defaultValue={state.user?.name?.split(' ')[0] || ''}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                    required
                    type="text"
                    defaultValue={state.user?.name?.split(' ')[1] || ''}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500" />
                  
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                    required
                    type="email"
                    defaultValue={state.user?.email || ''}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500" />
                  
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Street Address
                      </label>
                      <input
                    required
                    type="text"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        City
                      </label>
                      <input
                    required
                    type="text"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500" />
                  
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Postal Code
                      </label>
                      <input
                    required
                    type="text"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500" />
                  
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                    required
                    type="tel"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500" />
                  
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 mt-8">
                    Delivery Method
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 border border-red-700 bg-red-50 dark:bg-gray-800 rounded-lg cursor-pointer">
                      <div className="flex items-center">
                        <input
                      type="radio"
                      name="delivery"
                      defaultChecked
                      className="text-red-700 focus:ring-red-700 h-4 w-4" />
                    
                        <div className="ml-3">
                          <span className="block text-sm font-medium text-gray-900 dark:text-white">
                            Standard Delivery
                          </span>
                          <span className="block text-xs text-gray-500">
                            3-5 business days
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {shippingCost === 0 ? 'Free' : formatPrice(500)}
                      </span>
                    </label>
                    <label className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 hover:border-red-300 rounded-lg cursor-pointer transition-colors">
                      <div className="flex items-center">
                        <input
                      type="radio"
                      name="delivery"
                      className="text-red-700 focus:ring-red-700 h-4 w-4" />
                    
                        <div className="ml-3">
                          <span className="block text-sm font-medium text-gray-900 dark:text-white">
                            Express Delivery
                          </span>
                          <span className="block text-xs text-gray-500">
                            1-2 business days
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatPrice(1000)}
                      </span>
                    </label>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                  type="submit"
                  className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-md font-medium transition-colors">
                  
                      Continue to Payment
                    </button>
                  </div>
                </div>
            }

              {step === 2 &&
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-poppins font-bold text-gray-900 dark:text-white">
                      Payment Method
                    </h2>
                    <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-red-700 hover:underline">
                  
                      Edit Shipping
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${paymentMethod === 'card' ? 'border-red-700 bg-red-50 dark:bg-gray-800 text-red-700' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300'}`}>
                  
                      <CreditCardIcon size={24} className="mb-2" />
                      <span className="text-sm font-medium">Credit Card</span>
                    </button>
                    <button
                  type="button"
                  onClick={() => setPaymentMethod('mpesa')}
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${paymentMethod === 'mpesa' ? 'border-green-600 bg-green-50 dark:bg-gray-800 text-green-600' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300'}`}>
                  
                      <SmartphoneIcon size={24} className="mb-2" />
                      <span className="text-sm font-medium">M-Pesa</span>
                    </button>
                    <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${paymentMethod === 'paypal' ? 'border-blue-600 bg-blue-50 dark:bg-gray-800 text-blue-600' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300'}`}>
                  
                      <div className="font-bold text-xl italic mb-1">
                        PayPal
                      </div>
                      <span className="text-sm font-medium">PayPal</span>
                    </button>
                  </div>

                  {paymentMethod === 'card' &&
              <div className="space-y-4 animate-fade-in">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                      required
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500" />
                    
                          <CreditCardIcon
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Expiry Date
                          </label>
                          <input
                      required
                      type="text"
                      placeholder="MM/YY"
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500" />
                    
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            CVC
                          </label>
                          <input
                      required
                      type="text"
                      placeholder="123"
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500" />
                    
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Cardholder Name
                        </label>
                        <input
                    required
                    type="text"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500" />
                  
                      </div>
                    </div>
              }

                  {paymentMethod === 'mpesa' &&
              <div className="space-y-4 animate-fade-in bg-green-50 dark:bg-gray-800 p-6 rounded-lg border border-green-200 dark:border-gray-700 text-center">
                      <SmartphoneIcon
                  size={48}
                  className="mx-auto text-green-600 mb-4" />
                
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        Pay via M-Pesa
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Enter your M-Pesa registered phone number. A prompt will
                        be sent to your phone to complete the payment.
                      </p>
                      <input
                  required
                  type="tel"
                  placeholder="e.g. 0712345678"
                  className="w-full max-w-xs mx-auto bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-lg tracking-wider" />
                
                    </div>
              }

                  {paymentMethod === 'paypal' &&
              <div className="space-y-4 animate-fade-in bg-blue-50 dark:bg-gray-800 p-6 rounded-lg border border-blue-200 dark:border-gray-700 text-center">
                      <div className="font-bold text-4xl italic text-blue-600 mb-4">
                        PayPal
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        You will be redirected to PayPal to complete your
                        purchase securely.
                      </p>
                    </div>
              }

                  <div className="mt-8 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <LockIcon size={16} className="mr-2" />
                      Secure encrypted payment
                    </div>
                    <button
                  type="submit"
                  className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-md font-bold text-lg transition-colors shadow-lg shadow-red-700/20">
                  
                      Place Order
                    </button>
                  </div>
                </div>
            }
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 sticky top-24 shadow-sm">
              <h2 className="text-lg font-poppins font-bold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h2>

              <div className="max-h-64 overflow-y-auto custom-scrollbar mb-6 pr-2">
                {state.cart.map((item, idx) =>
              <div key={idx} className="flex gap-3 mb-4 last:mb-0">
                    <div className="relative">
                      <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-20 object-cover rounded border border-gray-100 dark:border-gray-800" />
                  
                      <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 text-sm">
                      <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-gray-500 text-xs mt-1">
                        {item.selectedSize} / {item.selectedColor}
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white mt-1">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
              )}
              </div>

              <div className="space-y-3 border-t border-gray-200 dark:border-gray-800 pt-4 mb-4 text-sm">
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
                  <span>Taxes</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatPrice(tax)}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-xl font-bold text-red-700 dark:text-red-500">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

}