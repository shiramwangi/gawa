import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { chickenInnAPI } from '../api/chickenInnAPI';

const ChickenInnMenuPage = ({ setCurrentPage, setSelectedFood, setSelectedRestaurant }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        const data = await chickenInnAPI.getFullMenu();
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
  const allMenuItems = menuData ? Object.values(menuData.categories || {}).flat() : [];

  // Filter menu items based on search and category
  const filteredMenuItems = allMenuItems.filter(item => {
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

  const categories = menuData ? ['all', ...Object.keys(menuData.categories || {})] : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-orange-600">Preparing Chicken Inn's delicious menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-orange-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-orange-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!menuData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-orange-600">No menu data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('restaurants')}
                className="text-orange-600 hover:text-orange-800 transition-colors duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Restaurants</span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-orange-900">{menuData.restaurant.name}</h1>
                  <p className="text-orange-600">{menuData.restaurant.location}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">★</span>
                <span className="font-semibold">4.1</span>
                <span className="text-orange-500">(1,500)</span>
              </div>
              <span className="text-orange-500">$$</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chicken Inn-themed Promotions Banner */}
      {menuData.promotions && menuData.promotions.length > 0 && (
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">🍗 Chicken Inn Deals & Promotions!</h3>
                <p className="text-sm opacity-90">Check out our 2 for Tuesday deals, family buckets, and student discounts</p>
              </div>
              <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300">
                View Offers
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deals Banner */}
      {menuData.deals && menuData.deals.length > 0 && (
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-3">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-md font-semibold">🔥 Hot Deals Today:</h4>
                <p className="text-sm opacity-90">{menuData.deals.slice(0, 3).join(' • ')}</p>
              </div>
              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Limited Time</span>
            </div>
          </div>
        </div>
      )}

      {/* Rewards Banner */}
      {menuData.rewards && menuData.rewards.available && (
        <div className="bg-gradient-to-r from-green-500 to-orange-500 text-white py-3">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-md font-semibold">🎁 {menuData.rewards.program}:</h4>
                <p className="text-sm opacity-90">{menuData.rewards.benefits.slice(0, 2).join(' • ')}</p>
              </div>
              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Join Now</span>
            </div>
          </div>
        </div>
      )}

      {/* Customization Banner */}
      {menuData.customization && menuData.customization.available && (
        <div className="bg-gradient-to-r from-purple-500 to-orange-500 text-white py-3">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-md font-semibold">🍗 Customize Your Chicken:</h4>
                <p className="text-sm opacity-90">Choose your chicken type, size, sauce, and sides to create your perfect meal</p>
              </div>
              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Customize</span>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Chicken Inn menu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-orange-50 border-0 rounded-lg focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all duration-300"
                />
                <svg className="w-5 h-5 text-orange-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      ? 'bg-orange-500 text-white'
                      : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
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
            <p className="text-orange-500 text-lg">No menu items found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenuItems.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => handleFoodItemClick(item)}
              >
                {/* Food Image */}
                <div className="relative h-48 bg-orange-100">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/images/food/placeholder-food.jpg'; // Fallback image
                    }}
                  />
                  
                  {/* Promo Badge */}
                  {item.isPromo && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {item.promoText}
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 bg-white bg-opacity-90 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                    {item.category}
                  </div>

                  {/* Signature badge */}
                  {item.signature && (
                    <div className="absolute bottom-3 left-3 bg-orange-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      🏆 Signature
                    </div>
                  )}

                  {/* Vegetarian badge */}
                  {item.vegetarian && (
                    <div className="absolute bottom-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      🌱 Veg
                    </div>
                  )}
                </div>

                {/* Food Details */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-orange-900 text-lg">{item.name}</h3>
                    <div className="text-right">
                      <span className="font-bold text-orange-600 text-xl">{item.price}</span>
                      {item.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">{item.originalPrice}</div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-orange-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                  
                  {/* Chicken-specific info */}
                  {item.mealType && item.includes && (
                    <div className="flex items-center justify-between text-xs text-orange-500 mb-3">
                      <span>🍗 {item.mealType}</span>
                      <span>📦 {item.includes.length} items</span>
                    </div>
                  )}
                  
                  {/* Additional Info */}
                  <div className="flex items-center justify-between text-xs text-orange-500 mb-3">
                    <span>🔥 {item.calories} cal</span>
                    <span>👥 {item.serves}</span>
                    {item.preparationTime && <span>⏱️ {item.preparationTime}</span>}
                  </div>

                  {/* Allergens */}
                  {item.allergens && item.allergens.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.allergens.map((allergen, allergenIndex) => (
                        <span key={allergenIndex} className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs">
                          {allergen}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Spice Level */}
                  {item.spiceLevel && item.spiceLevel !== 'None' && (
                    <div className="text-xs text-red-600 mb-3 font-medium">
                      🌶️ Spice Level: {item.spiceLevel}
                    </div>
                  )}
                  
                  {/* Share Button */}
                  <div className="pt-3 border-t border-orange-100">
                    <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-300">
                      Share with Friends →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Restaurant Info Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-orange-900 mb-2">About {menuData.restaurant.name}</h3>
            <p className="text-orange-600 mb-4">{menuData.restaurant.description}</p>
            
            {/* Restaurant stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{menuData.restaurant.founded}</div>
                <div className="text-sm text-orange-500">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{menuData.restaurant.branches}</div>
                <div className="text-sm text-orange-500">Branches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">4.1</div>
                <div className="text-sm text-orange-500">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">20-30</div>
                <div className="text-sm text-orange-500">Delivery (min)</div>
              </div>
            </div>

            {/* Specialties */}
            {menuData.restaurant.specialties && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-orange-700 mb-2">Our Specialties:</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {menuData.restaurant.specialties.map((specialty, index) => (
                    <span key={index} className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact and location info */}
            <div className="flex justify-center space-x-6 text-sm text-orange-500">
              <span>📍 {menuData.restaurant.location}</span>
              <span>📞 {menuData.restaurant.phone}</span>
              <span>🌐 <a href={menuData.restaurant.website} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Website</a></span>
            </div>

            {/* Popular locations */}
            {menuData.locations && menuData.locations.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-orange-700 mb-2">Our Locations:</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {menuData.locations.map((location, index) => (
                    <span key={index} className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs">
                      {location}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Deals Info */}
            {menuData.deals && menuData.deals.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-orange-700 mb-2">Current Deals:</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {menuData.deals.map((deal, index) => (
                    <span key={index} className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                      🔥 {deal}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Rewards Info */}
            {menuData.rewards && menuData.rewards.available && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-orange-700 mb-2">{menuData.rewards.program} Benefits:</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {menuData.rewards.benefits.map((benefit, index) => (
                    <span key={index} className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                      🎁 {benefit}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Customization Options */}
            {menuData.customization && menuData.customization.available && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-orange-700 mb-2">Customization Options:</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="text-xs font-medium text-orange-600 mb-1">Chicken Types:</h5>
                    <div className="flex flex-wrap justify-center gap-1">
                      {menuData.customization.options.chickenTypes.map((type, index) => (
                        <span key={index} className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs">
                          🍗 {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-orange-600 mb-1">Meal Sizes:</h5>
                    <div className="flex flex-wrap justify-center gap-1">
                      {menuData.customization.options.sizes.map((size, index) => (
                        <span key={index} className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs">
                          📏 {size}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-orange-600 mb-1">Sauce Options:</h5>
                    <div className="flex flex-wrap justify-center gap-1">
                      {menuData.customization.options.sauces.map((sauce, index) => (
                        <span key={index} className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                          🥫 {sauce}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-orange-600 mb-1">Side Options:</h5>
                    <div className="flex flex-wrap justify-center gap-1">
                      {menuData.customization.options.sides.map((side, index) => (
                        <span key={index} className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
                          🍟 {side}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChickenInnMenuPage;
