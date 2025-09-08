import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getRestaurantsInNairobi, getRestaurantMenu } from '../api/restaurants';

const RestaurantsPage = ({ setCurrentPage, setSelectedFood, setSelectedRestaurant }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRestaurant, setSelectedRestaurantLocal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [restaurantMenus, setRestaurantMenus] = useState({});

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const restaurantData = await getRestaurantsInNairobi();
        setRestaurants(restaurantData);
        
        // Fetch menus for each restaurant
        const menus = {};
        for (const restaurant of restaurantData) {
          const menu = await getRestaurantMenu(restaurant.id, restaurant.name);
          menus[restaurant.id] = menu;
        }
        setRestaurantMenus(menus);
        
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setError('Failed to load restaurants. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRestaurantClick = (restaurant) => {
    // Special handling for Carnivore Restaurant
    if (restaurant.name === "Carnivore Restaurant") {
      setCurrentPage('carnivore-menu');
      return;
    }
    
    // Special handling for Java House
    if (restaurant.name === "Java House") {
      setCurrentPage('java-house-menu');
      return;
    }
    
    // Special handling for Tamarind Restaurant
    if (restaurant.name === "Tamarind Restaurant") {
      setCurrentPage('tamarind-menu');
      return;
    }
    
    // Special handling for ArtCafe
    if (restaurant.name === "ArtCafe") {
      setCurrentPage('artcafe-menu');
      return;
    }
    
    // Special handling for Nyama Mama
    if (restaurant.name === "Nyama Mama") {
      setCurrentPage('nyama-mama-menu');
      return;
    }
    
    // Special handling for KFC
    if (restaurant.name === "KFC") {
      setCurrentPage('kfc-menu');
      return;
    }
    
    // Special handling for Pizza Hut
    if (restaurant.name === "Pizza Hut") {
      setCurrentPage('pizza-hut-menu');
      return;
    }
    
    // Special handling for Burger King
    if (restaurant.name === "Burger King") {
      setCurrentPage('burger-king-menu');
      return;
    }
    
    // Special handling for Subway
    if (restaurant.name === "Subway") {
      setCurrentPage('subway-menu');
      return;
    }
    
    // Special handling for Domino's
    if (restaurant.name === "Domino's Pizza") {
      setCurrentPage('dominos-menu');
      return;
    }
    
                // Special handling for Pizza Inn
            if (restaurant.name === "Pizza Inn") {
              setCurrentPage('pizza-inn-menu');
              return;
            }

            // Special handling for Chicken Inn
            if (restaurant.name === "Chicken Inn") {
              setCurrentPage('chicken-inn-menu');
              return;
            }

            // Special handling for Papa John's
            if (restaurant.name === "Papa John's") {
              setCurrentPage('papa-johns-menu');
              return;
            }
    
    setSelectedRestaurantLocal(restaurant);
  };

  const handleFoodItemClick = (food, restaurant) => {
    setSelectedFood(food);
    setSelectedRestaurant(restaurant);
    setCurrentPage('food-sharing');
  };

  const closeModal = () => {
    setSelectedRestaurantLocal(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Discovering amazing restaurants in Nairobi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Glovo-style Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo and Back Button */}
            <div className="flex items-center space-x-4">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setCurrentPage('home')}
                className="text-gray-600 hover:text-green-600 transition-colors duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back</span>
              </motion.button>
              
              {/* Gawa Logo with Pin */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <span className="text-2xl font-bold text-gray-900">Gawa</span>
              </div>
            </div>

            {/* Center: Location Selector */}
            <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-900 font-medium">Langata Road</span>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Right: Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-300"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">G</span>
              </div>
              <span className="text-gray-900 font-medium">Guest</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-gray-700 hover:text-green-600 transition-colors duration-300">
              Promotions
            </button>
            <button className="px-4 py-2 text-gray-700 hover:text-green-600 transition-colors duration-300 flex items-center space-x-1">
              <span>Food type</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="px-4 py-2 text-gray-700 hover:text-green-600 transition-colors duration-300 flex items-center space-x-1">
              <span>Sort by</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="px-4 py-2 text-gray-700 hover:text-green-600 transition-colors duration-300 flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <span>Top Rated</span>
            </button>
          </div>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No restaurants found matching your search.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRestaurantClick(restaurant)}
                className="bg-white rounded-lg overflow-hidden cursor-pointer border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-full h-40 object-cover"
                  />
                  
                  {/* Promotional Banner */}
                  {restaurant.type === 'chain' && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-white px-2 py-1 rounded text-xs font-semibold">
                      -{Math.floor(Math.random() * 50) + 10}% some items
                    </div>
                  )}
                  
                  {/* Restaurant Logo/Brand */}
                  <div className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                    <span className="text-xs font-bold text-gray-800">
                      {restaurant.name.charAt(0)}
                    </span>
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-1">{restaurant.name}</h3>
                  
                  {/* Delivery Info */}
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">F</span>
                      </div>
                      <span>Free</span>
                    </div>
                    <span>•</span>
                    <span>{Math.floor(Math.random() * 20) + 15}-{Math.floor(Math.random() * 20) + 25} min</span>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 9V5a3 3 0 00-6 0v4H4a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2v-8a2 2 0 00-2-2h-4z"/>
                    </svg>
                    <span className="text-xs text-gray-600">
                      {Math.floor(Math.random() * 10) + 90}% ({Math.floor(Math.random() * 500) + 50}+)
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Restaurant Modal */}
      {selectedRestaurant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <img 
                src={selectedRestaurant.image} 
                alt={selectedRestaurant.name} 
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedRestaurant.name}</h2>
              <p className="text-gray-600 mb-4">{selectedRestaurant.location}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-gray-600">{selectedRestaurant.rating}</span>
                  <span className="text-gray-400">({selectedRestaurant.userRatingsTotal} reviews)</span>
                </div>
                <span className="text-gray-500">{selectedRestaurant.priceRange}</span>
              </div>
              
              <p className="text-gray-600 mb-6">{selectedRestaurant.cuisine}</p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Menu Items - Click to Share</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {restaurantMenus[selectedRestaurant.id]?.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 cursor-pointer border border-gray-200 hover:border-green-300"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleFoodItemClick(item, selectedRestaurant)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <span className="font-bold text-green-600 text-lg">{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                      <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                        Share with Friends →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors duration-300"
                >
                  Close Menu
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RestaurantsPage;
