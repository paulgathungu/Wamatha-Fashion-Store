import React, { useMemo, useState } from 'react';
import {
  FilterIcon,
  ChevronDownIcon,
  GridIcon,
  ListIcon,
  XIcon } from
'lucide-react';
import { useStore } from '../context/StoreContext';
import { products, categories, brands } from '../data/products';
export function ShopPage() {
  const { state, dispatch, formatPrice } = useStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(500);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('newest');
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '7', '8', '9', '10', '11'];
  const allColors = [
  {
    name: 'Black',
    hex: '#000000'
  },
  {
    name: 'White',
    hex: '#FFFFFF'
  },
  {
    name: 'Red',
    hex: '#DC2626'
  },
  {
    name: 'Blue',
    hex: '#2563EB'
  },
  {
    name: 'Green',
    hex: '#16A34A'
  },
  {
    name: 'Gray',
    hex: '#6B7280'
  }];

  const handleNavigate = (id: string) => {
    dispatch({
      type: 'SET_CURRENT_PAGE',
      payload: `product-${id}`
    });
    window.scrollTo(0, 0);
  };
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
    prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };
  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
    prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
    prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };
  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }
    result = result.filter((p) => p.price <= priceRange);
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
      p.sizes.some((s) => selectedSizes.includes(s))
      );
    }
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
      p.colors.some((c) => selectedColors.includes(c.name))
      );
    }
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
      default:
        // Mock newest sort
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }
    return result;
  }, [
  selectedCategory,
  priceRange,
  selectedSizes,
  selectedColors,
  selectedBrands,
  sortBy]
  );
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
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-white font-medium">Shop</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-md font-medium text-gray-900 dark:text-white">
            
            <FilterIcon size={18} /> Filters
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {filteredProducts.length} Results
            </span>
          </div>
        </div>

        {/* Sidebar Filters */}
        <aside
          className={`
          fixed inset-0 z-50 bg-white dark:bg-gray-900 lg:bg-transparent lg:static lg:block lg:w-64 flex-shrink-0 overflow-y-auto lg:overflow-visible transition-transform duration-300
          ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          
          <div className="p-4 lg:p-0">
            <div className="flex justify-between items-center lg:hidden mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Filters
              </h2>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="text-gray-500 hover:text-red-700">
                
                <XIcon size={24} />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 uppercase text-sm tracking-wider">
                Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`text-sm ${selectedCategory === 'All' ? 'text-red-700 font-bold' : 'text-gray-600 dark:text-gray-400 hover:text-red-700'}`}>
                    
                    All Categories
                  </button>
                </li>
                {categories.map((cat) =>
                <li key={cat.id}>
                    <button
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`text-sm ${selectedCategory === cat.name ? 'text-red-700 font-bold' : 'text-gray-600 dark:text-gray-400 hover:text-red-700'}`}>
                    
                      {cat.name}
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Price Range */}
            <div className="mb-8 border-t border-gray-200 dark:border-gray-800 pt-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 uppercase text-sm tracking-wider">
                Price Range
              </h3>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-red-700" />
              
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                <span>{formatPrice(0)}</span>
                <span>{formatPrice(priceRange)}</span>
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8 border-t border-gray-200 dark:border-gray-800 pt-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 uppercase text-sm tracking-wider">
                Sizes
              </h3>
              <div className="flex flex-wrap gap-2">
                {allSizes.map((size) =>
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`w-10 h-10 flex items-center justify-center text-sm border rounded-md transition-colors ${selectedSizes.includes(size) ? 'bg-red-700 border-red-700 text-white' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:border-red-700'}`}>
                  
                    {size}
                  </button>
                )}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-8 border-t border-gray-200 dark:border-gray-800 pt-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 uppercase text-sm tracking-wider">
                Colors
              </h3>
              <div className="flex flex-wrap gap-3">
                {allColors.map((color) =>
                <button
                  key={color.name}
                  onClick={() => toggleColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColors.includes(color.name) ? 'border-red-700 scale-110' : 'border-transparent hover:scale-110'}`}
                  style={{
                    backgroundColor: color.hex
                  }}
                  title={color.name}>
                  
                    {/* Inner border for white color */}
                    {color.hex === '#FFFFFF' &&
                  <div className="w-full h-full rounded-full border border-gray-200"></div>
                  }
                  </button>
                )}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-8 border-t border-gray-200 dark:border-gray-800 pt-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 uppercase text-sm tracking-wider">
                Brands
              </h3>
              <div className="space-y-2">
                {brands.map((brand) =>
                <label
                  key={brand}
                  className="flex items-center cursor-pointer">
                  
                    <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="rounded border-gray-300 text-red-700 focus:ring-red-700 bg-white dark:bg-gray-800" />
                  
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {brand}
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Apply Filters Mobile */}
            <div className="lg:hidden mt-8">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full bg-red-700 text-white py-3 rounded-md font-bold">
                
                Apply Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="hidden lg:flex justify-between items-center mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Showing{' '}
              <span className="font-bold text-gray-900 dark:text-white">
                {filteredProducts.length}
              </span>{' '}
              results
            </span>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Sort by:
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-transparent border-none text-sm font-medium text-gray-900 dark:text-white pr-6 focus:ring-0 cursor-pointer">
                    
                    <option value="newest">Newest</option>
                    <option value="popular">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDownIcon
                    size={16}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  
                </div>
              </div>

              <div className="flex items-center gap-2 border-l border-gray-200 dark:border-gray-700 pl-6">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded ${viewMode === 'grid' ? 'text-red-700 bg-red-50 dark:bg-gray-700' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                  
                  <GridIcon size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1 rounded ${viewMode === 'list' ? 'text-red-700 bg-red-50 dark:bg-gray-700' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                  
                  <ListIcon size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid/List */}
          {filteredProducts.length === 0 ?
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters to find what you're looking for.
              </p>
              <button
              onClick={() => {
                setSelectedCategory('All');
                setPriceRange(1000);
                setSelectedSizes([]);
                setSelectedColors([]);
                setSelectedBrands([]);
              }}
              className="bg-red-700 text-white px-6 py-2 rounded-md font-medium">
              
                Clear All Filters
              </button>
            </div> :

          <div
            className={
            viewMode === 'grid' ?
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' :
            'flex flex-col gap-6'
            }>
            
              {filteredProducts.map((product) =>
            <div
              key={product.id}
              className={`group bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 ${viewMode === 'list' ? 'flex flex-row h-48' : ''}`}>
              
                  <div
                className={`relative overflow-hidden cursor-pointer ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-[4/5]'}`}
                onClick={() => handleNavigate(product.id)}>
                
                    <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                    {product.isNew &&
                <span className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
                        NEW
                      </span>
                }
                  </div>

                  <div
                className={`p-5 flex flex-col justify-center ${viewMode === 'list' ? 'flex-1' : ''}`}
                onClick={() => handleNavigate(product.id)}>
                
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {product.brand}
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2 truncate">
                      {product.name}
                    </h3>
                    {viewMode === 'list' &&
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                }
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-bold text-lg text-red-700 dark:text-red-500">
                        {formatPrice(product.price)}
                      </span>
                      <button
                    onClick={(e) => {
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
                    }}
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-red-700 hover:text-white text-gray-900 dark:text-white p-2 rounded-full transition-colors">
                    
                        <ShoppingCartIcon size={18} />
                      </button>
                    </div>
                  </div>
                </div>
            )}
            </div>
          }

          {/* Pagination Mock */}
          {filteredProducts.length > 0 &&
          <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-2">
                <button
                className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
                disabled>
                
                  &lt;
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-md bg-red-700 text-white font-medium">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium">
                  3
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800">
                  &gt;
                </button>
              </nav>
            </div>
          }
        </div>
      </div>
    </div>);

}