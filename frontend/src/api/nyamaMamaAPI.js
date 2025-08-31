// Nyama Mama Restaurant API Integration Service
// Using TheMealDB API for real beef dishes

// Base configuration
const NYAMA_MAMA_CONFIG = {
  name: 'Nyama Mama',
  location: 'Multiple locations across Kenya',
  phone: '+254 20 555 5555',
  website: 'https://www.nyamamama.co.ke',
  coordinates: { lat: -1.2921, lng: 36.8219 }, // Nairobi location
  description: 'Modern African fusion cuisine with contemporary flair, celebrating Kenya\'s rich culinary heritage',
  founded: 2010,
  branches: 8,
  specialties: ['African Fusion', 'Modern Kenyan Cuisine', 'Farm-to-Table', 'Craft Cocktails', 'Live Entertainment']
};

// TheMealDB API for real beef dishes
const THEMEALDB_API = {
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  endpoints: {
    beef: '/filter.php?c=Beef'
  }
};

// Option 1: Direct API endpoints (if Nyama Mama has them)
const NYAMA_MAMA_DIRECT_API = {
  baseURL: 'https://api.nyamamama.co.ke', // Hypothetical API endpoint
  endpoints: {
    menu: '/api/v1/menu',
    promotions: '/api/v1/promotions',
    reservations: '/api/v1/reservations',
    delivery: '/api/v1/delivery',
    events: '/api/v1/events',
    liveEntertainment: '/api/v1/live-entertainment'
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
export const nyamaMamaAPI = {
  // Get full menu with real-time data
  async getFullMenu() {
    try {
      // Try TheMealDB API first for real beef data
      const realBeefMenu = await this.getRealBeefMenu();
      if (realBeefMenu) return realBeefMenu;

      // Fallback to enhanced mock data
      return this.getEnhancedMockMenu();
    } catch (error) {
      console.error('Error fetching Nyama Mama menu:', error);
      return this.getEnhancedMockMenu();
    }
  },

  // Get real beef data from TheMealDB API
  async getRealBeefMenu() {
    try {
      console.log('🥩 Fetching real beef data from TheMealDB API for Nyama Mama...');
      
      const response = await fetch(`${THEMEALDB_API.baseURL}${THEMEALDB_API.endpoints.beef}`);
      
      if (!response.ok) {
        throw new Error(`TheMealDB API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ TheMealDB API response:', data);
      
      if (data.meals && data.meals.length > 0) {
        const beefDishes = data.meals.map((meal, index) => ({
          id: meal.idMeal || `beef-${index}`,
          name: meal.strMeal || 'Beef Dish',
          description: this.generateDescription(meal.strMeal),
          price: this.generatePrice(800, 1800),
          image: meal.strMealThumb || '/images/food/placeholder-food.jpg',
          category: 'Beef',
          calories: this.generateCalories(350, 750),
          serves: '2-3 people',
          preparationTime: '40-75 min',
          isPromo: Math.random() > 0.7,
          promoText: 'African Fusion Special!',
          signature: Math.random() > 0.8,
          vegetarian: false,
          allergens: ['Gluten', 'Dairy', 'Eggs', 'Soy'],
          tags: this.generateTags(meal.strMeal),
          size: this.generateSize(),
          crust: null,
          spiceLevel: this.generateSpiceLevel(meal.strMeal),
          originalPrice: null,
          meatType: 'Beef',
          cookingMethod: this.generateCookingMethod(meal.strMeal),
          origin: this.detectOrigin(meal.strMeal),
          africanFusion: this.isAfricanFusion(meal.strMeal)
        }));
        
        console.log('🥩 Transformed beef dishes for Nyama Mama:', beefDishes);
        
        return {
          restaurant: NYAMA_MAMA_CONFIG,
          menu: beefDishes,
          categories: {
            'Beef': beefDishes
          },
          customization: {
            available: true,
            options: {
              doneness: ['Rare', 'Medium Rare', 'Medium', 'Medium Well', 'Well Done'],
              cuts: ['Tenderloin', 'Ribeye', 'Sirloin', 'T-Bone', 'Porterhouse', 'Flank'],
              sauces: ['African Spice', 'Mushroom', 'Red Wine', 'Peppercorn', 'Garlic Butter', 'Chimichurri'],
              sides: ['Ugali', 'Sukuma Wiki', 'Roasted Potatoes', 'Grilled Vegetables', 'Rice', 'Salad'],
              spices: ['African Spice Blend', 'Garlic', 'Rosemary', 'Thyme', 'Oregano', 'Paprika']
            }
          },
          deals: [
            'African Fusion Night: 20% off all beef dishes on Thursdays',
            'Live Entertainment Package: Dinner + Show for KES 2,500',
            'Farm-to-Table Special: Fresh local ingredients with premium beef'
          ],
          rewards: {
            available: true,
            program: 'Nyama Mama Rewards',
            benefits: [
              'Earn points on every African fusion meal',
              'Free appetizer after 4 visits',
              'Birthday month: Complimentary dessert',
              'Exclusive access to chef\'s special beef cuts'
            ]
          },
          locations: [
            'Westlands Mall',
            'Two Rivers Mall',
            'The Hub Karen',
            'Galleria Mall',
            'Sarit Centre',
            'Yaya Centre',
            'Nakumatt Mega',
            'Village Market'
          ]
        };
      }
      
      console.log('❌ No valid beef data found in TheMealDB response');
      return null;
      
    } catch (error) {
      console.error('❌ Error fetching real beef data:', error);
      return null;
    }
  },

  // Generate description based on meal name with African fusion twist
  generateDescription(mealName) {
    const descriptions = [
      `African Fusion ${mealName} - modern twist on traditional beef preparation`,
      `Contemporary ${mealName} - celebrating Kenya's rich culinary heritage`,
      `Chef's Special ${mealName} - farm-to-table beef with local spices`,
      `Modern African ${mealName} - fusion of traditional and contemporary flavors`,
      `Signature ${mealName} - our most popular African fusion beef dish`
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

  // Generate tags based on beef dish name with African fusion focus
  generateTags(mealName) {
    const tags = ['African Fusion', 'Modern Kenyan', 'Farm-to-Table'];
    
    if (mealName.toLowerCase().includes('pie')) tags.push('Pie', 'Comfort Food');
    if (mealName.toLowerCase().includes('curry')) tags.push('Curry', 'Spicy');
    if (mealName.toLowerCase().includes('stew')) tags.push('Stew', 'Slow Cooked');
    if (mealName.toLowerCase().includes('grilled')) tags.push('Grilled', 'BBQ');
    if (mealName.toLowerCase().includes('roast')) tags.push('Roasted', 'Traditional');
    if (mealName.toLowerCase().includes('wellington')) tags.push('Wellington', 'Luxury');
    if (mealName.toLowerCase().includes('stroganoff')) tags.push('Stroganoff', 'Creamy');
    if (mealName.toLowerCase().includes('bolognese')) tags.push('Bolognese', 'Italian');
    
    return tags.slice(0, 6); // Return max 6 tags
  },

  // Generate random size
  generateSize() {
    const sizes = ['Regular', 'Large', 'Family Size'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  },

  // Generate spice level based on meal name
  generateSpiceLevel(mealName) {
    const spicyKeywords = ['curry', 'chilli', 'spicy', 'hot', 'pepper'];
    if (spicyKeywords.some(keyword => mealName.toLowerCase().includes(keyword))) {
      return 'Medium-Hot';
    }
    return 'Mild';
  },

  // Generate cooking method based on meal name
  generateCookingMethod(mealName) {
    if (mealName.toLowerCase().includes('grilled')) return 'Grilled';
    if (mealName.toLowerCase().includes('roast')) return 'Roasted';
    if (mealName.toLowerCase().includes('stew')) return 'Slow Cooked';
    if (mealName.toLowerCase().includes('pie')) return 'Baked';
    if (mealName.toLowerCase().includes('curry')) return 'Curried';
    if (mealName.toLowerCase().includes('stroganoff')) return 'Braised';
    return 'Chef\'s Choice';
  },

  // Detect origin/cuisine based on meal name
  detectOrigin(mealName) {
    if (mealName.toLowerCase().includes('bolognese')) return 'Italian';
    if (mealName.toLowerCase().includes('wellington')) return 'British';
    if (mealName.toLowerCase().includes('stroganoff')) return 'Russian';
    if (mealName.toLowerCase().includes('curry')) return 'Asian';
    if (mealName.toLowerCase().includes('pie')) return 'British';
    if (mealName.toLowerCase().includes('stew')) return 'Traditional';
    return 'International';
  },

  // Check if dish fits African fusion theme
  isAfricanFusion(mealName) {
    const africanKeywords = ['curry', 'stew', 'grilled', 'roasted', 'braised'];
    return africanKeywords.some(keyword => mealName.toLowerCase().includes(keyword));
  },

  // Try direct Nyama Mama API
  async getDirectMenu() {
    try {
      const response = await fetch(`${NYAMA_MAMA_DIRECT_API.baseURL}${NYAMA_MAMA_DIRECT_API.endpoints.menu}`);
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
      // Search for Nyama Mama on Jumia Food
      const searchResponse = await fetch(`${JUMIA_FOOD_API.baseURL}${JUMIA_FOOD_API.endpoints.search}?q=nyama mama`, {
        headers: JUMIA_FOOD_API.headers
      });
      
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        const nyamaMamaId = this.findNyamaMamaId(searchData);
        
        if (nyamaMamaId) {
          const menuResponse = await fetch(`${JUMIA_FOOD_API.baseURL}${JUMIA_FOOD_API.endpoints.menu.replace('{id}', nyamaMamaId)}`, {
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
      // Search for Nyama Mama on Glovo
      const searchResponse = await fetch(`${GLOVO_API.baseURL}${GLOVO_API.endpoints.restaurants}?search=nyama mama`, {
        headers: GLOVO_API.headers
      });
      
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        const nyamaMamaId = this.findNyamaMamaId(searchData);
        
        if (nyamaMamaId) {
          const menuResponse = await fetch(`${GLOVO_API.baseURL}${GLOVO_API.endpoints.menu.replace('{id}', nyamaMamaId)}`, {
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

  // Enhanced mock menu with realistic Nyama Mama data
  getEnhancedMockMenu() {
    return {
      restaurant: NYAMA_MAMA_CONFIG,
      categories: {
        'Modern Starters': [
          {
            id: 'ms-001',
            name: 'Dawa Wings',
            price: 'KES 1,200',
            description: 'Crispy chicken wings glazed with honey, ginger, and lime dawa sauce',
            category: 'Modern Starters',
            image: '/images/food/dawa-wings.jpg',
            isPromo: true,
            promoText: 'Chef\'s Favourite',
            calories: '320',
            serves: '1 person',
            allergens: ['Chicken', 'Gluten', 'Honey'],
            preparationTime: '12-15 min',
            spiceLevel: 'Medium',
            tags: ['African Fusion', 'Spicy', 'Crispy'],
            vegetarian: false,
            africanFusion: true
          },
          {
            id: 'ms-002',
            name: 'Plantain Chips with Tamarind Dip',
            price: 'KES 850',
            description: 'Crispy plantain chips served with tangy tamarind and chili dip',
            category: 'Modern Starters',
            image: '/images/food/plantain-chips.jpg',
            isPromo: false,
            calories: '280',
            serves: '1 person',
            allergens: ['Plantain'],
            preparationTime: '8-10 min',
            spiceLevel: 'Mild',
            tags: ['Vegetarian', 'Crispy', 'Tropical'],
            vegetarian: true,
            africanFusion: true
          },
          {
            id: 'ms-003',
            name: 'Beef Samosa with Mango Chutney',
            price: 'KES 950',
            description: 'Crispy beef samosa filled with spiced ground beef and served with sweet mango chutney',
            category: 'Modern Starters',
            image: '/images/food/beef-samosa.jpg',
            isPromo: false,
            calories: '380',
            serves: '1 person',
            allergens: ['Beef', 'Gluten', 'Mango'],
            preparationTime: '10-12 min',
            spiceLevel: 'Medium',
            tags: ['Indian Fusion', 'Crispy', 'Spicy'],
            vegetarian: false,
            africanFusion: true
          }
        ],
        'African Fusion Mains': [
          {
            id: 'afm-001',
            name: 'Nyama Choma Tacos',
            price: 'KES 1,800',
            description: 'Grilled goat meat in soft corn tortillas with kachumbari and avocado salsa',
            category: 'African Fusion Mains',
            image: '/images/food/nyama-choma-tacos.jpg',
            isPromo: true,
            promoText: 'Signature Dish',
            calories: '520',
            serves: '1 person',
            allergens: ['Goat', 'Gluten', 'Avocado'],
            preparationTime: '20-25 min',
            spiceLevel: 'Medium',
            tags: ['Signature', 'African-Mexican', 'Grilled'],
            vegetarian: false,
            africanFusion: true
          },
          {
            id: 'afm-002',
            name: 'Coconut Fish Curry',
            price: 'KES 2,200',
            description: 'Fresh tilapia in aromatic coconut curry with ugali and sukuma wiki',
            category: 'African Fusion Mains',
            image: '/images/food/coconut-fish-curry.jpg',
            isPromo: false,
            calories: '480',
            serves: '1 person',
            allergens: ['Fish', 'Coconut'],
            preparationTime: '25-30 min',
            spiceLevel: 'Medium',
            tags: ['Coastal', 'Coconut', 'Traditional'],
            vegetarian: false,
            africanFusion: true
          },
          {
            id: 'afm-003',
            name: 'Quinoa Pilau with Grilled Vegetables',
            price: 'KES 1,600',
            description: 'Quinoa pilau with seasonal grilled vegetables and cashew nut sauce',
            category: 'African Fusion Mains',
            image: '/images/food/quinoa-pilau.jpg',
            isPromo: false,
            calories: '420',
            serves: '1 person',
            allergens: ['Nuts'],
            preparationTime: '18-22 min',
            spiceLevel: 'Mild',
            tags: ['Vegetarian', 'Healthy', 'Modern'],
            vegetarian: true,
            africanFusion: true
          },
          {
            id: 'afm-004',
            name: 'Lamb Biryani with Plantain',
            price: 'KES 2,500',
            description: 'Aromatic lamb biryani with sweet plantain and raita',
            category: 'African Fusion Mains',
            image: '/images/food/lamb-biryani.jpg',
            isPromo: false,
            calories: '680',
            serves: '1 person',
            allergens: ['Lamb', 'Rice', 'Dairy'],
            preparationTime: '30-35 min',
            spiceLevel: 'Medium',
            tags: ['Indian Fusion', 'Aromatic', 'Rich'],
            vegetarian: false,
            africanFusion: true
          }
        ],
        'Traditional with a Twist': [
          {
            id: 'twt-001',
            name: 'Ugali Fries with Chili Mayo',
            price: 'KES 750',
            description: 'Crispy ugali fries served with spicy chili mayonnaise dip',
            category: 'Traditional with a Twist',
            image: '/images/food/ugali-fries.jpg',
            isPromo: false,
            calories: '320',
            serves: '1 person',
            allergens: ['Maize', 'Eggs'],
            preparationTime: '15-18 min',
            spiceLevel: 'Mild',
            tags: ['Traditional', 'Crispy', 'Modern'],
            vegetarian: true,
            africanFusion: true
          },
          {
            id: 'twt-002',
            name: 'Sukuma Wiki Spring Rolls',
            price: 'KES 950',
            description: 'Fresh sukuma wiki wrapped in rice paper with peanut dipping sauce',
            category: 'Traditional with a Twist',
            image: '/images/food/sukuma-spring-rolls.jpg',
            isPromo: false,
            calories: '280',
            serves: '1 person',
            allergens: ['Peanuts', 'Rice'],
            preparationTime: '12-15 min',
            spiceLevel: 'None',
            tags: ['Vegetarian', 'Fresh', 'Asian Fusion'],
            vegetarian: true,
            africanFusion: true
          }
        ],
        'Grill & BBQ': [
          {
            id: 'gbb-001',
            name: 'Mixed Grill Platter',
            price: 'KES 3,200',
            description: 'Assorted grilled meats: beef, chicken, lamb with ugali and kachumbari',
            category: 'Grill & BBQ',
            image: '/images/food/mixed-grill-platter.jpg',
            isPromo: true,
            promoText: 'Most Popular!',
            calories: '850',
            serves: '1 person',
            allergens: ['Beef', 'Chicken', 'Lamb'],
            preparationTime: '25-30 min',
            spiceLevel: 'Mild',
            tags: ['Grilled', 'Assorted', 'Traditional'],
            vegetarian: false,
            africanFusion: true
          },
          {
            id: 'gbb-002',
            name: 'Grilled Tilapia with Mchuzi',
            price: 'KES 2,800',
            description: 'Whole grilled tilapia with traditional mchuzi sauce and ugali',
            category: 'Grill & BBQ',
            image: '/images/food/grilled-tilapia.jpg',
            isPromo: false,
            calories: '520',
            serves: '1 person',
            allergens: ['Fish'],
            preparationTime: '20-25 min',
            spiceLevel: 'Medium',
            tags: ['Grilled', 'Fresh', 'Traditional'],
            vegetarian: false,
            africanFusion: true
          }
        ],
        'Desserts & Sweet Treats': [
          {
            id: 'dst-001',
            name: 'Mandazi Ice Cream Sandwich',
            price: 'KES 850',
            description: 'Warm mandazi with vanilla ice cream and drizzled with honey',
            category: 'Desserts & Sweet Treats',
            image: '/images/food/mandazi-ice-cream.jpg',
            isPromo: false,
            calories: '380',
            serves: '1 person',
            allergens: ['Gluten', 'Dairy', 'Honey'],
            preparationTime: '5-8 min',
            spiceLevel: 'None',
            tags: ['Traditional', 'Sweet', 'Fusion'],
            vegetarian: true,
            africanFusion: true
          },
          {
            id: 'dst-002',
            name: 'Mango Panna Cotta',
            price: 'KES 750',
            description: 'Silky mango panna cotta with passion fruit coulis',
            category: 'Desserts & Sweet Treats',
            image: '/images/food/mango-panna-cotta.jpg',
            isPromo: false,
            calories: '280',
            serves: '1 person',
            allergens: ['Dairy', 'Mango'],
            preparationTime: '3-5 min',
            spiceLevel: 'None',
            tags: ['Silky', 'Tropical', 'Light'],
            vegetarian: true,
            africanFusion: true
          }
        ],
        'Craft Cocktails': [
          {
            id: 'cc-001',
            name: 'Dawa Mojito',
            price: 'KES 650',
            description: 'Traditional dawa with mint, lime, and soda for a refreshing twist',
            category: 'Craft Cocktails',
            image: '/images/food/dawa-mojito.jpg',
            isPromo: false,
            calories: '180',
            serves: '1 person',
            allergens: ['None'],
            preparationTime: '5-8 min',
            spiceLevel: 'None',
            tags: ['Traditional', 'Refreshing', 'Fusion'],
            alcoholic: true,
            africanFusion: true
          },
          {
            id: 'cc-002',
            name: 'Tamarind Margarita',
            price: 'KES 750',
            description: 'Classic margarita with tamarind syrup and chili salt rim',
            category: 'Craft Cocktails',
            image: '/images/food/tamarind-margarita.jpg',
            isPromo: false,
            calories: '220',
            serves: '1 person',
            allergens: ['Tequila'],
            preparationTime: '8-12 min',
            spiceLevel: 'Mild',
            tags: ['Tequila', 'Tamarind', 'Spicy'],
            alcoholic: true,
            africanFusion: true
          }
        ]
      },
      promotions: [
        {
          id: 'promo-001',
          title: 'African Fusion Experience',
          description: '20% off on all African fusion main courses',
          discount: '20%',
          validUntil: '2024-12-31',
          code: 'AFRICAN20',
          timing: 'Available Daily'
        },
        {
          id: 'promo-002',
          title: 'Live Entertainment Nights',
          description: 'Free dessert with any main course on live entertainment nights',
          discount: 'Free Dessert',
          validUntil: '2024-12-31',
          code: 'LIVEENTERTAINMENT',
          timing: 'Every Friday & Saturday'
        },
        {
          id: 'promo-003',
          title: 'Farm-to-Table Special',
          description: '15% off on all farm-fresh ingredients and seasonal dishes',
          discount: '15%',
          validUntil: '2024-12-31',
          code: 'FARM15',
          requirements: 'Seasonal availability'
        }
      ],
      deliveryInfo: {
        available: true,
        services: ['Jumia Food', 'Glovo', 'Uber Eats'],
        deliveryTime: '35-50 minutes',
        deliveryFee: 'KES 250',
        minimumOrder: 'KES 1,800',
        freeDeliveryThreshold: 'KES 3,500'
      },
      locations: [
        'Kilimani',
        'Westlands',
        'CBD',
        'Lavington',
        'Karen',
        'Mombasa Road',
        'Thika Road',
        'Nakuru'
      ],
      events: [
        'Live Music Fridays',
        'Traditional Dance Saturdays',
        'Chef\'s Table Experience',
        'Wine & Dine Wednesdays'
      ],
      liveEntertainment: {
        available: true,
        schedule: 'Fridays & Saturdays 7-11 PM',
        genres: ['Traditional Kenyan', 'Afro Jazz', 'Contemporary African', 'World Music']
      }
    };
  },

  // Helper functions
  findNyamaMamaId(searchData) {
    // Logic to find Nyama Mama's ID in search results
    const nyamaMama = searchData.restaurants?.find(r => 
      r.name.toLowerCase().includes('nyama mama') || r.name.toLowerCase().includes('nyamamama')
    );
    return nyamaMama?.id;
  },

  transformDirectMenuData(data) {
    // Transform direct API data to our format
    return {
      restaurant: NYAMA_MAMA_CONFIG,
      categories: data.categories || {},
      promotions: data.promotions || [],
      deliveryInfo: data.delivery || {},
      locations: data.locations || [],
      events: data.events || [],
      liveEntertainment: data.liveEntertainment || {}
    };
  },

  transformJumiaMenuData(data) {
    // Transform Jumia Food data to our format
    return {
      restaurant: NYAMA_MAMA_CONFIG,
      categories: this.groupByCategory(data.menu || []),
      promotions: data.promotions || [],
      deliveryInfo: {
        available: true,
        services: ['Jumia Food'],
        deliveryTime: data.deliveryTime || '35-50 minutes',
        deliveryFee: data.deliveryFee || 'KES 250',
        minimumOrder: data.minimumOrder || 'KES 1,800'
      },
      locations: data.locations || [],
      events: data.events || [],
      liveEntertainment: data.liveEntertainment || {}
    };
  },

  transformGlovoMenuData(data) {
    // Transform Glovo data to our format
    return {
      restaurant: NYAMA_MAMA_CONFIG,
      categories: this.groupByCategory(data.menu || []),
      promotions: data.promotions || [],
      deliveryInfo: {
        available: true,
        services: ['Glovo'],
        deliveryTime: data.deliveryTime || '35-50 minutes',
        deliveryFee: data.deliveryFee || 'KES 250',
        minimumOrder: data.minimumOrder || 'KES 1,800'
      },
      locations: data.locations || [],
      events: data.events || [],
      liveEntertainment: data.liveEntertainment || {}
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
    return NYAMA_MAMA_CONFIG;
  },

  // Get current promotions
  async getPromotions() {
    try {
      const response = await fetch(`${NYAMA_MAMA_DIRECT_API.baseURL}${NYAMA_MAMA_DIRECT_API.endpoints.promotions}`);
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
      const response = await fetch(`${NYAMA_MAMA_DIRECT_API.baseURL}${NYAMA_MAMA_DIRECT_API.endpoints.delivery}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock delivery info');
    }
    
    return this.getEnhancedMockMenu().deliveryInfo;
  },

  // Get events
  async getEvents() {
    try {
      const response = await fetch(`${NYAMA_MAMA_DIRECT_API.baseURL}${NYAMA_MAMA_DIRECT_API.endpoints.events}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock events');
    }
    
    return this.getEnhancedMockMenu().events;
  },

  // Get live entertainment schedule
  async getLiveEntertainment() {
    try {
      const response = await fetch(`${NYAMA_MAMA_DIRECT_API.baseURL}${NYAMA_MAMA_DIRECT_API.endpoints.liveEntertainment}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock live entertainment info');
    }
    
    return this.getEnhancedMockMenu().liveEntertainment;
  },

  // Get all locations
  async getLocations() {
    try {
      const response = await fetch(`${NYAMA_MAMA_DIRECT_API.baseURL}${NYAMA_MAMA_DIRECT_API.endpoints.locations}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock locations');
    }
    
    return this.getEnhancedMockMenu().locations;
  }
};

export default nyamaMamaAPI;
