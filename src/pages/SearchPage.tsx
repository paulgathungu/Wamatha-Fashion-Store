import React, { useEffect, useState } from 'react';
import { SearchIcon, TrendingUpIcon, XIcon, ArrowRightIcon } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
export function SearchPage() {
  const { state, dispatch, formatPrice } = useStore();
  const [query, setQuery] = useState(state.searchQuery || '');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const trendingSearches = [
  'Nike Sneakers',
  'Summer Dresses',
  'Leather Jackets',
  'Running Shoes',
  'Accessories'];

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    setIsSearching(true);
    // Simulate API delay
    const timer = setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const filtered = products.filter(
        (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
      );
      setResults(filtered);
      setIsSearching(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'SET_SEARCH_QUERY',
      payload: query
    });
  };
  const clearSearch = () => {
    setQuery('');
    dispatch({
      type: 'SET_SEARCH_QUERY',
      payload: ''
    });
  };
  const handleTrendingClick = (term: string) => {
    setQuery(term);
    dispatch({
      type: 'SET_SEARCH_QUERY',
      payload: term
    });
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[70vh]">
      {/* Search Header */}
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white mb-6 text-center">
          What are you looking for?
        </h1>
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full pl-12 pr-12 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-0 focus:border-red-700 transition-colors text-lg"
            placeholder="Search products, brands, categories..."
            autoFocus />
          
          {query &&
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-700">
            
              <XIcon className="h-5 w-5" />
            </button>
          }
        </form>

        {/* Trending Searches */}
        {!query &&
        <div className="mt-8">
            <div className="flex items-center text-gray-500 mb-4">
              <TrendingUpIcon size={18} className="mr-2" />
              <span className="font-medium">Trending Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((term) =>
            <button
              key={term}
              onClick={() => handleTrendingClick(term)}
              className="bg-gray-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium transition-colors">
              
                  {term}
                </button>
            )}
            </div>
          </div>
        }
      </div>

      {/* Search Results */}
      {query &&
      <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {isSearching ? 'Searching...' : `Results for "${query}"`}
            </h2>
            {!isSearching &&
          <span className="text-gray-500">
                {results.length} items found
              </span>
          }
          </div>

          {isSearching ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) =>
          <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-800 aspect-[4/5] rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-2"></div>
                  <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
                </div>
          )}
            </div> :
        results.length > 0 ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((product) =>
          <div
            key={product.id}
            className="group cursor-pointer"
            onClick={() =>
            dispatch({
              type: 'SET_CURRENT_PAGE',
              payload: `product-${product.id}`
            })
            }>
            
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-4 bg-gray-100 dark:bg-gray-800">
                    <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              
                  </div>
                  <div className="text-xs text-gray-500 mb-1">
                    {product.brand}
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1 truncate">
                    {product.name}
                  </h3>
                  <div className="font-bold text-red-700 dark:text-red-500">
                    {formatPrice(product.price)}
                  </div>
                </div>
          )}
            </div> :

        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                We couldn't find anything matching "{query}". Try checking your
                spelling or using more general terms.
              </p>
              <button
            onClick={() =>
            dispatch({
              type: 'SET_CURRENT_PAGE',
              payload: 'shop'
            })
            }
            className="bg-red-700 text-white px-6 py-3 rounded-md font-medium inline-flex items-center">
            
                Browse All Products{' '}
                <ArrowRightIcon size={18} className="ml-2" />
              </button>
            </div>
        }
        </div>
      }
    </div>);

}