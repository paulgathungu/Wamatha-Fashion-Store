import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
// Lazy load pages for better structure (simulated here with direct imports)
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { UserDashboard } from './pages/UserDashboard';
import { WishlistPage } from './pages/WishlistPage';
import { SearchPage } from './pages/SearchPage';
import { AdminDashboard } from './pages/AdminDashboard';
function AppContent() {
  const { state } = useStore();
  // Route renderer based on state.currentPage
  const renderPage = () => {
    if (state.currentPage === 'home') return <HomePage />;
    if (state.currentPage === 'shop') return <ShopPage />;
    if (state.currentPage.startsWith('product-')) return <ProductPage />;
    if (state.currentPage === 'cart') return <CartPage />;
    if (state.currentPage === 'checkout') return <CheckoutPage />;
    if (state.currentPage === 'login') return <LoginPage />;
    if (state.currentPage === 'register') return <RegisterPage />;
    if (state.currentPage === 'dashboard') return <UserDashboard />;
    if (state.currentPage === 'wishlist') return <WishlistPage />;
    if (state.currentPage === 'search') return <SearchPage />;
    if (state.currentPage === 'admin') return <AdminDashboard />;
    return <HomePage />; // Fallback
  };
  // Admin has its own layout
  if (state.currentPage === 'admin') {
    return (
      <div className={`min-h-screen ${state.darkMode ? 'dark' : ''}`}>
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen font-inter transition-colors duration-300">
          {renderPage()}
        </div>
      </div>);

  }
  return (
    <div className={`min-h-screen ${state.darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col font-inter transition-colors duration-300">
        <Navbar />
        <main className="flex-grow pt-[100px] md:pt-[104px]">
          {renderPage()}
        </main>
        <Footer />
        <MobileNav />
      </div>
    </div>);

}
export function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>);

}