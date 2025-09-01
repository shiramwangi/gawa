const fs = require('fs');
const path = require('path');

// List of restaurant menu pages to update
const restaurantPages = [
  'JavaHouseMenuPage.js',
  'TamarindMenuPage.js', 
  'ArtCafeMenuPage.js',
  'NyamaMamaMenuPage.js',
  'KFCMenuPage.js',
  'PizzaHutMenuPage.js',
  'BurgerKingMenuPage.js',
  'SubwayMenuPage.js',
  'DominosMenuPage.js',
  'PizzaInnMenuPage.js',
  'ChickenInnMenuPage.js'
];

// Color themes for each restaurant
const restaurantThemes = {
  'JavaHouseMenuPage.js': 'blue',
  'TamarindMenuPage.js': 'green', 
  'ArtCafeMenuPage.js': 'purple',
  'NyamaMamaMenuPage.js': 'orange',
  'KFCMenuPage.js': 'red',
  'PizzaHutMenuPage.js': 'red',
  'BurgerKingMenuPage.js': 'red',
  'SubwayMenuPage.js': 'green',
  'DominosMenuPage.js': 'blue',
  'PizzaInnMenuPage.js': 'red',
  'ChickenInnMenuPage.js': 'red'
};

console.log('🔄 Updating restaurant menu pages to use new FoodItemCard component...');

restaurantPages.forEach(pageName => {
  const filePath = path.join(__dirname, 'src', 'components', pageName);
  
  if (fs.existsSync(filePath)) {
    console.log(`📝 Updating ${pageName}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add import for FoodItemCard
    if (!content.includes('import FoodItemCard')) {
      content = content.replace(
        /import React, { useState, useEffect } from 'react';/,
        `import React, { useState, useEffect } from 'react';
import FoodItemCard from './shared/FoodItemCard';`
      );
    }
    
    // Replace the menu items grid with FoodItemCard
    const menuItemsPattern = /<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">[\s\S]*?<\/div>/;
    const newMenuItems = `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMenuItems.map((item, index) => (
                    <FoodItemCard
                      key={item.id || index}
                      item={item}
                      index={index}
                      onClick={handleFoodItemClick}
                      theme="dark"
                      accentColor="${restaurantThemes[pageName]}"
                    />
                  ))}
                </div>`;
    
    if (content.match(menuItemsPattern)) {
      content = content.replace(menuItemsPattern, newMenuItems);
    }
    
    // Update background colors to dark theme
    content = content.replace(/bg-gradient-to-br from-\w+-50 to-white/g, 'bg-gray-900');
    content = content.replace(/bg-white/g, 'bg-gray-800');
    content = content.replace(/border-gray-200/g, 'border-gray-700');
    
    // Update text colors
    content = content.replace(/text-gray-900/g, 'text-white');
    content = content.replace(/text-gray-800/g, 'text-white');
    content = content.replace(/text-gray-700/g, 'text-gray-300');
    content = content.replace(/text-gray-600/g, 'text-gray-400');
    content = content.replace(/text-gray-500/g, 'text-gray-400');
    
    // Update search input
    content = content.replace(/bg-gray-100/g, 'bg-gray-700');
    content = content.replace(/focus:bg-white/g, 'focus:bg-gray-600');
    content = content.replace(/placeholder-gray-500/g, 'placeholder-gray-400');
    
    // Update category filter buttons
    content = content.replace(/bg-gray-200 text-gray-700 hover:bg-gray-300/g, 'bg-gray-700 text-gray-300 hover:bg-gray-600');
    
    // Update loading and error states
    content = content.replace(/bg-gray-50/g, 'bg-gray-900');
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${pageName}`);
  } else {
    console.log(`⚠️  File not found: ${pageName}`);
  }
});

console.log('🎉 All restaurant menu pages updated!');
console.log('💡 Each restaurant now uses:');
console.log('   - Dark theme (bg-gray-900, bg-gray-800)');
console.log('   - FoodItemCard component for consistent styling');
console.log('   - Unique accent colors for brand identity');
console.log('   - Proper fallback images with category icons');
