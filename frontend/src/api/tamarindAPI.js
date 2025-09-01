// Tamarind Restaurant API Integration Service
// Using TheMealDB API for real seafood dishes

// Base configuration
const TAMARIND_CONFIG = {
  name: 'Tamarind Restaurant',
  location: 'Mombasa & Nairobi, Kenya',
  phone: '+254 20 600 5923',
  website: 'https://www.tamarind.co.ke',
  coordinates: { lat: -4.0435, lng: 39.6682 }, // Mombasa location
  description: 'Kenya\'s premier seafood restaurant with locations in Mombasa and Nairobi',
  founded: 1980,
  branches: 2,
  specialties: ['Seafood', 'Fine Dining', 'Ocean Views', 'Fresh Catch']
};

// TheMealDB API for real seafood dishes
const THEMEALDB_API = {
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  endpoints: {
    seafood: '/filter.php?c=Seafood'
  }
};

// Option 1: Direct API endpoints (if Tamarind has them)
const TAMARIND_DIRECT_API = {
  baseURL: 'https://api.tamarind.co.ke', 
  endpoints: {
    menu: '/api/v1/menu',
    promotions: '/api/v1/promotions',
    reservations: '/api/v1/reservations',
    delivery: '/api/v1/delivery',
    dailyCatch: '/api/v1/daily-catch'
  }
};

// Option 2: Jumia Food API integration
const JUMIA_FOOD_API = {
  baseURL: 'https://food.jumia.co.ke/api',
  endpoints: {
    search: '/restaurants/search',
    menu: '/restaurants/{id}/menu',
    categories: '/categories'
  },
  headers: {
    'Authorization': 'Bearer YOUR_JUMIA_API_KEY',
    'Content-Type': 'application/json'
  }
};

// Option 3: Glovo API integration
const GLOVO_API = {
  baseURL: 'https://api.glovoapp.com',
  endpoints: {
    restaurants: '/v3/restaurants',
    menu: '/v3/restaurants/{id}/menu',
    categories: '/v3/categories'
  },
  headers: {
    'Authorization': 'Bearer YOUR_GLOVO_API_KEY',
    'Content-Type': 'application/json'
  }
};

// Main API functions
export const tamarindAPI = {
  // Get full menu with real-time data
  async getFullMenu() {
    try {
      // Try TheMealDB API first for real seafood data
      const realSeafoodMenu = await this.getRealSeafoodMenu();
      if (realSeafoodMenu) return realSeafoodMenu;

      // Fallback to enhanced mock data
      return this.getEnhancedMockMenu();
    } catch (error) {
      console.error('Error fetching Tamarind menu:', error);
      return this.getEnhancedMockMenu();
    }
  },

  // Get real seafood data from TheMealDB API
  async getRealSeafoodMenu() {
    try {
      console.log('🐟 Fetching real seafood data from TheMealDB API for Tamarind...');
      
      const response = await fetch(`${THEMEALDB_API.baseURL}${THEMEALDB_API.endpoints.seafood}`);
      
      if (!response.ok) {
        throw new Error(`TheMealDB API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ TheMealDB API response:', data);
      
      if (data.meals && data.meals.length > 0) {
        const seafoodDishes = data.meals.map((meal, index) => ({
          id: meal.idMeal || `seafood-${index}`,
          name: meal.strMeal || 'Seafood Dish',
          description: this.generateDescription(meal.strMeal),
          price: this.generatePrice(1500, 3500),
          image: meal.strMealThumb || '/images/food/placeholder-food.jpg',
          category: 'Seafood',
          calories: this.generateCalories(300, 800),
          serves: '2-3 people',
          preparationTime: '45-90 min',
          isPromo: Math.random() > 0.7,
          promoText: 'Fresh Catch Special!',
          signature: Math.random() > 0.8,
          vegetarian: false,
          allergens: ['Fish', 'Shellfish', 'Gluten', 'Dairy', 'Eggs'],
          tags: this.generateTags(meal.strMeal),
          size: this.generateSize(),
          crust: null,
          spiceLevel: this.generateSpiceLevel(meal.strMeal),
          originalPrice: null,
          seafoodType: this.detectSeafoodType(meal.strMeal),
          cookingMethod: this.generateCookingMethod(meal.strMeal),
          origin: this.detectOrigin(meal.strMeal),
          freshCatch: this.isFreshCatch(meal.strMeal)
        }));
        
        console.log('🐟 Transformed seafood dishes for Tamarind:', seafoodDishes);
        
        return {
          restaurant: TAMARIND_CONFIG,
          menu: seafoodDishes,
          categories: {
            'Seafood': seafoodDishes
          },
          customization: {
            available: true,
            options: {
              doneness: ['Rare', 'Medium Rare', 'Medium', 'Medium Well', 'Well Done'],
              fishTypes: ['Salmon', 'Tuna', 'Sea Bass', 'Red Snapper', 'Mahi Mahi', 'Grouper'],
              sauces: ['Lemon Butter', 'White Wine', 'Garlic Herb', 'Coconut Curry', 'Mango Salsa', 'Chimichurri'],
              sides: ['Grilled Vegetables', 'Coconut Rice', 'Steamed Rice', 'Fresh Salad', 'Garlic Bread', 'Fries'],
              spices: ['Black Pepper', 'Garlic', 'Lemon', 'Dill', 'Thyme', 'Coriander']
            }
          },
          deals: [
            'Fresh Catch Monday: 25% off all seafood dishes',
            'Ocean View Package: Dinner + Sunset views for KES 4,500',
            'Seafood Platter Special: 4 types of fish + sides for KES 3,800'
          ],
          rewards: {
            available: true,
            program: 'Tamarind Rewards',
            benefits: [
              'Earn points on every seafood meal',
              'Free appetizer after 5 visits',
              'Birthday month: Complimentary dessert',
              'Exclusive access to daily catch specials'
            ]
          },
          locations: [
            'Mombasa Waterfront',
            'Nairobi CBD',
            'Private Dining Available',
            'Ocean View Terraces'
          ]
        };
      }
      
      console.log('❌ No valid seafood data found in TheMealDB response');
      return null;
      
    } catch (error) {
      console.error('❌ Error fetching real seafood data:', error);
      return null;
    }
  },

  // Generate description based on meal name with seafood focus
  generateDescription(mealName) {
    const descriptions = [
      `Fresh ${mealName} - caught daily and prepared with premium ingredients`,
      `Premium ${mealName} - ocean-fresh seafood with expert preparation`,
      `Chef's Special ${mealName} - signature dish with local spices`,
      `Fine Dining ${mealName} - elegant presentation with ocean views`,
      `Signature ${mealName} - our most popular seafood creation`
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  },

  // Generate random price between min and max
  generatePrice(min, max) {
    const price = Math.floor(Math.random() * (max - min + 1)) + min;
    return `KES ${price.toLocaleString()}`;
  },

  // Generate random calories between min and max
  generateCalories(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // Generate tags based on seafood dish name
  generateTags(mealName) {
    const tags = ['Fresh Catch', 'Ocean Fresh', 'Premium Seafood'];
    
    if (mealName.toLowerCase().includes('salmon')) tags.push('Salmon', 'Omega-3');
    if (mealName.toLowerCase().includes('tuna')) tags.push('Tuna', 'Protein Rich');
    if (mealName.toLowerCase().includes('prawn')) tags.push('Prawns', 'Shellfish');
    if (mealName.toLowerCase().includes('fish')) tags.push('Fish', 'Fresh');
    if (mealName.toLowerCase().includes('sushi')) tags.push('Sushi', 'Japanese');
    if (mealName.toLowerCase().includes('curry')) tags.push('Curry', 'Spicy');
    if (mealName.toLowerCase().includes('grilled')) tags.push('Grilled', 'Healthy');
    if (mealName.toLowerCase().includes('baked')) tags.push('Baked', 'Light');
    
    return tags.slice(0, 6); // Return max 6 tags
  },

  // Generate random size
  generateSize() {
    const sizes = ['Regular', 'Large', 'Family Size'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  },

  // Generate spice level based on meal name
  generateSpiceLevel(mealName) {
    const spicyKeywords = ['curry', 'chilli', 'spicy', 'hot', 'pepper', 'cajun'];
    if (spicyKeywords.some(keyword => mealName.toLowerCase().includes(keyword))) {
      return 'Medium-Hot';
    }
    return 'Mild';
  },

  // Detect seafood type based on meal name
  detectSeafoodType(mealName) {
    if (mealName.toLowerCase().includes('salmon')) return 'Salmon';
    if (mealName.toLowerCase().includes('tuna')) return 'Tuna';
    if (mealName.toLowerCase().includes('prawn')) return 'Prawns';
    if (mealName.toLowerCase().includes('fish')) return 'Fish';
    if (mealName.toLowerCase().includes('sardine')) return 'Sardines';
    if (mealName.toLowerCase().includes('herring')) return 'Herring';
    return 'Mixed Seafood';
  },

  // Generate cooking method based on meal name
  generateCookingMethod(mealName) {
    if (mealName.toLowerCase().includes('grilled')) return 'Grilled';
    if (mealName.toLowerCase().includes('baked')) return 'Baked';
    if (mealName.toLowerCase().includes('fried')) return 'Fried';
    if (mealName.toLowerCase().includes('steamed')) return 'Steamed';
    if (mealName.toLowerCase().includes('curry')) return 'Curried';
    if (mealName.toLowerCase().includes('stew')) return 'Stewed';
    return 'Chef\'s Choice';
  },

  // Detect origin/cuisine based on meal name
  detectOrigin(mealName) {
    if (mealName.toLowerCase().includes('sushi')) return 'Japanese';
    if (mealName.toLowerCase().includes('curry')) return 'Asian';
    if (mealName.toLowerCase().includes('cajun')) return 'American';
    if (mealName.toLowerCase().includes('mediterranean')) return 'Mediterranean';
    if (mealName.toLowerCase().includes('portuguese')) return 'Portuguese';
    if (mealName.toLowerCase().includes('polish')) return 'Polish';
    return 'International';
  },

  // Check if dish is fresh catch
  isFreshCatch(mealName) {
    const freshKeywords = ['fresh', 'grilled', 'baked', 'steamed', 'salmon', 'tuna'];
    return freshKeywords.some(keyword => mealName.toLowerCase().includes(keyword));
  },

  // Try direct Tamarind API
  async getDirectMenu() {
    try {
      const response = await fetch(`${TAMARIND_DIRECT_API.baseURL}${TAMARIND_DIRECT_API.endpoints.menu}`);
      if (response.ok) {
        const data = await response.json();
        return this.transformDirectMenuData(data);
      }
    } catch (error) {
      console.log('Direct API not available, trying alternatives...');
    }
    return null;
  },

  // Try Jumia Food API
  async getJumiaMenu() {
    try {
      // Search for Tamarind on Jumia Food
      const searchResponse = await fetch(`${JUMIA_FOOD_API.baseURL}${JUMIA_FOOD_API.endpoints.search}?q=tamarind`, {
        headers: JUMIA_FOOD_API.headers
      });
      
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        const tamarindId = this.findTamarindId(searchData);
        
        if (tamarindId) {
          const menuResponse = await fetch(`${JUMIA_FOOD_API.baseURL}${JUMIA_FOOD_API.endpoints.menu.replace('{id}', tamarindId)}`, {
            headers: JUMIA_FOOD_API.headers
          });
          
          if (menuResponse.ok) {
            const menuData = await menuResponse.json();
            return this.transformJumiaMenuData(menuData);
          }
        }
      }
    } catch (error) {
      console.log('Jumia Food API not available, trying alternatives...');
    }
    return null;
  },

  // Try Glovo API
  async getGlovoMenu() {
    try {
      // Search for Tamarind on Glovo
      const searchResponse = await fetch(`${GLOVO_API.baseURL}${GLOVO_API.endpoints.restaurants}?search=tamarind`, {
        headers: GLOVO_API.headers
      });
      
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        const tamarindId = this.findTamarindId(searchData);
        
        if (tamarindId) {
          const menuResponse = await fetch(`${GLOVO_API.baseURL}${GLOVO_API.endpoints.menu.replace('{id}', tamarindId)}`, {
            headers: GLOVO_API.headers
          });
          
          if (menuResponse.ok) {
            const menuData = await menuResponse.json();
            return this.transformGlovoMenuData(menuData);
          }
        }
      }
    } catch (error) {
      console.log('Glovo API not available, using fallback...');
    }
    return null;
  },

  // Enhanced mock menu with realistic Tamarind data
  getEnhancedMockMenu() {
    return {
      restaurant: TAMARIND_CONFIG,
      categories: {
        'Fresh Seafood': [
          {
            id: 'fs-001',
            name: 'Grilled Lobster',
            price: 'KES 4,500',
            description: 'Fresh Indian Ocean lobster grilled to perfection with garlic butter',
            category: 'Fresh Seafood',
            image: '/images/food/grilled-lobster.jpg',
            isPromo: true,
            promoText: 'Chef\'s Special',
            calories: '280',
            serves: '1 person',
            allergens: ['Shellfish'],
            preparationTime: '15-20 min',
            spiceLevel: 'Mild',
            tags: ['Premium', 'Fresh Catch', 'Signature Dish'],
            catchOfTheDay: true,
            sustainability: 'Sustainable'
          },
          {
            id: 'fs-002',
            name: 'Prawn Curry',
            price: 'KES 2,800',
            description: 'Jumbo prawns in aromatic coconut curry with basmati rice',
            category: 'Fresh Seafood',
            image: '/images/food/prawn-curry.jpg',
            isPromo: false,
            calories: '420',
            serves: '1 person',
            allergens: ['Shellfish', 'Coconut'],
            preparationTime: '20-25 min',
            spiceLevel: 'Medium',
            tags: ['Spicy', 'Coconut', 'Aromatic'],
            catchOfTheDay: true,
            sustainability: 'Sustainable'
          },
          {
            id: 'fs-003',
            name: 'Red Snapper Fillet',
            price: 'KES 3,200',
            description: 'Pan-seared red snapper with lemon caper sauce and seasonal vegetables',
            category: 'Fresh Seafood',
            image: '/images/food/red-snapper.jpg',
            isPromo: false,
            calories: '320',
            serves: '1 person',
            allergens: ['Fish'],
            preparationTime: '18-22 min',
            spiceLevel: 'Mild',
            tags: ['Pan Seared', 'Lemon', 'Fresh'],
            catchOfTheDay: true,
            sustainability: 'Sustainable'
          }
        ],
        'Ocean Platters': [
          {
            id: 'op-001',
            name: 'Seafood Platter for Two',
            price: 'KES 6,800',
            description: 'Assorted grilled seafood: lobster, prawns, fish, calamari with dipping sauces',
            category: 'Ocean Platters',
            image: '/images/food/seafood-platter.jpg',
            isPromo: true,
            promoText: 'Most Popular!',
            calories: '850',
            serves: '2 people',
            allergens: ['Shellfish', 'Fish'],
            preparationTime: '25-30 min',
            spiceLevel: 'Mild',
            tags: ['Shareable', 'Assorted', 'Grilled'],
            catchOfTheDay: true,
            sustainability: 'Sustainable'
          },
          {
            id: 'op-002',
            name: 'Fisherman\'s Catch',
            price: 'KES 5,200',
            description: 'Daily selection of the freshest catch with choice of preparation',
            category: 'Ocean Platters',
            image: '/images/food/fishermans-catch.jpg',
            isPromo: false,
            calories: '680',
            serves: '1 person',
            allergens: ['Fish'],
            preparationTime: '20-25 min',
            spiceLevel: 'Mild',
            tags: ['Daily Special', 'Fresh', 'Choice of Prep'],
            catchOfTheDay: true,
            sustainability: 'Sustainable'
          }
        ],
        'Coastal Specialties': [
          {
            id: 'cs-001',
            name: 'Coconut Fish Stew',
            price: 'KES 2,500',
            description: 'Fresh fish simmered in coconut milk with local spices and vegetables',
            category: 'Coastal Specialties',
            image: '/images/food/coconut-fish-stew.jpg',
            isPromo: false,
            calories: '380',
            serves: '1 person',
            allergens: ['Fish', 'Coconut'],
            preparationTime: '30-35 min',
            spiceLevel: 'Medium',
            tags: ['Local', 'Coconut', 'Stew'],
            catchOfTheDay: true,
            sustainability: 'Sustainable'
          },
          {
            id: 'cs-002',
            name: 'Grilled Octopus',
            price: 'KES 3,800',
            description: 'Tender grilled octopus with olive oil, lemon, and Mediterranean herbs',
            category: 'Coastal Specialties',
            image: '/images/food/grilled-octopus.jpg',
            isPromo: false,
            calories: '280',
            serves: '1 person',
            allergens: ['Molluscs'],
            preparationTime: '15-20 min',
            spiceLevel: 'Mild',
            tags: ['Mediterranean', 'Grilled', 'Tender'],
            catchOfTheDay: true,
            sustainability: 'Sustainable'
          }
        ],
        'Land & Sea': [
          {
            id: 'ls-001',
            name: 'Surf & Turf',
            price: 'KES 5,500',
            description: 'Grilled beef fillet with grilled prawns and garlic butter',
            category: 'Land & Sea',
            image: '/images/food/surf-turf.jpg',
            isPromo: false,
            calories: '720',
            serves: '1 person',
            allergens: ['Shellfish', 'Beef'],
            preparationTime: '25-30 min',
            spiceLevel: 'Mild',
            tags: ['Premium', 'Beef', 'Prawns'],
            catchOfTheDay: false,
            sustainability: 'Sustainable'
          },
          {
            id: 'ls-002',
            name: 'Chicken Tikka with Prawns',
            price: 'KES 3,200',
            description: 'Tandoori chicken tikka served with grilled prawns and mint chutney',
            category: 'Land & Sea',
            image: '/images/food/chicken-tikka-prawns.jpg',
            isPromo: false,
            calories: '580',
            serves: '1 person',
            allergens: ['Chicken', 'Shellfish', 'Dairy'],
            preparationTime: '22-28 min',
            spiceLevel: 'Medium',
            tags: ['Indian', 'Tandoori', 'Spicy'],
            catchOfTheDay: false,
            sustainability: 'Sustainable'
          }
        ],
        'Appetizers & Starters': [
          {
            id: 'as-001',
            name: 'Oysters Rockefeller',
            price: 'KES 1,800',
            description: 'Fresh oysters topped with spinach, breadcrumbs, and parmesan',
            category: 'Appetizers & Starters',
            image: '/images/food/oysters-rockefeller.jpg',
            isPromo: false,
            calories: '180',
            serves: '1 person',
            allergens: ['Shellfish', 'Dairy', 'Gluten'],
            preparationTime: '8-12 min',
            spiceLevel: 'None',
            tags: ['Classic', 'Premium', 'Fresh'],
            catchOfTheDay: true,
            sustainability: 'Sustainable'
          },
          {
            id: 'as-002',
            name: 'Calamari Fritti',
            price: 'KES 1,200',
            description: 'Crispy fried calamari rings with lemon aioli dipping sauce',
            category: 'Appetizers & Starters',
            image: '/images/food/calamari-fritti.jpg',
            isPromo: false,
            calories: '320',
            serves: '1 person',
            allergens: ['Molluscs', 'Gluten', 'Eggs'],
            preparationTime: '6-8 min',
            spiceLevel: 'None',
            tags: ['Crispy', 'Fried', 'Classic'],
            catchOfTheDay: true,
            sustainability: 'Sustainable'
          },
          {
            id: 'as-003',
            name: 'Tuna Tartare',
            price: 'KES 2,200',
            description: 'Fresh tuna with avocado, sesame oil, and soy sauce',
            category: 'Appetizers & Starters',
            image: '/images/food/tuna-tartare.jpg',
            isPromo: false,
            calories: '220',
            serves: '1 person',
            allergens: ['Fish', 'Soy'],
            preparationTime: '5-8 min',
            spiceLevel: 'None',
            tags: ['Raw', 'Fresh', 'Asian Fusion'],
            catchOfTheDay: true,
            sustainability: 'Sustainable'
          }
        ],
        'Desserts': [
          {
            id: 'ds-001',
            name: 'Coconut Panna Cotta',
            price: 'KES 850',
            description: 'Silky coconut panna cotta with tropical fruit compote',
            category: 'Desserts',
            image: '/images/food/coconut-panna-cotta.jpg',
            isPromo: false,
            calories: '280',
            serves: '1 person',
            allergens: ['Dairy', 'Coconut'],
            preparationTime: '2-3 min',
            spiceLevel: 'None',
            tags: ['Silky', 'Tropical', 'Light'],
            catchOfTheDay: false,
            sustainability: 'Sustainable'
          },
          {
            id: 'ds-002',
            name: 'Mango Sorbet',
            price: 'KES 650',
            description: 'Refreshing mango sorbet with fresh mint and lime zest',
            category: 'Desserts',
            image: '/images/food/mango-sorbet.jpg',
            isPromo: false,
            calories: '180',
            serves: '1 person',
            allergens: ['Fruits'],
            preparationTime: '2-3 min',
            spiceLevel: 'None',
            tags: ['Refreshing', 'Fruity', 'Light'],
            catchOfTheDay: false,
            sustainability: 'Sustainable'
          }
        ]
      },
      promotions: [
        {
          id: 'promo-001',
          title: 'Catch of the Day Special',
          description: '20% off on all daily catch items (available until 8 PM)',
          discount: '20%',
          validUntil: '2024-12-31',
          code: 'CATCH20',
          timing: 'Available until 8:00 PM Daily'
        },
        {
          id: 'promo-002',
          title: 'Seafood Platter Tuesday',
          description: 'Buy any seafood platter, get a free appetizer',
          discount: 'Free Appetizer',
          validUntil: '2024-12-31',
          code: 'TUESDAYPLATTER',
          timing: 'Every Tuesday'
        },
        {
          id: 'promo-003',
          title: 'Ocean View Dining',
          description: 'Reserve a table with ocean view and get 15% off your meal',
          discount: '15%',
          validUntil: '2024-12-31',
          code: 'OCEANVIEW15',
          requirements: 'Reservation with ocean view required'
        }
      ],
      deliveryInfo: {
        available: true,
        services: ['Jumia Food', 'Glovo', 'Uber Eats'],
        deliveryTime: '35-50 minutes',
        deliveryFee: 'KES 250',
        minimumOrder: 'KES 2,000',
        freeDeliveryThreshold: 'KES 3,500'
      },
      locations: [
        'Mombasa - Nyali Beach',
        'Nairobi - Karen'
      ],
      dailyCatch: [
        'Red Snapper',
        'Yellowfin Tuna',
        'King Prawns',
        'Lobster',
        'Octopus',
        'Calamari'
      ]
    };
  },

  // Helper functions
  findTamarindId(searchData) {
    // Logic to find Tamarind's ID in search results
    const tamarind = searchData.restaurants?.find(r => 
      r.name.toLowerCase().includes('tamarind')
    );
    return tamarind?.id;
  },

  transformDirectMenuData(data) {
    // Transform direct API data to our format
    return {
      restaurant: TAMARIND_CONFIG,
      categories: data.categories || {},
      promotions: data.promotions || [],
      deliveryInfo: data.delivery || {},
      locations: data.locations || [],
      dailyCatch: data.dailyCatch || []
    };
  },

  transformJumiaMenuData(data) {
    // Transform Jumia Food data to our format
    return {
      restaurant: TAMARIND_CONFIG,
      categories: this.groupByCategory(data.menu || []),
      promotions: data.promotions || [],
      deliveryInfo: {
        available: true,
        services: ['Jumia Food'],
        deliveryTime: data.deliveryTime || '35-50 minutes',
        deliveryFee: data.deliveryFee || 'KES 250',
        minimumOrder: data.minimumOrder || 'KES 2,000'
      },
      locations: data.locations || [],
      dailyCatch: data.dailyCatch || []
    };
  },

  transformGlovoMenuData(data) {
    // Transform Glovo data to our format
    return {
      restaurant: TAMARIND_CONFIG,
      categories: this.groupByCategory(data.menu || []),
      promotions: data.promotions || [],
      deliveryInfo: {
        available: true,
        services: ['Glovo'],
        deliveryTime: data.deliveryTime || '35-50 minutes',
        deliveryFee: data.deliveryFee || 'KES 250',
        minimumOrder: data.minimumOrder || 'KES 2,000'
      },
      locations: data.locations || [],
      dailyCatch: data.dailyCatch || []
    };
  },

  groupByCategory(menuItems) {
    // Group menu items by category
    const categories = {};
    menuItems.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = [];
      }
      categories[item.category].push(item);
    });
    return categories;
  },

  // Get restaurant information
  getRestaurantInfo() {
    return TAMARIND_CONFIG;
  },

  // Get current promotions
  async getPromotions() {
    try {
      const response = await fetch(`${TAMARIND_DIRECT_API.baseURL}${TAMARIND_DIRECT_API.endpoints.promotions}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock promotions');
    }
    
    return this.getEnhancedMockMenu().promotions;
  },

  // Check delivery availability
  async checkDeliveryAvailability() {
    try {
      const response = await fetch(`${TAMARIND_DIRECT_API.baseURL}${TAMARIND_DIRECT_API.endpoints.delivery}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock delivery info');
    }
    
    return this.getEnhancedMockMenu().deliveryInfo;
  },

  // Get daily catch
  async getDailyCatch() {
    try {
      const response = await fetch(`${TAMARIND_DIRECT_API.baseURL}${TAMARIND_DIRECT_API.endpoints.dailyCatch}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock daily catch');
    }
    
    return this.getEnhancedMockMenu().dailyCatch;
  },

  // Get all locations
  async getLocations() {
    try {
      const response = await fetch(`${TAMARIND_DIRECT_API.baseURL}${TAMARIND_DIRECT_API.endpoints.locations}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock locations');
    }
    
    return this.getEnhancedMockMenu().locations;
  }
};

export default tamarindAPI;
