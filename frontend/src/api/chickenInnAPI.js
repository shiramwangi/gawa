// Chicken Inn API Integration Service
// This service provides multiple ways to get Chicken Inn's menu data

// Base configuration
const CHICKEN_INN_CONFIG = {
  name: 'Chicken Inn',
  location: 'Multiple locations across Kenya',
  phone: '+254 20 777 9999',
  website: 'https://www.chickeninn.co.ke',
  coordinates: { lat: -1.2921, lng: 36.8219 }, // Nairobi location
  description: 'Kenya\'s Favorite Chicken! Serving delicious chicken meals, burgers, and fast food with quality ingredients',
  founded: 1982,
  branches: 30,
  specialties: ['Fried Chicken', 'Chicken Burgers', 'Fast Food', 'Family Meals', 'Delivery', 'Takeaway']
};

// Option 1: Direct API endpoints (if Chicken Inn has them)
const CHICKEN_INN_DIRECT_API = {
  baseURL: 'https://api.chickeninn.co.ke', // Hypothetical API endpoint
  endpoints: {
    menu: '/api/v1/menu',
    promotions: '/api/v1/promotions',
    locations: '/api/v1/locations',
    delivery: '/api/v1/delivery',
    deals: '/api/v1/deals',
    rewards: '/api/v1/rewards',
    customization: '/api/v1/customization'
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
export const chickenInnAPI = {
  // Get full menu with real-time data
  async getFullMenu() {
    try {
      // Try direct API first
      const directMenu = await this.getDirectMenu();
      if (directMenu) return directMenu;

      // Try Jumia Food API
      const jumiaMenu = await this.getJumiaMenu();
      if (jumiaMenu) return jumiaMenu;

      // Try Glovo API
      const glovoMenu = await this.getGlovoMenu();
      if (glovoMenu) return glovoMenu;

      // Fallback to enhanced mock data
      return this.getEnhancedMockMenu();
    } catch (error) {
      console.error('Error fetching Chicken Inn menu:', error);
      return this.getEnhancedMockMenu();
    }
  },

  // Try direct Chicken Inn API
  async getDirectMenu() {
    try {
      const response = await fetch(`${CHICKEN_INN_DIRECT_API.baseURL}${CHICKEN_INN_DIRECT_API.endpoints.menu}`);
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
      // Search for Chicken Inn on Jumia Food
      const searchResponse = await fetch(`${JUMIA_FOOD_API.baseURL}${JUMIA_FOOD_API.endpoints.search}?q=chicken+inn`, {
        headers: JUMIA_FOOD_API.headers
      });
      
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        const chickenInnId = this.findChickenInnId(searchData);
        
        if (chickenInnId) {
          const menuResponse = await fetch(`${JUMIA_FOOD_API.baseURL}${JUMIA_FOOD_API.endpoints.menu.replace('{id}', chickenInnId)}`, {
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
      // Search for Chicken Inn on Glovo
      const searchResponse = await fetch(`${GLOVO_API.baseURL}${GLOVO_API.endpoints.restaurants}?search=chicken+inn`, {
        headers: GLOVO_API.headers
      });
      
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        const chickenInnId = this.findChickenInnId(searchData);
        
        if (chickenInnId) {
          const menuResponse = await fetch(`${GLOVO_API.baseURL}${GLOVO_API.endpoints.menu.replace('{id}', chickenInnId)}`, {
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

  // Enhanced mock menu with realistic Chicken Inn data
  getEnhancedMockMenu() {
    return {
      restaurant: CHICKEN_INN_CONFIG,
      categories: {
        'Chicken Meals': [
          {
            id: 'cm-001',
            name: '2 Piece Chicken Meal',
            price: 'KES 450',
            description: '2 pieces of crispy fried chicken with chips and a drink',
            category: 'Chicken Meals',
            image: '/images/food/chicken-inn-2piece-meal.jpg',
            isPromo: true,
            promoText: 'Popular',
            calories: '650',
            serves: '1 person',
            allergens: ['Chicken', 'Gluten', 'Potatoes'],
            preparationTime: '8-12 min',
            spiceLevel: 'Mild',
            tags: ['Chicken', 'Meal', 'Popular'],
            vegetarian: false,
            signature: true,
            mealType: 'Combo',
            includes: ['2 Chicken Pieces', 'Chips', 'Drink']
          },
          {
            id: 'cm-002',
            name: '3 Piece Chicken Meal',
            price: 'KES 550',
            description: '3 pieces of crispy fried chicken with chips and a drink',
            category: 'Chicken Meals',
            image: '/images/food/chicken-inn-3piece-meal.jpg',
            isPromo: false,
            calories: '850',
            serves: '1 person',
            allergens: ['Chicken', 'Gluten', 'Potatoes'],
            preparationTime: '8-12 min',
            spiceLevel: 'Mild',
            tags: ['Chicken', 'Meal', 'Value'],
            vegetarian: false,
            signature: false,
            mealType: 'Combo',
            includes: ['3 Chicken Pieces', 'Chips', 'Drink']
          },
          {
            id: 'cm-003',
            name: 'Family Bucket (8 Pieces)',
            price: 'KES 1,200',
            description: '8 pieces of crispy fried chicken with 2 large chips and 2 drinks',
            category: 'Chicken Meals',
            image: '/images/food/chicken-inn-family-bucket.jpg',
            isPromo: false,
            calories: '2,400',
            serves: '3-4 people',
            allergens: ['Chicken', 'Gluten', 'Potatoes'],
            preparationTime: '15-20 min',
            spiceLevel: 'Mild',
            tags: ['Chicken', 'Family', 'Bucket'],
            vegetarian: false,
            signature: false,
            mealType: 'Family Pack',
            includes: ['8 Chicken Pieces', '2 Large Chips', '2 Drinks']
          }
        ],
        'Chicken Burgers': [
          {
            id: 'cb-001',
            name: 'Chicken Burger',
            price: 'KES 350',
            description: 'Crispy chicken fillet with lettuce, tomato, and special sauce',
            category: 'Chicken Burgers',
            image: '/images/food/chicken-inn-chicken-burger.jpg',
            isPromo: true,
            promoText: 'Classic',
            calories: '480',
            serves: '1 person',
            allergens: ['Chicken', 'Gluten', 'Dairy'],
            preparationTime: '5-8 min',
            spiceLevel: 'Mild',
            tags: ['Burger', 'Chicken', 'Classic'],
            vegetarian: false,
            signature: true,
            burgerType: 'Classic',
            toppings: ['Lettuce', 'Tomato', 'Special Sauce']
          },
          {
            id: 'cb-002',
            name: 'Spicy Chicken Burger',
            price: 'KES 380',
            description: 'Spicy chicken fillet with jalapeños, lettuce, and hot sauce',
            category: 'Chicken Burgers',
            image: '/images/food/chicken-inn-spicy-burger.jpg',
            isPromo: false,
            calories: '520',
            serves: '1 person',
            allergens: ['Chicken', 'Gluten', 'Dairy'],
            preparationTime: '5-8 min',
            spiceLevel: 'Hot',
            tags: ['Burger', 'Chicken', 'Spicy'],
            vegetarian: false,
            signature: false,
            burgerType: 'Spicy',
            toppings: ['Jalapeños', 'Lettuce', 'Hot Sauce']
          }
        ],
        'Chicken Pieces': [
          {
            id: 'cp-001',
            name: 'Chicken Wings (6 Pcs)',
            price: 'KES 280',
            description: '6 crispy chicken wings with your choice of sauce',
            category: 'Chicken Pieces',
            image: '/images/food/chicken-inn-wings.jpg',
            isPromo: false,
            calories: '420',
            serves: '1-2 people',
            allergens: ['Chicken', 'Gluten'],
            preparationTime: '8-12 min',
            spiceLevel: 'Medium',
            tags: ['Wings', 'Chicken', 'Crispy'],
            vegetarian: false,
            signature: false,
            pieceType: 'Wings',
            sauceOptions: ['BBQ', 'Hot', 'Honey Mustard']
          },
          {
            id: 'cp-002',
            name: 'Chicken Strips (5 Pcs)',
            price: 'KES 320',
            description: '5 breaded chicken strips served with dipping sauce',
            category: 'Chicken Pieces',
            image: '/images/food/chicken-inn-strips.jpg',
            isPromo: false,
            calories: '380',
            serves: '1-2 people',
            allergens: ['Chicken', 'Gluten', 'Eggs'],
            preparationTime: '8-12 min',
            spiceLevel: 'Mild',
            tags: ['Strips', 'Chicken', 'Breaded'],
            vegetarian: false,
            signature: false,
            pieceType: 'Strips',
            sauceOptions: ['Ranch', 'BBQ', 'Honey Mustard']
          }
        ],
        'Sides': [
          {
            id: 'sd-001',
            name: 'French Fries (Large)',
            price: 'KES 180',
            description: 'Large portion of crispy golden fries seasoned with salt',
            category: 'Sides',
            image: '/images/food/chicken-inn-fries.jpg',
            isPromo: false,
            calories: '450',
            serves: '1-2 people',
            allergens: ['Potatoes'],
            preparationTime: '5-8 min',
            spiceLevel: 'None',
            tags: ['Fries', 'Crispy', 'Classic'],
            vegetarian: true,
            signature: false,
            size: 'Large',
            seasoning: 'Salt'
          },
          {
            id: 'sd-002',
            name: 'Coleslaw',
            price: 'KES 120',
            description: 'Fresh cabbage and carrot coleslaw with creamy dressing',
            category: 'Sides',
            image: '/images/food/chicken-inn-coleslaw.jpg',
            isPromo: false,
            calories: '180',
            serves: '1 person',
            allergens: ['Dairy', 'Eggs'],
            preparationTime: '2-3 min',
            spiceLevel: 'None',
            tags: ['Coleslaw', 'Fresh', 'Creamy'],
            vegetarian: true,
            signature: false,
            size: 'Regular',
            ingredients: ['Cabbage', 'Carrots', 'Creamy Dressing']
          }
        ],
        'Beverages': [
          {
            id: 'bv-001',
            name: 'Coca Cola (500ml)',
            price: 'KES 80',
            description: 'Refreshing Coca Cola soft drink',
            category: 'Beverages',
            image: '/images/food/chicken-inn-coca-cola.jpg',
            isPromo: false,
            calories: '210',
            serves: '1 person',
            allergens: ['None'],
            preparationTime: '1-2 min',
            spiceLevel: 'None',
            tags: ['Soft Drink', 'Refreshing', 'Classic'],
            vegetarian: true,
            signature: false,
            size: '500ml',
            type: 'Carbonated'
          },
          {
            id: 'bv-002',
            name: 'Sprite (500ml)',
            price: 'KES 80',
            description: 'Clear lemon-lime soft drink',
            category: 'Beverages',
            image: '/images/food/chicken-inn-sprite.jpg',
            isPromo: false,
            calories: '200',
            serves: '1 person',
            allergens: ['None'],
            preparationTime: '1-2 min',
            spiceLevel: 'None',
            tags: ['Soft Drink', 'Lemon-Lime', 'Refreshing'],
            vegetarian: true,
            signature: false,
            size: '500ml',
            type: 'Carbonated'
          }
        ],
        'Desserts': [
          {
            id: 'ds-001',
            name: 'Ice Cream (Vanilla)',
            price: 'KES 150',
            description: 'Creamy vanilla ice cream in a cone',
            category: 'Desserts',
            image: '/images/food/chicken-inn-ice-cream.jpg',
            isPromo: false,
            calories: '280',
            serves: '1 person',
            allergens: ['Dairy'],
            preparationTime: '2-3 min',
            spiceLevel: 'None',
            tags: ['Ice Cream', 'Vanilla', 'Sweet'],
            vegetarian: true,
            signature: false,
            flavor: 'Vanilla',
            type: 'Cone'
          }
        ]
      },
      promotions: [
        {
          id: 'promo-001',
          title: '2 for Tuesday',
          description: 'Get any 2 chicken meals for only KES 750 (Save up to KES 250)',
          discount: 'Save up to KES 250',
          validUntil: '2024-12-31',
          code: '2FORTUESDAY',
          timing: 'Every Tuesday'
        },
        {
          id: 'promo-002',
          title: 'Family Deal',
          description: 'Family bucket + 2 large chips + 2 drinks for only KES 1,500',
          discount: 'Save KES 200',
          validUntil: '2024-12-31',
          code: 'FAMILYDEAL',
          timing: 'Available Daily'
        },
        {
          id: 'promo-003',
          title: 'Student Discount',
          description: '20% off all orders with valid student ID',
          discount: 'Save 20%',
          validUntil: '2024-12-31',
          code: 'STUDENT20',
          timing: 'Available Daily'
        }
      ],
      deliveryInfo: {
        available: true,
        services: ['Jumia Food', 'Glovo', 'Uber Eats', 'Own Delivery'],
        deliveryTime: '20-30 minutes',
        deliveryFee: 'KES 100',
        minimumOrder: 'KES 500',
        freeDeliveryThreshold: 'KES 1,500',
        guarantee: '30 minutes or free'
      },
      locations: [
        'Westlands',
        'CBD',
        'Kilimani',
        'Lavington',
        'Karen',
        'Mombasa Road',
        'Thika Road',
        'Nakuru',
        'Mombasa',
        'Kisumu',
        'Eldoret',
        'Kakamega',
        'Nyeri',
        'Embu',
        'Meru',
        'Thika',
        'Machakos'
      ],
      deals: [
        '2 for Tuesday',
        'Family Deal',
        'Student Discount',
        'Lunch Special',
        'Weekend Special',
        'Happy Hour'
      ],
      rewards: {
        available: true,
        program: 'Chicken Inn Rewards',
        benefits: ['Points on every order', 'Free meal on birthday', 'Exclusive member deals', 'Early access to promotions']
      },
      customization: {
        available: true,
        options: {
          chickenTypes: ['Original', 'Spicy', 'Crispy', 'Grilled'],
          sizes: ['Small', 'Medium', 'Large', 'Family'],
          sauces: ['BBQ', 'Hot', 'Honey Mustard', 'Ranch', 'Sweet & Sour'],
          sides: ['Chips', 'Coleslaw', 'Mashed Potatoes', 'Rice', 'Vegetables']
        }
      }
    };
  },

  // Helper functions
  findChickenInnId(searchData) {
    // Logic to find Chicken Inn ID in search results
    const chickenInn = searchData.restaurants?.find(r => 
      r.name.toLowerCase().includes('chicken inn') || r.name.toLowerCase().includes('chickeninn')
    );
    return chickenInn?.id;
  },

  transformDirectMenuData(data) {
    // Transform direct API data to our format
    return {
      restaurant: CHICKEN_INN_CONFIG,
      categories: data.categories || {},
      promotions: data.promotions || [],
      deliveryInfo: data.delivery || {},
      locations: data.locations || [],
      deals: data.deals || [],
      rewards: data.rewards || {},
      customization: data.customization || {}
    };
  },

  transformJumiaMenuData(data) {
    // Transform Jumia Food data to our format
    return {
      restaurant: CHICKEN_INN_CONFIG,
      categories: this.groupByCategory(data.menu || []),
      promotions: data.promotions || [],
      deliveryInfo: {
        available: true,
        services: ['Jumia Food'],
        deliveryTime: data.deliveryTime || '20-30 minutes',
        deliveryFee: data.deliveryFee || 'KES 100',
        minimumOrder: data.minimumOrder || 'KES 500'
      },
      locations: data.locations || [],
      deals: data.deals || [],
      rewards: data.rewards || {},
      customization: data.customization || {}
    };
  },

  transformGlovoMenuData(data) {
    // Transform Glovo data to our format
    return {
      restaurant: CHICKEN_INN_CONFIG,
      categories: this.groupByCategory(data.menu || []),
      promotions: data.promotions || [],
      deliveryInfo: {
        available: true,
        services: ['Glovo'],
        deliveryTime: data.deliveryTime || '20-30 minutes',
        deliveryFee: data.deliveryFee || 'KES 100',
        minimumOrder: data.minimumOrder || 'KES 500'
      },
      locations: data.locations || [],
      deals: data.deals || [],
      rewards: data.rewards || {},
      customization: data.customization || {}
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
    return CHICKEN_INN_CONFIG;
  },

  // Get current promotions
  async getPromotions() {
    try {
      const response = await fetch(`${CHICKEN_INN_DIRECT_API.baseURL}${CHICKEN_INN_DIRECT_API.endpoints.promotions}`);
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
      const response = await fetch(`${CHICKEN_INN_DIRECT_API.baseURL}${CHICKEN_INN_DIRECT_API.endpoints.delivery}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock delivery info');
    }
    
    return this.getEnhancedMockMenu().deliveryInfo;
  },

  // Get deals
  async getDeals() {
    try {
      const response = await fetch(`${CHICKEN_INN_DIRECT_API.baseURL}${CHICKEN_INN_DIRECT_API.endpoints.deals}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock deals');
    }
    
    return this.getEnhancedMockMenu().deals;
  },

  // Get rewards info
  async getRewards() {
    try {
      const response = await fetch(`${CHICKEN_INN_DIRECT_API.baseURL}${CHICKEN_INN_DIRECT_API.endpoints.rewards}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock rewards info');
    }
    
    return this.getEnhancedMockMenu().rewards;
  },

  // Get customization options
  async getCustomization() {
    try {
      const response = await fetch(`${CHICKEN_INN_DIRECT_API.baseURL}${CHICKEN_INN_DIRECT_API.endpoints.customization}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock customization info');
    }
    
    return this.getEnhancedMockMenu().customization;
  },

  // Get all locations
  async getLocations() {
    try {
      const response = await fetch(`${CHICKEN_INN_DIRECT_API.baseURL}${CHICKEN_INN_DIRECT_API.endpoints.locations}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock locations');
    }
    
    return this.getEnhancedMockMenu().locations;
  }
};

export default chickenInnAPI;
