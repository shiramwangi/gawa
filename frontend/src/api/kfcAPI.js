// KFC Restaurant API Integration Service
// This service provides multiple ways to get KFC's menu data

// Base configuration
const KFC_CONFIG = {
  name: 'KFC',
  location: 'Multiple locations across Kenya',
  phone: '+254 20 666 6666',
  website: 'https://www.kfc.co.ke',
  coordinates: { lat: -1.2921, lng: 36.8219 }, // Nairobi location
  description: 'World-famous fried chicken restaurant serving crispy, flavorful chicken with signature herbs and spices',
  founded: 1930,
  branches: 25,
  specialties: ['Fried Chicken', 'Chicken Burgers', 'Chicken Wings', 'Sides', 'Desserts', 'Beverages']
};

// Option 1: Direct API endpoints (if KFC has them)
const KFC_DIRECT_API = {
  baseURL: 'https://api.kfc.co.ke', // Hypothetical API endpoint
  endpoints: {
    menu: '/api/v1/menu',
    promotions: '/api/v1/promotions',
    locations: '/api/v1/locations',
    delivery: '/api/v1/delivery',
    deals: '/api/v1/deals',
    rewards: '/api/v1/rewards'
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
export const kfcAPI = {
  // Get full menu with real-time data
  async getFullMenu() {
    try {
      // Try to get real chicken data first from Spoonacular
      const realMenu = await this.getRealChickenMenu();
      if (realMenu && realMenu.length > 0) {
        console.log('✅ Real chicken data loaded successfully from Spoonacular');
        return {
          restaurant: KFC_CONFIG,
          menu: realMenu,
          promotions: this.getPromotions(),
          deals: this.getDeals(),
          rewards: this.getRewards(),
          customization: this.getCustomization(),
          locations: this.getLocations()
        };
      }
      
      // Fallback to enhanced mock data
      console.log('⚠️ Using enhanced mock data as fallback');
      return this.getEnhancedMockMenu();
    } catch (error) {
      console.error('Error fetching KFC menu:', error);
      return this.getEnhancedMockMenu();
    }
  },

  // Get real chicken data from Spoonacular API
  async getRealChickenMenu() {
    try {
      console.log('🍗 Fetching from Spoonacular Chicken API...');
      
      // Use the working Spoonacular API endpoint for chicken
      const chickenResponse = await fetch('https://api.spoonacular.com/recipes/complexSearch?query=chicken&number=20&apiKey=0264506281e5448c81a956ff1f4f1d82');
      console.log('📡 Chicken API Response status:', chickenResponse.status);
      
      if (!chickenResponse.ok) {
        throw new Error(`Chicken API request failed: ${chickenResponse.status}`);
      }
      
      const chickenData = await chickenResponse.json();
      console.log('✅ Successfully fetched chicken data from Spoonacular:', chickenData);
      
      // Also get sides and drinks
      const sidesResponse = await fetch('https://api.spoonacular.com/recipes/complexSearch?query=side&number=10&apiKey=0264506281e5448c81a956ff1f4f1d82');
      console.log('📡 Sides API Response status:', sidesResponse.status);
      
      let sidesData = null;
      if (sidesResponse.ok) {
        sidesData = await sidesResponse.json();
        console.log('✅ Successfully fetched sides data from Spoonacular:', sidesData);
      }
      
      // Transform real data to our format
      const transformedMenu = [];
      
      // Add real chicken dishes from Spoonacular
      if (chickenData.results && chickenData.results.length > 0) {
        console.log(`🍗 Found ${chickenData.results.length} chicken dishes from Spoonacular API`);
        
        // Show ALL chicken dishes from the API
        for (let i = 0; i < chickenData.results.length; i++) {
          const chicken = chickenData.results[i];
          console.log(`🍗 Processing chicken dish ${i + 1}:`, chicken.title);
          
          transformedMenu.push({
            id: `chicken-${chicken.id}`,
            name: chicken.title,
            description: 'Delicious chicken dish made with KFC\'s signature herbs and spices',
            price: this.generateChickenPrice(),
            category: 'Chicken',
            image: chicken.image || '/images/food/placeholder-food.jpg',
            calories: Math.floor(Math.random() * 400) + 300,
            serves: '1 person',
            preparationTime: '15-25 min',
            isPromo: Math.random() > 0.7,
            promoText: 'Hot Deal!',
            signature: Math.random() > 0.8,
            size: ['Small', 'Medium', 'Large'][Math.floor(Math.random() * 3)],
            spiceLevel: ['Mild', 'Medium', 'Hot', 'Extra Hot'][Math.floor(Math.random() * 4)],
            tags: ['Fresh', 'Crispy', 'Spicy'],
            allergens: ['Gluten', 'Dairy'],
            type: ['Fried', 'Grilled', 'Baked'][Math.floor(Math.random() * 3)]
          });
        }
      } else {
        console.warn('⚠️ No chicken data found from Spoonacular API');
      }
      
      // Add real sides if we have any
      if (sidesData && sidesData.results && sidesData.results.length > 0) {
        console.log(`🥔 Found ${sidesData.results.length} sides from Spoonacular API`);
        
        // Show ALL sides from the API
        for (let i = 0; i < sidesData.results.length; i++) {
          const side = sidesData.results[i];
          console.log(`🥔 Processing side ${i + 1}:`, side.title);
          
          transformedMenu.push({
            id: `side-${side.id}`,
            name: side.title,
            description: 'Delicious side dish to complement your chicken meal',
            price: this.generateSidePrice(),
            category: 'Sides',
            image: side.image || '/images/food/placeholder-food.jpg',
            calories: Math.floor(Math.random() * 200) + 100,
            serves: '1 person',
            preparationTime: '5-10 min',
            isPromo: Math.random() > 0.8,
            promoText: 'Combo Deal!',
            tags: ['Fresh', 'Hot'],
            allergens: ['Gluten'],
            spiceLevel: 'None'
          });
        }
      } else {
        console.warn('⚠️ No sides data found from Spoonacular API');
      }
      
      // Add some mock desserts and beverages to complete the menu
      transformedMenu.push(...this.getMockDessertsAndBeverages());
      
      console.log(`✅ Successfully transformed ${transformedMenu.length} menu items`);
      return transformedMenu;
      
    } catch (error) {
      console.error('❌ Error fetching real chicken data from Spoonacular:', error);
      console.log('🔄 Falling back to mock data...');
      return null;
    }
  },

  // Try direct KFC API
  async getDirectMenu() {
    try {
      const response = await fetch(`${KFC_DIRECT_API.baseURL}${KFC_DIRECT_API.endpoints.menu}`);
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
      // Search for KFC on Jumia Food
      const searchResponse = await fetch(`${JUMIA_FOOD_API.baseURL}${JUMIA_FOOD_API.endpoints.search}?q=kfc`, {
        headers: JUMIA_FOOD_API.headers
      });
      
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        const kfcId = this.findKFCId(searchData);
        
        if (kfcId) {
          const menuResponse = await fetch(`${JUMIA_FOOD_API.baseURL}${JUMIA_FOOD_API.endpoints.menu.replace('{id}', kfcId)}`, {
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
      // Search for KFC on Glovo
      const searchResponse = await fetch(`${GLOVO_API.baseURL}${GLOVO_API.endpoints.restaurants}?search=kfc`, {
        headers: GLOVO_API.headers
      });
      
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        const kfcId = this.findKFCId(searchData);
        
        if (kfcId) {
          const menuResponse = await fetch(`${GLOVO_API.baseURL}${GLOVO_API.endpoints.menu.replace('{id}', kfcId)}`, {
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

  // Enhanced mock menu with realistic KFC data
  getEnhancedMockMenu() {
    return {
      restaurant: KFC_CONFIG,
      categories: {
        'Signature Fried Chicken': [
          {
            id: 'sfc-001',
            name: 'Original Recipe Chicken (2 Pcs)',
            price: 'KES 450',
            description: 'KFC\'s world-famous fried chicken with 11 herbs and spices',
            category: 'Signature Fried Chicken',
            image: '/images/food/kfc-original-chicken.jpg',
            isPromo: true,
            promoText: 'Most Popular!',
            calories: '320',
            serves: '1 person',
            allergens: ['Chicken', 'Gluten', 'Soy'],
            preparationTime: '8-12 min',
            spiceLevel: 'Mild',
            tags: ['Signature', 'Original Recipe', 'Crispy'],
            vegetarian: false,
            signature: true
          },
          {
            id: 'sfc-002',
            name: 'Original Recipe Chicken (8 Pcs)',
            price: 'KES 1,200',
            description: 'Family pack of KFC\'s signature fried chicken',
            category: 'Signature Fried Chicken',
            image: '/images/food/kfc-8pc-chicken.jpg',
            isPromo: false,
            calories: '1,280',
            serves: '4 people',
            allergens: ['Chicken', 'Gluten', 'Soy'],
            preparationTime: '10-15 min',
            spiceLevel: 'Mild',
            tags: ['Family Pack', 'Original Recipe', 'Shareable'],
            vegetarian: false,
            signature: true
          },
          {
            id: 'sfc-003',
            name: 'Spicy Fried Chicken (2 Pcs)',
            price: 'KES 480',
            description: 'Extra spicy fried chicken with hot sauce coating',
            category: 'Signature Fried Chicken',
            image: '/images/food/kfc-spicy-chicken.jpg',
            isPromo: false,
            calories: '340',
            serves: '1 person',
            allergens: ['Chicken', 'Gluten', 'Soy'],
            preparationTime: '8-12 min',
            spiceLevel: 'Hot',
            tags: ['Spicy', 'Hot Sauce', 'Crispy'],
            vegetarian: false,
            signature: true
          }
        ],
        'Chicken Burgers': [
          {
            id: 'cb-001',
            name: 'Zinger Burger',
            price: 'KES 380',
            description: 'Crispy chicken fillet with lettuce, mayo, and spicy sauce',
            category: 'Chicken Burgers',
            image: '/images/food/kfc-zinger-burger.jpg',
            isPromo: true,
            promoText: 'Best Seller',
            calories: '420',
            serves: '1 person',
            allergens: ['Chicken', 'Gluten', 'Eggs', 'Mayo'],
            preparationTime: '5-8 min',
            spiceLevel: 'Medium',
            tags: ['Burger', 'Spicy', 'Crispy'],
            vegetarian: false,
            signature: true
          },
          {
            id: 'cb-002',
            name: 'Chicken Fillet Burger',
            price: 'KES 350',
            description: 'Grilled chicken fillet with fresh lettuce and mayo',
            category: 'Chicken Burgers',
            image: '/images/food/kfc-chicken-fillet.jpg',
            isPromo: false,
            calories: '380',
            serves: '1 person',
            allergens: ['Chicken', 'Gluten', 'Mayo'],
            preparationTime: '5-8 min',
            spiceLevel: 'Mild',
            tags: ['Burger', 'Grilled', 'Healthy'],
            vegetarian: false,
            signature: false
          },
          {
            id: 'cb-003',
            name: 'Double Down',
            price: 'KES 550',
            description: 'Two chicken fillets with cheese and bacon, no bun',
            category: 'Chicken Burgers',
            image: '/images/food/kfc-double-down.jpg',
            isPromo: false,
            calories: '680',
            serves: '1 person',
            allergens: ['Chicken', 'Cheese', 'Bacon'],
            preparationTime: '8-12 min',
            spiceLevel: 'Mild',
            tags: ['No Bun', 'Cheese', 'Bacon'],
            vegetarian: false,
            signature: true
          }
        ],
        'Chicken Wings & Tenders': [
          {
            id: 'cwt-001',
            name: 'Hot Wings (6 Pcs)',
            price: 'KES 320',
            description: 'Spicy chicken wings with hot sauce',
            category: 'Chicken Wings & Tenders',
            image: '/images/food/kfc-hot-wings.jpg',
            isPromo: false,
            calories: '280',
            serves: '1 person',
            allergens: ['Chicken', 'Gluten', 'Hot Sauce'],
            preparationTime: '6-8 min',
            spiceLevel: 'Hot',
            tags: ['Wings', 'Spicy', 'Hot Sauce'],
            vegetarian: false,
            signature: false
          },
          {
            id: 'cwt-002',
            name: 'Chicken Tenders (4 Pcs)',
            price: 'KES 280',
            description: 'Breaded chicken tenders with dipping sauce',
            category: 'Chicken Wings & Tenders',
            image: '/images/food/kfc-chicken-tenders.jpg',
            isPromo: false,
            calories: '240',
            serves: '1 person',
            allergens: ['Chicken', 'Gluten'],
            preparationTime: '5-8 min',
            spiceLevel: 'Mild',
            tags: ['Tenders', 'Breaded', 'Dipping Sauce'],
            vegetarian: false,
            signature: false
          }
        ],
        'Sides & Snacks': [
          {
            id: 'ss-001',
            name: 'French Fries',
            price: 'KES 180',
            description: 'Crispy golden fries seasoned with salt',
            category: 'Sides & Snacks',
            image: '/images/food/kfc-french-fries.jpg',
            isPromo: false,
            calories: '220',
            serves: '1 person',
            allergens: ['Potatoes'],
            preparationTime: '3-5 min',
            spiceLevel: 'None',
            tags: ['Fries', 'Crispy', 'Golden'],
            vegetarian: true,
            signature: false
          },
          {
            id: 'ss-002',
            name: 'Coleslaw',
            price: 'KES 150',
            description: 'Fresh cabbage salad with creamy dressing',
            category: 'Sides & Snacks',
            image: '/images/food/kfc-coleslaw.jpg',
            isPromo: false,
            calories: '120',
            serves: '1 person',
            allergens: ['Mayo', 'Dairy'],
            preparationTime: '2-3 min',
            spiceLevel: 'None',
            tags: ['Salad', 'Creamy', 'Fresh'],
            vegetarian: true,
            signature: false
          },
          {
            id: 'ss-003',
            name: 'Mashed Potatoes & Gravy',
            price: 'KES 200',
            description: 'Creamy mashed potatoes with rich chicken gravy',
            category: 'Sides & Snacks',
            image: '/images/food/kfc-mashed-potatoes.jpg',
            isPromo: false,
            calories: '180',
            serves: '1 person',
            allergens: ['Dairy', 'Gluten'],
            preparationTime: '3-5 min',
            spiceLevel: 'None',
            tags: ['Mashed', 'Gravy', 'Creamy'],
            vegetarian: false,
            signature: false
          },
          {
            id: 'ss-004',
            name: 'Popcorn Chicken',
            price: 'KES 250',
            description: 'Bite-sized crispy chicken pieces',
            category: 'Sides & Snacks',
            image: '/images/food/kfc-popcorn-chicken.jpg',
            isPromo: false,
            calories: '320',
            serves: '1 person',
            allergens: ['Chicken', 'Gluten'],
            preparationTime: '4-6 min',
            spiceLevel: 'Mild',
            tags: ['Bite-sized', 'Crispy', 'Snack'],
            vegetarian: false,
            signature: false
          }
        ],
        'Desserts': [
          {
            id: 'ds-001',
            name: 'Chocolate Fudge Cake',
            price: 'KES 350',
            description: 'Rich chocolate cake with fudge frosting',
            category: 'Desserts',
            image: '/images/food/kfc-chocolate-cake.jpg',
            isPromo: false,
            calories: '380',
            serves: '1 person',
            allergens: ['Chocolate', 'Gluten', 'Eggs'],
            preparationTime: '2-3 min',
            spiceLevel: 'None',
            tags: ['Chocolate', 'Fudge', 'Rich'],
            vegetarian: true,
            signature: false
          },
          {
            id: 'ds-002',
            name: 'Ice Cream Sundae',
            price: 'KES 280',
            description: 'Vanilla ice cream with chocolate sauce and sprinkles',
            category: 'Desserts',
            image: '/images/food/kfc-ice-cream.jpg',
            isPromo: false,
            calories: '280',
            serves: '1 person',
            allergens: ['Dairy', 'Chocolate'],
            preparationTime: '2-3 min',
            spiceLevel: 'None',
            tags: ['Ice Cream', 'Chocolate', 'Sweet'],
            vegetarian: true,
            signature: false
          }
        ],
        'Beverages': [
          {
            id: 'bv-001',
            name: 'Coca Cola (500ml)',
            price: 'KES 120',
            description: 'Refreshing Coca Cola soft drink',
            category: 'Beverages',
            image: '/images/food/kfc-coca-cola.jpg',
            isPromo: false,
            calories: '210',
            serves: '1 person',
            allergens: ['None'],
            preparationTime: '1-2 min',
            spiceLevel: 'None',
            tags: ['Soft Drink', 'Refreshing', 'Classic'],
            vegetarian: true,
            signature: false
          },
          {
            id: 'bv-002',
            name: 'Sprite (500ml)',
            price: 'KES 120',
            description: 'Clear lemon-lime soft drink',
            category: 'Beverages',
            image: '/images/food/kfc-sprite.jpg',
            isPromo: false,
            calories: '200',
            serves: '1 person',
            allergens: ['None'],
            preparationTime: '1-2 min',
            spiceLevel: 'None',
            tags: ['Soft Drink', 'Lemon-Lime', 'Clear'],
            vegetarian: true,
            signature: false
          },
          {
            id: 'bv-003',
            name: 'Fanta Orange (500ml)',
            price: 'KES 120',
            description: 'Orange flavored soft drink',
            category: 'Beverages',
            image: '/images/food/kfc-fanta.jpg',
            isPromo: false,
            calories: '200',
            serves: '1 person',
            allergens: ['None'],
            preparationTime: '1-2 min',
            spiceLevel: 'None',
            tags: ['Soft Drink', 'Orange', 'Fruity'],
            vegetarian: true,
            signature: false
          }
        ]
      },
      promotions: [
        {
          id: 'promo-001',
          title: 'Family Bucket Deal',
          description: '8 pieces of chicken + 2 large sides + 4 drinks for only KES 2,500',
          discount: 'Save KES 500',
          validUntil: '2024-12-31',
          code: 'FAMILYBUCKET',
          timing: 'Available Daily'
        },
        {
          id: 'promo-002',
          title: 'Zinger Tuesday',
          description: 'Buy any Zinger burger, get free fries every Tuesday',
          discount: 'Free Fries',
          validUntil: '2024-12-31',
          code: 'ZINGERTUESDAY',
          timing: 'Every Tuesday'
        },
        {
          id: 'promo-003',
          title: 'Student Discount',
          description: '15% off on all orders with valid student ID',
          discount: '15%',
          validUntil: '2024-12-31',
          code: 'STUDENT15',
          requirements: 'Valid student ID required'
        }
      ],
      deliveryInfo: {
        available: true,
        services: ['Jumia Food', 'Glovo', 'Uber Eats', 'Own Delivery'],
        deliveryTime: '25-40 minutes',
        deliveryFee: 'KES 150',
        minimumOrder: 'KES 800',
        freeDeliveryThreshold: 'KES 2,000'
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
        'Kisumu'
      ],
      deals: [
        'Family Bucket Deal',
        'Zinger Tuesday',
        'Student Discount',
        'Lunch Special',
        'Happy Hour'
      ],
      rewards: {
        available: true,
        program: 'KFC Rewards',
        benefits: ['Points on every order', 'Free items', 'Birthday treats', 'Exclusive offers']
      }
    };
  },

  // Helper functions
  findKFCId(searchData) {
    // Logic to find KFC's ID in search results
    const kfc = searchData.restaurants?.find(r => 
      r.name.toLowerCase().includes('kfc') || r.name.toLowerCase().includes('kentucky fried chicken')
    );
    return kfc?.id;
  },

  transformDirectMenuData(data) {
    // Transform direct API data to our format
    return {
      restaurant: KFC_CONFIG,
      categories: data.categories || {},
      promotions: data.promotions || [],
      deliveryInfo: data.delivery || {},
      locations: data.locations || [],
      deals: data.deals || [],
      rewards: data.rewards || {}
    };
  },

  transformJumiaMenuData(data) {
    // Transform Jumia Food data to our format
    return {
      restaurant: KFC_CONFIG,
      categories: this.groupByCategory(data.menu || []),
      promotions: data.promotions || [],
      deliveryInfo: {
        available: true,
        services: ['Jumia Food'],
        deliveryTime: data.deliveryTime || '25-40 minutes',
        deliveryFee: data.deliveryFee || 'KES 150',
        minimumOrder: data.minimumOrder || 'KES 800'
      },
      locations: data.locations || [],
      deals: data.deals || [],
      rewards: data.rewards || {}
    };
  },

  transformGlovoMenuData(data) {
    // Transform Glovo data to our format
    return {
      restaurant: KFC_CONFIG,
      categories: this.groupByCategory(data.menu || []),
      promotions: data.promotions || [],
      deliveryInfo: {
        available: true,
        services: ['Glovo'],
        deliveryTime: data.deliveryTime || '25-40 minutes',
        deliveryFee: data.deliveryFee || 'KES 150',
        minimumOrder: data.minimumOrder || 'KES 800'
      },
      locations: data.locations || [],
      deals: data.deals || [],
      rewards: data.rewards || {}
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
    return KFC_CONFIG;
  },

  // Get current promotions
  async getPromotions() {
    try {
      const response = await fetch(`${KFC_DIRECT_API.baseURL}${KFC_DIRECT_API.endpoints.promotions}`);
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
      const response = await fetch(`${KFC_DIRECT_API.baseURL}${KFC_DIRECT_API.endpoints.delivery}`);
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
      const response = await fetch(`${KFC_DIRECT_API.baseURL}${KFC_DIRECT_API.endpoints.deals}`);
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
      const response = await fetch(`${KFC_DIRECT_API.baseURL}${KFC_DIRECT_API.endpoints.rewards}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock rewards info');
    }
    
    return this.getEnhancedMockMenu().rewards;
  },

  // Get all locations
  async getLocations() {
    try {
      const response = await fetch(`${KFC_DIRECT_API.baseURL}${KFC_DIRECT_API.endpoints.locations}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock locations');
    }
    
    return this.getEnhancedMockMenu().locations;
  },

  // Generate random prices for chicken dishes
  generateChickenPrice() {
    const basePrice = 300; // Base price for small chicken
    const randomFactor = Math.random() * 1.5 + 0.5; // Random factor between 0.5 and 2.0
    return `KES ${Math.round(basePrice * randomFactor)}`;
  },

  // Generate random prices for sides
  generateSidePrice() {
    const basePrice = 100; // Base price for small sides
    const randomFactor = Math.random() * 1.2 + 0.8; // Random factor between 0.8 and 2.0
    return `KES ${Math.round(basePrice * randomFactor)}`;
  },

  // Get mock desserts and beverages for the real chicken menu
  getMockDessertsAndBeverages() {
    const mockDesserts = [
      {
        id: 'ds-003',
        name: 'Chocolate Chip Cookies',
        price: 'KES 150',
        description: 'Classic chocolate chip cookies',
        category: 'Desserts',
        image: '/images/food/kfc-chocolate-chip-cookies.jpg',
        isPromo: false,
        calories: '150',
        serves: '1 person',
        allergens: ['Dairy', 'Gluten'],
        preparationTime: '2-3 min',
        spiceLevel: 'None',
        tags: ['Cookies', 'Chocolate', 'Sweet'],
        vegetarian: true,
        signature: false
      },
      {
        id: 'ds-004',
        name: 'Vanilla Milkshake',
        price: 'KES 200',
        description: 'Creamy vanilla milkshake',
        category: 'Beverages',
        image: '/images/food/kfc-vanilla-milkshake.jpg',
        isPromo: false,
        calories: '250',
        serves: '1 person',
        allergens: ['Dairy'],
        preparationTime: '2-3 min',
        spiceLevel: 'None',
        tags: ['Milkshake', 'Vanilla', 'Creamy'],
        vegetarian: true,
        signature: false
      }
    ];
    return mockDesserts;
  },

  // Get customization options (e.g., spice levels, sizes)
  getCustomization() {
    return {
      chicken: {
        sizes: ['Small', 'Medium', 'Large'],
        spiceLevels: ['Mild', 'Medium', 'Hot', 'Extra Hot']
      },
      sides: {
        sizes: ['Small', 'Medium', 'Large']
      },
      beverages: {
        sizes: ['Small', 'Medium', 'Large']
      }
    };
  }
};

export default kfcAPI;
