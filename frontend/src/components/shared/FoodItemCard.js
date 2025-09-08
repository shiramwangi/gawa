import React from 'react';
import { motion } from 'framer-motion';

const FoodItemCard = ({ 
  item, 
  index, 
  onClick, 
  theme = 'dark', // 'dark' or 'light'
  accentColor = 'orange' // 'orange', 'blue', 'green', 'red', 'purple'
}) => {
  const getAccentClasses = () => {
    const colors = {
      orange: {
        primary: 'bg-orange-500',
        secondary: 'bg-orange-600',
        text: 'text-orange-400',
        hover: 'hover:bg-orange-600',
        border: 'border-orange-500'
      },
      blue: {
        primary: 'bg-blue-500',
        secondary: 'bg-blue-600',
        text: 'text-blue-400',
        hover: 'hover:bg-blue-600',
        border: 'border-blue-500'
      },
      green: {
        primary: 'bg-green-500',
        secondary: 'bg-green-600',
        text: 'text-green-400',
        hover: 'hover:bg-green-600',
        border: 'border-green-500'
      },
      red: {
        primary: 'bg-red-500',
        secondary: 'bg-red-600',
        text: 'text-red-400',
        hover: 'hover:bg-red-600',
        border: 'border-red-500'
      },
      purple: {
        primary: 'bg-purple-500',
        secondary: 'bg-purple-600',
        text: 'text-purple-400',
        hover: 'hover:bg-purple-600',
        border: 'border-purple-500'
      }
    };
    return colors[accentColor] || colors.orange;
  };

  const getThemeClasses = () => {
    if (theme === 'dark') {
      return {
        bg: 'bg-gray-800',
        cardBg: 'bg-gray-800',
        text: 'text-white',
        textSecondary: 'text-gray-300',
        textMuted: 'text-gray-400',
        border: 'border-gray-700',
        hover: 'hover:bg-gray-700'
      };
    } else {
      return {
        bg: 'bg-white',
        cardBg: 'bg-white',
        text: 'text-gray-900',
        textSecondary: 'text-gray-700',
        textMuted: 'text-gray-500',
        border: 'border-gray-200',
        hover: 'hover:bg-gray-50'
      };
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Pizzas': '🍕',
      'Pasta': '🍝',
      'Chicken': '🍗',
      'Sides': '🍟',
      'Beverages': '🥤',
      'Desserts': '🍰',
      'Fresh Seafood': '🐟',
      'Ocean Platters': '🦐',
      'Coastal Specialties': '🦀',
      'Land & Sea': '🥩',
      'Appetizers & Starters': '🥗',
      'Burgers': '🍔',
      'Sandwiches': '🥪',
      'Salads': '🥗',
      'Soups': '🍲',
      'Grills': '🔥',
      'Curries': '🍛',
      'Rice Dishes': '🍚',
      'Noodles': '🍜',
      'Sushi': '🍣',
      'Steaks': '🥩',
      'BBQ': '🍖',
      'Vegetarian': '🥬',
      'Vegan': '🌱'
    };
    return icons[category] || '🍽️';
  };

  const accentClasses = getAccentClasses();
  const themeClasses = getThemeClasses();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className={`${themeClasses.cardBg} rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border ${themeClasses.border}`}
      onClick={() => onClick(item)}
    >
      {/* Food Image Section */}
      <div className={`relative h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden`}>
        {item.image && item.image !== '/images/food/placeholder-food.jpg' ? (
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Fallback Food Icon */}
        <div className={`flex flex-col items-center justify-center text-center ${item.image && item.image !== '/images/food/placeholder-food.jpg' ? 'hidden' : 'flex'}`}>
          <div className={`w-16 h-16 ${accentClasses.primary} rounded-full flex items-center justify-center mb-2 shadow-lg`}>
            <span className="text-2xl">{getCategoryIcon(item.category)}</span>
          </div>
          <p className={`${accentClasses.text} text-xs font-medium px-2`}>{item.category}</p>
        </div>
        
        {/* Promo Badge */}
        {item.isPromo && (
          <div className={`absolute top-3 left-3 ${accentClasses.primary} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}>
            {item.promoText}
          </div>
        )}
        
        {/* Category Badge */}
        <div className={`absolute top-3 right-3 bg-gray-900 bg-opacity-90 text-white px-2 py-1 rounded text-xs font-medium`}>
          {item.category}
        </div>

        {/* Signature badge */}
        {item.signature && (
          <div className={`absolute bottom-3 left-3 ${accentClasses.secondary} text-white px-2 py-1 rounded text-xs font-semibold shadow-lg`}>
            🏆 Signature
          </div>
        )}

        {/* Price Tag */}
        <div className={`absolute bottom-3 right-3 ${accentClasses.primary} text-white px-3 py-1 rounded-lg font-bold text-lg shadow-lg`}>
          {item.price}
        </div>
      </div>

      {/* Food Details */}
      <div className="p-4">
        <h3 className={`font-semibold ${themeClasses.text} text-lg mb-2`}>{item.name}</h3>
        
        <p className={`${themeClasses.textSecondary} text-sm mb-3 line-clamp-2`}>{item.description}</p>
        
        {/* Pizza-specific info */}
        {item.size && item.crust && (
          <div className={`flex items-center justify-between text-xs ${themeClasses.textMuted} mb-3`}>
            <span>🍕 {item.size}</span>
            <span>🥖 {item.crust}</span>
          </div>
        )}
        
        {/* Additional Info */}
        <div className={`flex items-center justify-between text-xs ${themeClasses.textMuted} mb-3`}>
          <span>🔥 {item.calories} cal</span>
          <span>👥 {item.serves}</span>
          {item.preparationTime && <span>⏱️ {item.preparationTime}</span>}
        </div>

        {/* Allergens */}
        {item.allergens && item.allergens.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.allergens.map((allergen, allergenIndex) => (
              <span key={allergenIndex} className={`bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs`}>
                {allergen}
              </span>
            ))}
          </div>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className={`bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs`}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Spice Level */}
        {item.spiceLevel && item.spiceLevel !== 'None' && (
          <div className="text-xs text-red-400 mb-3 font-medium">
            🌶️ Spice Level: {item.spiceLevel}
          </div>
        )}
        
        {/* Share Button */}
        <div className={`pt-3 border-t ${themeClasses.border}`}>
          <button className={`w-full ${accentClasses.primary} text-white py-2 px-4 rounded-lg font-medium ${accentClasses.hover} transition-colors duration-300`}>
            Share with Friends →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodItemCard;
