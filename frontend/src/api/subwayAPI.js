// Subway Restaurant API Integration Service
// This service provides multiple ways to get Subway's menu data

// Base configuration
const SUBWAY_CONFIG = {
  name: 'Subway',
  location: 'Multiple locations across Kenya',
  phone: '+254 20 777 9999',
  website: 'https://www.subway.co.ke',
  coordinates: { lat: -1.2921, lng: 36.8219 }, // Nairobi location
  description: 'Eat Fresh! Serving made-to-order sandwiches, wraps, and salads with fresh ingredients and healthy options',
  founded: 1965,
  branches: 12,
  specialties: ['Fresh Sandwiches', 'Wraps', 'Salads', 'Healthy Options', 'Customizable', 'Delivery']
};

// Forkify API for real sandwich data
const FORKIFY_API = {
  baseURL: 'https://forkify-api.herokuapp.com/api/v2',
  endpoints: {
    sandwiches: '/recipes?search=sandwich'
  }
};

// Option 1: Direct API endpoints (if Subway has them)
const SUBWAY_DIRECT_API = {
  baseURL: 'https://api.subway.co.ke', // Hypothetical API endpoint
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
export const subwayAPI = {
  // Get full menu with real-time data
  async getFullMenu() {
    try {
      // Try Forkify API first for real sandwich data
      const realSandwichMenu = await this.getRealSandwichMenu();
      if (realSandwichMenu) return realSandwichMenu;

      // Fallback to enhanced mock data
      return this.getEnhancedMockMenu();
    } catch (error) {
      console.error('Error fetching Subway menu:', error);
      return this.getEnhancedMockMenu();
    }
  },

  // Get real sandwich data from Forkify API
  async getRealSandwichMenu() {
    try {
      console.log('🍔 Fetching real sandwich data from Forkify API...');
      
      const response = await fetch(`${FORKIFY_API.baseURL}${FORKIFY_API.endpoints.sandwiches}`);
      
      if (!response.ok) {
        throw new Error(`Forkify API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Forkify API response:', data);
      
      if (data.status === 'success' && data.data && data.data.recipes) {
        const sandwiches = data.data.recipes.map((recipe, index) => ({
          id: recipe.id || `sandwich-${index}`,
          name: recipe.title || 'Sandwich',
          description: `Delicious ${recipe.title} - a premium sandwich from ${recipe.publisher}`,
          price: this.generatePrice(800, 1500),
          image: recipe.image_url || '/images/food/placeholder-food.jpg',
          category: 'Sandwiches',
          calories: this.generateCalories(200, 500),
          serves: '1 person',
          preparationTime: '15-25 min',
          isPromo: Math.random() > 0.7,
          promoText: 'Fresh Deal!',
          signature: Math.random() > 0.8,
          vegetarian: this.isVegetarian(recipe.title),
          allergens: ['Gluten', 'Dairy', 'Eggs'],
          tags: this.generateTags(recipe.title),
          size: this.generateSize(),
          crust: null,
          spiceLevel: 'None',
          originalPrice: null
        }));
        
        console.log('🍔 Transformed sandwiches:', sandwiches);
        
        return {
          restaurant: SUBWAY_CONFIG,
          menu: sandwiches,
          categories: {
            'Sandwiches': sandwiches
          },
          customization: {
            available: true,
            options: {
              bread: ['White', 'Wheat', 'Italian', 'Honey Oat', 'Flatbread'],
              meat: ['Turkey', 'Ham', 'Chicken', 'Beef', 'Tuna', 'Veggie'],
              cheese: ['American', 'Swiss', 'Provolone', 'Pepper Jack', 'Cheddar'],
              vegetables: ['Lettuce', 'Tomato', 'Onion', 'Cucumber', 'Bell Peppers', 'Olives'],
              sauces: ['Mayo', 'Mustard', 'Ranch', 'Sweet Onion', 'Chipotle', 'Honey Mustard']
            }
          },
          deals: [
            'Buy 2 Get 1 Free on Tuesdays',
            'Student Discount 15% off',
            'Family Pack: 4 sandwiches + 4 drinks for KES 2,500'
          ],
          rewards: {
            available: true,
            program: 'Subway Rewards',
            benefits: [
              'Earn points on every purchase',
              'Free sandwich after 8 visits',
              'Birthday month special offers',
              'Exclusive member-only deals'
            ]
          },
          locations: [
            'Westlands Mall',
            'Two Rivers Mall',
            'The Hub Karen',
            'Galleria Mall',
            'Sarit Centre',
            'Yaya Centre'
          ]
        };
      }
      
      console.log('❌ No valid sandwich data found in Forkify response');
      return null;
      
    } catch (error) {
      console.error('❌ Error fetching real sandwich data:', error);
      return null;
    }
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

  // Check if sandwich is vegetarian based on title
  isVegetarian(title) {
    const vegetarianKeywords = ['veggie', 'vegetarian', 'vegan', 'hummus', 'falafel', 'tofu'];
    return vegetarianKeywords.some(keyword => 
      title.toLowerCase().includes(keyword)
    );
  },

  // Generate tags based on sandwich title
  generateTags(title) {
    const tags = ['Fresh', 'Healthy', 'Customizable'];
    
    if (title.toLowerCase().includes('grilled')) tags.push('Grilled');
    if (title.toLowerCase().includes('cheese')) tags.push('Cheese');
    if (title.toLowerCase().includes('chicken')) tags.push('Chicken');
    if (title.toLowerCase().includes('turkey')) tags.push('Turkey');
    if (title.toLowerCase().includes('beef')) tags.push('Beef');
    if (title.toLowerCase().includes('veggie')) tags.push('Vegetarian');
    
    return tags.slice(0, 5); // Return max 5 tags
  },

  // Generate random size
  generateSize() {
    const sizes = ['6 inch', '12 inch', 'Footlong'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  },

  // Try direct Subway API
  async getDirectMenu() {
    try {
      const response = await fetch(`${SUBWAY_DIRECT_API.baseURL}${SUBWAY_DIRECT_API.endpoints.menu}`);
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
      // Search for Subway on Jumia Food
      const searchResponse = await fetch(`${JUMIA_FOOD_API.baseURL}${JUMIA_FOOD_API.endpoints.search}?q=subway`, {
        headers: JUMIA_FOOD_API.headers
      });
      
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        const subwayId = this.findSubwayId(searchData);
        
        if (subwayId) {
          const menuResponse = await fetch(`${JUMIA_FOOD_API.baseURL}${JUMIA_FOOD_API.endpoints.menu.replace('{id}', subwayId)}`, {
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
      // Search for Subway on Glovo
      const searchResponse = await fetch(`${GLOVO_API.baseURL}${GLOVO_API.endpoints.restaurants}?search=subway`, {
        headers: GLOVO_API.headers
      });
      
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        const subwayId = this.findSubwayId(searchData);
        
        if (subwayId) {
          const menuResponse = await fetch(`${GLOVO_API.baseURL}${GLOVO_API.endpoints.menu.replace('{id}', subwayId)}`, {
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

  // Enhanced mock menu with realistic Subway data
  getEnhancedMockMenu() {
    return {
      restaurant: SUBWAY_CONFIG,
      categories: {
        'Classic Sandwiches': [
          {
            id: 'cs-001',
            name: 'BMT (Biggest, Meatiest, Tastiest)',
            price: 'KES 450',
            description: 'Salami, pepperoni, and ham with your choice of fresh vegetables and condiments',
            category: 'Classic Sandwiches',
            image: '/images/food/subway-bmt.jpg',
            isPromo: true,
            promoText: 'Popular',
            calories: '380',
            serves: '1 person',
            allergens: ['Gluten', 'Pork', 'Beef'],
            preparationTime: '5-8 min',
            spiceLevel: 'Mild',
            tags: ['Classic', 'Meat', 'Popular'],
            vegetarian: false,
            signature: true,
            size: '6-inch',
            bread: 'Italian'
          },
          {
            id: 'cs-002',
            name: 'Chicken Teriyaki',
            price: 'KES 420',
            description: 'Grilled chicken with teriyaki sauce, fresh vegetables, and your choice of condiments',
            category: 'Classic Sandwiches',
            image: '/images/food/subway-chicken-teriyaki.jpg',
            isPromo: false,
            calories: '320',
            serves: '1 person',
            allergens: ['Gluten', 'Chicken', 'Soy'],
            preparationTime: '5-8 min',
            spiceLevel: 'Mild',
            tags: ['Classic', 'Chicken', 'Teriyaki'],
            vegetarian: false,
            signature: false,
            size: '6-inch',
            bread: 'Italian'
          },
          {
            id: 'cs-003',
            name: 'Veggie Delite',
            price: 'KES 350',
            description: 'Fresh lettuce, tomatoes, cucumbers, green peppers, and onions with your choice of condiments',
            category: 'Classic Sandwiches',
            image: '/images/food/subway-veggie-delite.jpg',
            isPromo: false,
            calories: '200',
            serves: '1 person',
            allergens: ['Gluten'],
            preparationTime: '5-8 min',
            spiceLevel: 'None',
            tags: ['Classic', 'Vegetarian', 'Fresh'],
            vegetarian: true,
            signature: false,
            size: '6-inch',
            bread: 'Italian'
          }
        ],
        'Premium Sandwiches': [
          {
            id: 'ps-001',
            name: 'Steak & Cheese',
            price: 'KES 480',
            description: 'Tender steak strips with melted cheese, fresh vegetables, and your choice of condiments',
            category: 'Premium Sandwiches',
            image: '/images/food/subway-steak-cheese.jpg',
            isPromo: false,
            calories: '420',
            serves: '1 person',
            allergens: ['Gluten', 'Beef', 'Dairy'],
            preparationTime: '6-10 min',
            spiceLevel: 'Mild',
            tags: ['Premium', 'Steak', 'Cheese'],
            vegetarian: false,
            signature: false,
            size: '6-inch',
            bread: 'Italian'
          },
          {
            id: 'ps-002',
            name: 'Turkey Breast',
            price: 'KES 400',
            description: 'Sliced turkey breast with fresh vegetables and your choice of condiments',
            category: 'Premium Sandwiches',
            image: '/images/food/subway-turkey-breast.jpg',
            isPromo: false,
            calories: '280',
            serves: '1 person',
            allergens: ['Gluten', 'Turkey'],
            preparationTime: '5-8 min',
            spiceLevel: 'None',
            tags: ['Premium', 'Turkey', 'Lean'],
            vegetarian: false,
            signature: false,
            size: '6-inch',
            bread: 'Italian'
          }
        ],
        'Wraps': [
          {
            id: 'wr-001',
            name: 'Chicken Caesar Wrap',
            price: 'KES 450',
            description: 'Grilled chicken with Caesar dressing, lettuce, and parmesan cheese wrapped in a tortilla',
            category: 'Wraps',
            image: '/images/food/subway-chicken-caesar-wrap.jpg',
            isPromo: false,
            calories: '380',
            serves: '1 person',
            allergens: ['Gluten', 'Chicken', 'Dairy'],
            preparationTime: '5-8 min',
            spiceLevel: 'Mild',
            tags: ['Wrap', 'Chicken', 'Caesar'],
            vegetarian: false,
            signature: false,
            size: 'Regular',
            bread: 'Tortilla'
          },
          {
            id: 'wr-002',
            name: 'Veggie Wrap',
            price: 'KES 380',
            description: 'Fresh vegetables with hummus and your choice of condiments wrapped in a tortilla',
            category: 'Wraps',
            image: '/images/food/subway-veggie-wrap.jpg',
            isPromo: false,
            calories: '250',
            serves: '1 person',
            allergens: ['Gluten', 'Chickpeas'],
            preparationTime: '5-8 min',
            spiceLevel: 'None',
            tags: ['Wrap', 'Vegetarian', 'Hummus'],
            vegetarian: true,
            signature: false,
            size: 'Regular',
            bread: 'Tortilla'
          }
        ],
        'Salads': [
          {
            id: 'sl-001',
            name: 'Chicken Caesar Salad',
            price: 'KES 420',
            description: 'Fresh lettuce with grilled chicken, Caesar dressing, and parmesan cheese',
            category: 'Salads',
            image: '/images/food/subway-chicken-caesar-salad.jpg',
            isPromo: false,
            calories: '280',
            serves: '1 person',
            allergens: ['Chicken', 'Dairy', 'Eggs'],
            preparationTime: '5-8 min',
            spiceLevel: 'None',
            tags: ['Salad', 'Chicken', 'Caesar'],
            vegetarian: false,
            signature: false
          },
          {
            id: 'sl-002',
            name: 'Veggie Delite Salad',
            price: 'KES 320',
            description: 'Fresh lettuce, tomatoes, cucumbers, green peppers, and onions with your choice of dressing',
            category: 'Salads',
            image: '/images/food/subway-veggie-salad.jpg',
            isPromo: false,
            calories: '120',
            serves: '1 person',
            allergens: ['None'],
            preparationTime: '5-8 min',
            spiceLevel: 'None',
            tags: ['Salad', 'Vegetarian', 'Fresh'],
            vegetarian: true,
            signature: false
          }
        ],
        'Sides & Snacks': [
          {
            id: 'ss-001',
            name: 'Cookies (2 Pcs)',
            price: 'KES 120',
            description: 'Freshly baked chocolate chip cookies',
            category: 'Sides & Snacks',
            image: '/images/food/subway-cookies.jpg',
            isPromo: false,
            calories: '200',
            serves: '1 person',
            allergens: ['Gluten', 'Dairy', 'Chocolate'],
            preparationTime: '1-2 min',
            spiceLevel: 'None',
            tags: ['Cookies', 'Sweet', 'Baked'],
            vegetarian: true,
            signature: false
          },
          {
            id: 'ss-002',
            name: 'Chips',
            price: 'KES 80',
            description: 'Assorted potato chips and snacks',
            category: 'Sides & Snacks',
            image: '/images/food/subway-chips.jpg',
            isPromo: false,
            calories: '150',
            serves: '1 person',
            allergens: ['Potatoes'],
            preparationTime: '1 min',
            spiceLevel: 'None',
            tags: ['Chips', 'Snack', 'Crunchy'],
            vegetarian: true,
            signature: false
          }
        ],
        'Beverages': [
          {
            id: 'bv-001',
            name: 'Coca Cola (Medium)',
            price: 'KES 100',
            description: 'Refreshing Coca Cola soft drink',
            category: 'Beverages',
            image: '/images/food/subway-coca-cola.jpg',
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
            name: 'Sprite (Medium)',
            price: 'KES 100',
            description: 'Clear lemon-lime soft drink',
            category: 'Beverages',
            image: '/images/food/subway-sprite.jpg',
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
            name: 'Water (500ml)',
            price: 'KES 60',
            description: 'Pure bottled water',
            category: 'Beverages',
            image: '/images/food/subway-water.jpg',
            isPromo: false,
            calories: '0',
            serves: '1 person',
            allergens: ['None'],
            preparationTime: '1 min',
            spiceLevel: 'None',
            tags: ['Water', 'Pure', 'Hydrating'],
            vegetarian: true,
            signature: false
          }
        ]
      },
      promotions: [
        {
          id: 'promo-001',
          title: 'Footlong Deal',
          description: 'Get any footlong sandwich for only KES 600 (Save up to KES 200)',
          discount: 'Save up to KES 200',
          validUntil: '2024-12-31',
          code: 'FOOTLONGDEAL',
          timing: 'Available Daily'
        },
        {
          id: 'promo-002',
          title: 'Combo Special',
          description: '6-inch sandwich + chips + drink for only KES 500',
          discount: 'Save KES 100',
          validUntil: '2024-12-31',
          code: 'COMBOSPECIAL',
          timing: 'Available Daily'
        },
        {
          id: 'promo-003',
          title: 'Healthy Choice',
          description: 'Salad + drink for only KES 350 (Available all day)',
          discount: 'Save KES 70',
          validUntil: '2024-12-31',
          code: 'HEALTHYCHOICE',
          timing: 'Available All Day'
        }
      ],
      deliveryInfo: {
        available: true,
        services: ['Jumia Food', 'Glovo', 'Uber Eats', 'Own Delivery'],
        deliveryTime: '20-35 minutes',
        deliveryFee: 'KES 120',
        minimumOrder: 'KES 600',
        freeDeliveryThreshold: 'KES 1,500'
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
        'Footlong Deal',
        'Combo Special',
        'Healthy Choice',
        'Student Discount',
        'Lunch Special'
      ],
      rewards: {
        available: true,
        program: 'Subway Rewards',
        benefits: ['Points on every order', 'Free sandwich on birthday', 'Exclusive member deals', 'Early access to promotions']
      },
      customization: {
        available: true,
        options: {
          breads: ['Italian', 'Wheat', 'Honey Oat', 'Flatbread', 'Wrap'],
          sizes: ['6-inch', 'Footlong'],
          meats: ['Chicken', 'Turkey', 'Ham', 'Salami', 'Pepperoni', 'Steak', 'Tuna'],
          vegetables: ['Lettuce', 'Tomatoes', 'Cucumbers', 'Green Peppers', 'Onions', 'Olives', 'Jalapeños'],
          condiments: ['Mayo', 'Mustard', 'Ketchup', 'BBQ', 'Ranch', 'Sweet Onion', 'Vinegar', 'Oil']
        }
      }
    };
  },

  // Helper functions
  findSubwayId(searchData) {
    // Logic to find Subway's ID in search results
    const subway = searchData.restaurants?.find(r => 
      r.name.toLowerCase().includes('subway')
    );
    return subway?.id;
  },

  transformDirectMenuData(data) {
    // Transform direct API data to our format
    return {
      restaurant: SUBWAY_CONFIG,
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
      restaurant: SUBWAY_CONFIG,
      categories: this.groupByCategory(data.menu || []),
      promotions: data.promotions || [],
      deliveryInfo: {
        available: true,
        services: ['Jumia Food'],
        deliveryTime: data.deliveryTime || '20-35 minutes',
        deliveryFee: data.deliveryFee || 'KES 120',
        minimumOrder: data.minimumOrder || 'KES 600'
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
      restaurant: SUBWAY_CONFIG,
      categories: this.groupByCategory(data.menu || []),
      promotions: data.promotions || [],
      deliveryInfo: {
        available: true,
        services: ['Glovo'],
        deliveryTime: data.deliveryTime || '20-35 minutes',
        deliveryFee: data.deliveryFee || 'KES 120',
        minimumOrder: data.minimumOrder || 'KES 600'
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
    return SUBWAY_CONFIG;
  },

  // Get current promotions
  async getPromotions() {
    try {
      const response = await fetch(`${SUBWAY_DIRECT_API.baseURL}${SUBWAY_DIRECT_API.endpoints.promotions}`);
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
      const response = await fetch(`${SUBWAY_DIRECT_API.baseURL}${SUBWAY_DIRECT_API.endpoints.delivery}`);
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
      const response = await fetch(`${SUBWAY_DIRECT_API.baseURL}${SUBWAY_DIRECT_API.endpoints.deals}`);
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
      const response = await fetch(`${SUBWAY_DIRECT_API.baseURL}${SUBWAY_DIRECT_API.endpoints.rewards}`);
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
      const response = await fetch(`${SUBWAY_DIRECT_API.baseURL}${SUBWAY_DIRECT_API.endpoints.customization}`);
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
      const response = await fetch(`${SUBWAY_DIRECT_API.baseURL}${SUBWAY_DIRECT_API.endpoints.locations}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock locations');
    }
    
    return this.getEnhancedMockMenu().locations;
  }
};

export default subwayAPI;
