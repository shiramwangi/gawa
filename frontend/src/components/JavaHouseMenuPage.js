import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import javaHouseAPI from '../api/javaHouseAPI';
import FoodItemCard from './shared/FoodItemCard';

const JavaHouseMenuPage = ({ setCurrentPage, setSelectedFood, setSelectedRestaurant }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        const data = await javaHouseAPI.getFullMenu();
        setMenuData(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
        setError('Failed to load menu. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  // Get all menu items for filtering
  const allMenuItems = menuData ? (menuData.menu || []) : [];
  
  // Debug: Log the menu data structure
  console.log('🔍 Java House Menu Data:', menuData);
  console.log('🔍 All Menu Items:', allMenuItems);
  console.log('🔍 First few items:', allMenuItems.slice(0, 3));

  // Ensure allMenuItems is always an array
  const safeMenuItems = Array.isArray(allMenuItems) ? allMenuItems : [];

  // Get unique categories from menu items
  const categories = menuData ? ['all', ...new Set(safeMenuItems.map(item => item?.category).filter(Boolean))] : [];

  // Filter menu items based on search and category
  const filteredMenuItems = safeMenuItems.filter(item => {
    // Add null checks to prevent errors
    if (!item || !item.name || !item.description) {
      console.warn('⚠️ Skipping invalid menu item:', item);
      return false;
    }

    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFoodItemClick = (food) => {
    setSelectedFood(food);
    setSelectedRestaurant(menuData.restaurant);
    setCurrentPage('food-sharing');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brown-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brown-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-brown-600">Brewing Java House's delicious menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brown-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-brown-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-brown-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-brown-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brown-600 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!menuData || !menuData.menu) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-red-400">Loading Java House menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('restaurants')}
                className="text-red-400 hover:text-red-300 transition-colors duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Restaurants</span>
              </button>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h1 className="text-3xl font-bold text-white">{menuData.restaurant.name}</h1>
                </div>
                <p className="text-gray-300">{menuData.restaurant.location}</p>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2 text-white">
                  <span className="text-yellow-400">★</span>
                  <span>4.6 (2,156)</span>
                </div>
                <p className="text-gray-300">$$</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Java House menu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-red-500 focus:bg-gray-600 transition-all duration-300 text-white placeholder-gray-400"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors duration-300 ${
                    selectedCategory === category
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category === 'all' ? 'All Items' : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {filteredMenuItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No menu items found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenuItems.map((item, index) => (
              <FoodItemCard
                key={item.id || index}
                item={item}
                index={index}
                onClick={handleFoodItemClick}
                theme="dark"
                accentColor="red"
              />
            ))}
          </div>
        )}
      </div>

      {/* Restaurant Info Footer */}
      <div className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-400 mb-2">About {menuData.restaurant.name}</h3>
            <p className="text-gray-300 mb-4">Kenya's premier coffee house chain, serving quality coffee and international cuisine since 1999</p>
            
            {/* Restaurant stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">1999</div>
                <div className="text-sm text-gray-400">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">50+</div>
                <div className="text-sm text-gray-400">Branches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">4.6</div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">25-40</div>
                <div className="text-sm text-gray-400">Delivery (min)</div>
              </div>
            </div>

            {/* Contact and location info */}
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <span>📍 {menuData.restaurant.location}</span>
              <span>📞 {menuData.restaurant.phone}</span>
              <span>🌐 <a href={menuData.restaurant.website} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300">Website</a></span>
            </div>

            {/* Popular locations */}
            {menuData.locations && menuData.locations.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Popular Locations:</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {menuData.locations.slice(0, 8).map((location, index) => (
                    <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">
                      {location}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaHouseMenuPage;
