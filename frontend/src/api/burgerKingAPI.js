// Burger King Restaurant API Integration Service
// This service provides multiple ways to get Burger King's menu data

// Base configuration
const BURGER_KING_CONFIG = {
  name: 'Burger King',
  location: 'Multiple locations across Kenya',
  phone: '+254 20 777 8888',
  website: 'https://www.burgerking.co.ke',
  coordinates: { lat: -1.2921, lng: 36.8219 }, // Nairobi location
  description: 'Home of the Whopper! Serving flame-grilled burgers, crispy chicken, and delicious fast food favorites',
  founded: 1954,
  branches: 15,
  specialties: ['Flame-Grilled Burgers', 'Whopper', 'Chicken', 'Fries', 'Beverages', 'Breakfast', 'Delivery']
};

// Option 1: Direct API endpoints (if Burger King has them)
const BURGER_KING_DIRECT_API = {
  baseURL: 'https://api.burgerking.co.ke', // Hypothetical API endpoint
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

// TheMealDB API for real burger data
const THEMEALDB_API = {
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  endpoints: {
    burgers: '/search.php?s=burger'
  }
};

// Main API functions
export const burgerKingAPI = {
  // Get full menu with real-time data
  async getFullMenu() {
    try {
      // Try TheMealDB API first for real burger data
      const realBurgerMenu = await this.getRealBurgerMenu();
      if (realBurgerMenu) return realBurgerMenu;

      // Fallback to enhanced mock data
      return this.getEnhancedMockMenu();
    } catch (error) {
      console.error('Error fetching Burger King menu:', error);
      return this.getEnhancedMockMenu();
    }
  },

  // Try direct Burger King API
  async getDirectMenu() {
    try {
      const response = await fetch(`${BURGER_KING_DIRECT_API.baseURL}${BURGER_KING_DIRECT_API.endpoints.menu}`);
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
      // Search for Burger King on Jumia Food
      const searchResponse = await fetch(`${JUMIA_FOOD_API.baseURL}${JUMIA_FOOD_API.endpoints.search}?q=burger king`, {
        headers: JUMIA_FOOD_API.headers
      });
      
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        const burgerKingId = this.findBurgerKingId(searchData);
        
        if (burgerKingId) {
          const menuResponse = await fetch(`${JUMIA_FOOD_API.baseURL}${JUMIA_FOOD_API.endpoints.menu.replace('{id}', burgerKingId)}`, {
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
      // Search for Burger King on Glovo
      const searchResponse = await fetch(`${GLOVO_API.baseURL}${GLOVO_API.endpoints.restaurants}?search=burger king`, {
        headers: GLOVO_API.headers
      });
      
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        const burgerKingId = this.findBurgerKingId(searchData);
        
        if (burgerKingId) {
          const menuResponse = await fetch(`${GLOVO_API.baseURL}${GLOVO_API.endpoints.menu.replace('{id}', burgerKingId)}`, {
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

  // Get real burger data from TheMealDB API
  async getRealBurgerMenu() {
    try {
      console.log('🍔 Fetching real burger data from TheMealDB API...');
      
      const response = await fetch(`${THEMEALDB_API.baseURL}${THEMEALDB_API.endpoints.burgers}`);
      
      if (!response.ok) {
        throw new Error(`TheMealDB API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ TheMealDB API response:', data);
      
      if (data.meals && data.meals.length > 0) {
        const burgers = data.meals.map((meal, index) => ({
          id: meal.idMeal || `burger-${index}`,
          name: meal.strMeal || 'Burger',
          description: this.generateDescription(meal.strMeal, meal.strCategory, meal.strArea),
          price: this.generatePrice(600, 1200),
          image: meal.strMealThumb || '/images/food/placeholder-food.jpg',
          category: 'Burgers',
          calories: this.generateCalories(300, 800),
          serves: '1 person',
          preparationTime: '20-35 min',
          isPromo: Math.random() > 0.7,
          promoText: 'Flame-Grilled Deal!',
          signature: Math.random() > 0.8,
          vegetarian: this.isVegetarian(meal.strMeal, meal.strCategory),
          allergens: ['Gluten', 'Dairy', 'Eggs', 'Soy'],
          tags: this.generateTags(meal.strMeal, meal.strCategory, meal.strArea),
          size: this.generateSize(),
          crust: null,
          spiceLevel: this.generateSpiceLevel(meal.strMeal),
          originalPrice: null,
          ingredients: this.extractIngredients(meal),
          instructions: meal.strInstructions,
          youtube: meal.strYoutube,
          source: meal.strSource
        }));
        
        console.log('🍔 Transformed burgers:', burgers);
        
        return {
          restaurant: BURGER_KING_CONFIG,
          menu: burgers,
          categories: {
            'Burgers': burgers
          },
          customization: {
            available: true,
            options: {
              patty: ['Beef', 'Chicken', 'Lamb', 'Veggie', 'Fish'],
              cheese: ['American', 'Swiss', 'Cheddar', 'Pepper Jack', 'Blue Cheese'],
              toppings: ['Lettuce', 'Tomato', 'Onion', 'Pickles', 'Bacon', 'Mushrooms'],
              sauces: ['Ketchup', 'Mustard', 'Mayo', 'BBQ', 'Ranch', 'Hot Sauce'],
              sides: ['French Fries', 'Onion Rings', 'Chicken Nuggets', 'Salad']
            }
          },
          deals: [
            '2 for 1 Whopper on Wednesdays',
            'Student Discount 20% off',
            'Family Pack: 4 burgers + 4 fries + 4 drinks for KES 2,800'
          ],
          rewards: {
            available: true,
            program: 'BK Rewards',
            benefits: [
              'Earn points on every purchase',
              'Free burger after 6 visits',
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
            'Yaya Centre',
            'Nakumatt Mega'
          ]
        };
      }
      
      console.log('❌ No valid burger data found in TheMealDB response');
      return null;
      
    } catch (error) {
      console.error('❌ Error fetching real burger data:', error);
      return null;
    }
  },

  // Generate description based on meal data
  generateDescription(mealName, category, area) {
    if (category === 'Lamb') {
      return `Delicious ${mealName} - a premium lamb burger with authentic ${area} flavors`;
    } else if (category === 'Chicken') {
      return `Tasty ${mealName} - a juicy chicken burger with fresh ingredients`;
    } else {
      return `Amazing ${mealName} - a classic burger with premium quality ingredients`;
    }
  },

  // Generate random price between min and max
  generatePrice(min, max) {
    const price = Math.floor(Math.random() * (max - min + 1)) + min;
    return `KES ${price.toLocaleString()}`;
  },

  // Generate random calories between min and max
  generateCalories(min, max) {
    return Math.floor(Math.random() * (min - max + 1)) + min;
  },

  // Check if burger is vegetarian based on name and category
  isVegetarian(mealName, category) {
    const vegetarianKeywords = ['veggie', 'vegetarian', 'vegan', 'bean', 'lentil', 'mushroom'];
    return vegetarianKeywords.some(keyword => 
      mealName.toLowerCase().includes(keyword) || category.toLowerCase().includes(keyword)
    );
  },

  // Generate tags based on burger data
  generateTags(mealName, category, area) {
    const tags = ['Flame-Grilled', 'Premium', 'Fresh'];
    
    if (category === 'Lamb') tags.push('Lamb', 'Gourmet');
    if (category === 'Chicken') tags.push('Chicken', 'Healthy');
    if (area === 'Greek') tags.push('Greek', 'Mediterranean');
    if (area === 'American') tags.push('American', 'Classic');
    if (mealName.toLowerCase().includes('halloumi')) tags.push('Halloumi', 'Cheese');
    
    return tags.slice(0, 6); // Return max 6 tags
  },

  // Generate random size
  generateSize() {
    const sizes = ['Regular', 'Large', 'King Size'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  },

  // Generate spice level based on meal name
  generateSpiceLevel(mealName) {
    const spicyKeywords = ['hot', 'spicy', 'chilli', 'pepper', 'jalapeno'];
    if (spicyKeywords.some(keyword => mealName.toLowerCase().includes(keyword))) {
      return 'Medium';
    }
    return 'None';
  },

  // Extract ingredients from meal data
  extractIngredients(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({
          name: ingredient.trim(),
          measure: measure ? measure.trim() : ''
        });
      }
    }
    return ingredients;
  },

  // Enhanced mock menu with realistic Burger King data
  getEnhancedMockMenu() {
    return {
      restaurant: BURGER_KING_CONFIG,
      categories: {
        'Signature Burgers': [
          {
            id: 'sb-001',
            name: 'Whopper',
            price: 'KES 650',
            description: 'Flame-grilled beef patty with fresh lettuce, tomatoes, mayo, pickles, and onions on a sesame seed bun',
            category: 'Signature Burgers',
            image: '/images/food/burger-king-whopper.jpg',
            isPromo: true,
            promoText: 'Iconic',
            calories: '660',
            serves: '1 person',
            allergens: ['Gluten', 'Dairy', 'Beef', 'Sesame'],
            preparationTime: '8-12 min',
            spiceLevel: 'Mild',
            tags: ['Signature', 'Flame-Grilled', 'Iconic'],
            vegetarian: false,
            signature: true,
            size: 'Regular',
            patty: 'Flame-Grilled Beef'
          },
          {
            id: 'sb-002',
            name: 'Double Whopper',
            price: 'KES 850',
            description: 'Two flame-grilled beef patties with fresh lettuce, tomatoes, mayo, pickles, and onions',
            category: 'Signature Burgers',
            image: '/images/food/burger-king-double-whopper.jpg',
            isPromo: false,
            calories: '980',
            serves: '1 person',
            allergens: ['Gluten', 'Dairy', 'Beef', 'Sesame'],
            preparationTime: '10-15 min',
            spiceLevel: 'Mild',
            tags: ['Signature', 'Double Patty', 'Flame-Grilled'],
            vegetarian: false,
            signature: true,
            size: 'Regular',
            patty: 'Flame-Grilled Beef'
          },
          {
            id: 'sb-003',
            name: 'Bacon King',
            price: 'KES 750',
            description: 'Flame-grilled beef patty with crispy bacon, cheese, lettuce, tomatoes, and special sauce',
            category: 'Signature Burgers',
            image: '/images/food/burger-king-bacon-king.jpg',
            isPromo: false,
            calories: '720',
            serves: '1 person',
            allergens: ['Gluten', 'Dairy', 'Beef', 'Pork', 'Sesame'],
            preparationTime: '8-12 min',
            spiceLevel: 'Mild',
            tags: ['Signature', 'Bacon', 'Cheese'],
            vegetarian: false,
            signature: false,
            size: 'Regular',
            patty: 'Flame-Grilled Beef'
          }
        ],
        'Chicken Sandwiches': [
          {
            id: 'cs-001',
            name: 'Crispy Chicken Sandwich',
            price: 'KES 550',
            description: 'Crispy breaded chicken fillet with lettuce, tomatoes, and mayo on a toasted bun',
            category: 'Chicken Sandwiches',
            image: '/images/food/burger-king-crispy-chicken.jpg',
            isPromo: false,
            calories: '580',
            serves: '1 person',
            allergens: ['Gluten', 'Dairy', 'Chicken', 'Eggs'],
            preparationTime: '6-10 min',
            spiceLevel: 'Mild',
            tags: ['Chicken', 'Crispy', 'Breaded'],
            vegetarian: false,
            signature: false,
            size: 'Regular',
            patty: 'Crispy Chicken'
          },
          {
            id: 'cs-002',
            name: 'Spicy Crispy Chicken',
            price: 'KES 580',
            description: 'Spicy breaded chicken fillet with lettuce, tomatoes, and spicy mayo',
            category: 'Chicken Sandwiches',
            image: '/images/food/burger-king-spicy-chicken.jpg',
            isPromo: false,
            calories: '600',
            serves: '1 person',
            allergens: ['Gluten', 'Dairy', 'Chicken', 'Eggs'],
            preparationTime: '6-10 min',
            spiceLevel: 'Medium',
            tags: ['Chicken', 'Spicy', 'Crispy'],
            vegetarian: false,
            signature: false,
            size: 'Regular',
            patty: 'Spicy Chicken'
          }
        ],
        'Value Menu': [
          {
            id: 'vm-001',
            name: 'Cheeseburger',
            price: 'KES 350',
            description: 'Flame-grilled beef patty with cheese, pickles, ketchup, and mustard',
            category: 'Value Menu',
            image: '/images/food/burger-king-cheeseburger.jpg',
            isPromo: false,
            calories: '310',
            serves: '1 person',
            allergens: ['Gluten', 'Dairy', 'Beef', 'Sesame'],
            preparationTime: '5-8 min',
            spiceLevel: 'Mild',
            tags: ['Value', 'Classic', 'Cheese'],
            vegetarian: false,
            signature: false,
            size: 'Regular',
            patty: 'Flame-Grilled Beef'
          },
          {
            id: 'vm-002',
            name: 'Hamburger',
            price: 'KES 280',
            description: 'Flame-grilled beef patty with pickles, ketchup, and mustard',
            category: 'Value Menu',
            image: '/images/food/burger-king-hamburger.jpg',
            isPromo: false,
            calories: '250',
            serves: '1 person',
            allergens: ['Gluten', 'Beef', 'Sesame'],
            preparationTime: '5-8 min',
            spiceLevel: 'Mild',
            tags: ['Value', 'Classic', 'Simple'],
            vegetarian: false,
            signature: false,
            size: 'Regular',
            patty: 'Flame-Grilled Beef'
          }
        ],
        'Sides & Snacks': [
          {
            id: 'ss-001',
            name: 'French Fries (Medium)',
            price: 'KES 180',
            description: 'Crispy golden fries seasoned with salt',
            category: 'Sides & Snacks',
            image: '/images/food/burger-king-fries.jpg',
            isPromo: false,
            calories: '380',
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
            name: 'Onion Rings (6 Pcs)',
            price: 'KES 220',
            description: 'Crispy breaded onion rings served with dipping sauce',
            category: 'Sides & Snacks',
            image: '/images/food/burger-king-onion-rings.jpg',
            isPromo: false,
            calories: '320',
            serves: '1 person',
            allergens: ['Gluten', 'Onions'],
            preparationTime: '4-6 min',
            spiceLevel: 'None',
            tags: ['Onion Rings', 'Crispy', 'Breaded'],
            vegetarian: true,
            signature: false
          },
          {
            id: 'ss-003',
            name: 'Chicken Nuggets (8 Pcs)',
            price: 'KES 280',
            description: 'Breaded chicken nuggets served with your choice of dipping sauce',
            category: 'Sides & Snacks',
            image: '/images/food/burger-king-chicken-nuggets.jpg',
            isPromo: false,
            calories: '360',
            serves: '1 person',
            allergens: ['Gluten', 'Chicken', 'Eggs'],
            preparationTime: '4-6 min',
            spiceLevel: 'None',
            tags: ['Chicken', 'Nuggets', 'Breaded'],
            vegetarian: false,
            signature: false
          }
        ],
        'Breakfast': [
          {
            id: 'bf-001',
            name: 'Croissan\'wich',
            price: 'KES 420',
            description: 'Fluffy croissant with egg, cheese, and your choice of bacon, ham, or sausage',
            category: 'Breakfast',
            image: '/images/food/burger-king-croissanwich.jpg',
            isPromo: false,
            calories: '320',
            serves: '1 person',
            allergens: ['Gluten', 'Dairy', 'Eggs', 'Pork'],
            preparationTime: '5-8 min',
            spiceLevel: 'None',
            tags: ['Breakfast', 'Croissant', 'Egg & Cheese'],
            vegetarian: false,
            signature: false
          },
          {
            id: 'bf-002',
            name: 'Breakfast Burrito',
            price: 'KES 380',
            description: 'Flour tortilla filled with scrambled eggs, cheese, and your choice of meat',
            category: 'Breakfast',
            image: '/images/food/burger-king-breakfast-burrito.jpg',
            isPromo: false,
            calories: '280',
            serves: '1 person',
            allergens: ['Gluten', 'Dairy', 'Eggs'],
            preparationTime: '5-8 min',
            spiceLevel: 'None',
            tags: ['Breakfast', 'Burrito', 'Egg & Cheese'],
            vegetarian: false,
            signature: false
          }
        ],
        'Desserts': [
          {
            id: 'ds-001',
            name: 'Oreo Shake',
            price: 'KES 320',
            description: 'Creamy vanilla shake blended with Oreo cookie pieces',
            category: 'Desserts',
            image: '/images/food/burger-king-oreo-shake.jpg',
            isPromo: false,
            calories: '580',
            serves: '1 person',
            allergens: ['Dairy', 'Oreo Cookies'],
            preparationTime: '3-5 min',
            spiceLevel: 'None',
            tags: ['Shake', 'Oreo', 'Creamy'],
            vegetarian: true,
            signature: false
          },
          {
            id: 'ds-002',
            name: 'Chocolate Sundae',
            price: 'KES 180',
            description: 'Vanilla soft serve topped with rich chocolate sauce',
            category: 'Desserts',
            image: '/images/food/burger-king-chocolate-sundae.jpg',
            isPromo: false,
            calories: '280',
            serves: '1 person',
            allergens: ['Dairy', 'Chocolate'],
            preparationTime: '2-3 min',
            spiceLevel: 'None',
            tags: ['Sundae', 'Chocolate', 'Soft Serve'],
            vegetarian: true,
            signature: false
          }
        ],
        'Beverages': [
          {
            id: 'bv-001',
            name: 'Coca Cola (Medium)',
            price: 'KES 120',
            description: 'Refreshing Coca Cola soft drink',
            category: 'Beverages',
            image: '/images/food/burger-king-coca-cola.jpg',
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
            price: 'KES 120',
            description: 'Clear lemon-lime soft drink',
            category: 'Beverages',
            image: '/images/food/burger-king-sprite.jpg',
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
            name: 'Fanta Orange (Medium)',
            price: 'KES 120',
            description: 'Refreshing orange-flavored soft drink',
            category: 'Beverages',
            image: '/images/food/burger-king-fanta.jpg',
            isPromo: false,
            calories: '220',
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
          title: '2 for KES 1,000',
          description: 'Get any 2 Whoppers for only KES 1,000 (Save up to KES 300)',
          discount: 'Save up to KES 300',
          validUntil: '2024-12-31',
          code: '2FOR1000',
          timing: 'Available Daily'
        },
        {
          id: 'promo-002',
          title: 'Value Menu Deal',
          description: 'Cheeseburger + Fries + Drink for only KES 500',
          discount: 'Save KES 150',
          validUntil: '2024-12-31',
          code: 'VALUEDEAL',
          timing: 'Available Daily'
        },
        {
          id: 'promo-003',
          title: 'Breakfast Special',
          description: 'Croissan\'wich + Hash Browns + Coffee for only KES 600 (6 AM - 10 AM)',
          discount: 'Save KES 200',
          validUntil: '2024-12-31',
          code: 'BREAKFASTSPECIAL',
          timing: '6 AM - 10 AM Daily'
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
        '2 for KES 1,000',
        'Value Menu Deal',
        'Breakfast Special',
        'Student Discount',
        'Happy Hour'
      ],
      rewards: {
        available: true,
        program: 'Burger King Rewards',
        benefits: ['Points on every order', 'Free Whopper on birthday', 'Exclusive member deals', 'Early access to promotions']
      },
      customization: {
        available: true,
        options: {
          patties: ['Single', 'Double', 'Triple'],
          cheeses: ['American', 'Cheddar', 'Swiss', 'Pepper Jack'],
          toppings: ['Lettuce', 'Tomatoes', 'Onions', 'Pickles', 'Bacon', 'Mushrooms', 'Jalapeños'],
          sauces: ['Mayo', 'Ketchup', 'Mustard', 'BBQ', 'Ranch', 'Spicy Mayo', 'Honey Mustard']
        }
      }
    };
  },

  // Helper functions
  findBurgerKingId(searchData) {
    // Logic to find Burger King's ID in search results
    const burgerKing = searchData.restaurants?.find(r => 
      r.name.toLowerCase().includes('burger king') || r.name.toLowerCase().includes('bk')
    );
    return burgerKing?.id;
  },

  transformDirectMenuData(data) {
    // Transform direct API data to our format
    return {
      restaurant: BURGER_KING_CONFIG,
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
      restaurant: BURGER_KING_CONFIG,
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
      rewards: data.rewards || {},
      customization: data.customization || {}
    };
  },

  transformGlovoMenuData(data) {
    // Transform Glovo data to our format
    return {
      restaurant: BURGER_KING_CONFIG,
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
    return BURGER_KING_CONFIG;
  },

  // Get current promotions
  async getPromotions() {
    try {
      const response = await fetch(`${BURGER_KING_DIRECT_API.baseURL}${BURGER_KING_DIRECT_API.endpoints.promotions}`);
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
      const response = await fetch(`${BURGER_KING_DIRECT_API.baseURL}${BURGER_KING_DIRECT_API.endpoints.delivery}`);
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
      const response = await fetch(`${BURGER_KING_DIRECT_API.baseURL}${BURGER_KING_DIRECT_API.endpoints.deals}`);
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
      const response = await fetch(`${BURGER_KING_DIRECT_API.baseURL}${BURGER_KING_DIRECT_API.endpoints.rewards}`);
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
      const response = await fetch(`${BURGER_KING_DIRECT_API.baseURL}${BURGER_KING_DIRECT_API.endpoints.customization}`);
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
      const response = await fetch(`${BURGER_KING_DIRECT_API.baseURL}${BURGER_KING_DIRECT_API.endpoints.locations}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Using mock locations');
    }
    
    return this.getEnhancedMockMenu().locations;
  }
};

export default burgerKingAPI;
