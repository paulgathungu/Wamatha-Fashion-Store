import React, { useState, Component } from 'react';
import { MailIcon, LockIcon, UserIcon, ArrowRightIcon } from 'lucide-react';
import { useStore } from '../context/StoreContext';
export function RegisterPage() {
  const { dispatch } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration
    const mockUser = {
      id: `usr_${Math.floor(Math.random() * 10000)}`,
      name: name,
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=b91c1c&color=fff`,
      role: 'customer' as const
    };
    dispatch({
      type: 'LOGIN',
      payload: mockUser
    });
    dispatch({
      type: 'SET_CURRENT_PAGE',
      payload: 'home'
    });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        title: 'Welcome!',
        message: `Account created successfully! Welcome, ${name}.`,
        type: 'info',
        read: false,
        date: new Date().toISOString()
      }
    });
  };
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="bg-gray-900 p-8 text-center">
          <h2 className="text-3xl font-poppins font-bold text-white mb-2">
            Create Account
          </h2>
          <p className="text-gray-400 text-sm">
            Join REDSTORE to get exclusive offers and track orders.
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  placeholder="John Doe" />
                
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  placeholder="you@example.com" />
                
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  placeholder="••••••••"
                  minLength={8} />
                
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-red-700 focus:ring-red-500 border-gray-300 rounded" />
                
              </div>
              <div className="ml-2 text-sm">
                <label
                  htmlFor="terms"
                  className="text-gray-600 dark:text-gray-400">
                  
                  I agree to the{' '}
                  <a
                    href="#"
                    className="font-medium text-red-700 hover:text-red-600">
                    
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    href="#"
                    className="font-medium text-red-700 hover:text-red-600">
                    
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors mt-6">
              
              Create Account <ArrowRightIcon className="ml-2 h-4 w-4" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <button
              onClick={() =>
              dispatch({
                type: 'SET_CURRENT_PAGE',
                payload: 'login'
              })
              }
              className="font-medium text-red-700 hover:text-red-600">
              
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>);

}