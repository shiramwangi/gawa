// Carnivore Restaurant API Integration Service
// Using TheMealDB API for real beef dishes

// Base configuration
const CARNIVORE_CONFIG = {
  name: 'Carnivore Restaurant',
  location: 'Langata Road, Nairobi',
  phone: '+254 20 600 5923',
  website: 'https://www.tamarind.co.ke/carnivore',
  coordinates: { lat: -1.3182, lng: 36.8172 },
  description: 'The ultimate meat lover\'s paradise serving exotic meats from around the world',
  founded: '1980',
  branches: '1',
  specialties: ['Exotic Meats', 'BBQ', 'Grilled Meats', 'African Cuisine'],
  rating: 4.6,
  deliveryTime: '30-45 min'
};

// TheMealDB API for real beef dishes
const THEMEALDB_API = {
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  endpoints: {
    beef: '/filter.php?c=Beef'
  }
};

// Main API functions
export const carnivoreAPI = {
  // Get full menu with real-time data
  async getFullMenu() {
    try {
      // Try TheMealDB API first for real beef data
      const realBeefMenu = await this.getRealBeefMenu();
      if (realBeefMenu) return realBeefMenu;

      // Fallback to enhanced mock data
      console.log('⚠️ Using enhanced mock data as fallback');
      return this.getEnhancedMockMenu();
    } catch (error) {
      console.error('Error fetching Carnivore menu:', error);
      return this.getEnhancedMockMenu();
    }
  },

  // Get real beef data from TheMealDB API
  async getRealBeefMenu() {
    try {
      console.log('🥩 Fetching real beef data from TheMealDB API...');
      
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
          price: this.generatePrice(1200, 2500),
          image: meal.strMealThumb || '/images/food/placeholder-food.jpg',
          category: 'Beef',
          calories: this.generateCalories(400, 900),
          serves: '2-4 people',
          preparationTime: '45-90 min',
          isPromo: Math.random() > 0.7,
          promoText: 'Chef\'s Special!',
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
          origin: this.detectOrigin(meal.strMeal)
        }));
        
        console.log('🥩 Transformed beef dishes:', beefDishes);
        
        return {
          restaurant: CARNIVORE_CONFIG,
          menu: beefDishes,
          categories: {
            'Beef': beefDishes
          },
          customization: {
            available: true,
            options: {
              doneness: ['Rare', 'Medium Rare', 'Medium', 'Medium Well', 'Well Done'],
              cuts: ['Tenderloin', 'Ribeye', 'Sirloin', 'T-Bone', 'Porterhouse', 'Flank'],
              sauces: ['Peppercorn', 'Mushroom', 'Red Wine', 'Béarnaise', 'Blue Cheese', 'Garlic Butter'],
              sides: ['Roasted Potatoes', 'Grilled Vegetables', 'Mashed Potatoes', 'Rice', 'Salad'],
              spices: ['Black Pepper', 'Garlic', 'Rosemary', 'Thyme', 'Oregano', 'Paprika']
            }
          },
          deals: [
            'All-You-Can-Eat Beef Night on Fridays',
            'Wine Pairing Special: 20% off selected wines',
            'Group Dining: 4+ people get 15% off total bill'
          ],
          rewards: {
            available: true,
            program: 'Carnivore Club',
            benefits: [
              'Earn points on every meat purchase',
              'Free appetizer after 5 visits',
              'Birthday month: Complimentary dessert',
              'Exclusive access to rare meat cuts'
            ]
          },
          locations: [
            'Langata Road, Nairobi',
            'Carnivore Gardens',
            'Private Dining Rooms Available'
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

  // Generate description based on meal name
  generateDescription(mealName) {
    const descriptions = [
      `Premium ${mealName} - expertly prepared with the finest beef cuts`,
      `Gourmet ${mealName} - a carnivore's delight with rich flavors`,
      `Chef's special ${mealName} - slow-cooked to perfection`,
      `Traditional ${mealName} - authentic recipe with premium ingredients`,
      `Signature ${mealName} - our most popular beef dish`
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

  // Generate tags based on beef dish name
  generateTags(mealName) {
    const tags = ['Premium Beef', 'Chef Special', 'Gourmet'];
    
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

  // Enhanced mock menu with realistic data
  getEnhancedMockMenu() {
    return {
      restaurant: CARNIVORE_CONFIG,
      categories: {
        'Beast of a Feast': [
          {
            id: 'bf-001',
            name: 'Nyama Choma Platter',
            price: 'KES 3,500',
            originalPrice: 'KES 4,200',
            description: 'Mixed grilled meats: beef, lamb, chicken, pork with unlimited sides',
            category: 'Beast of a Feast',
            image: '/images/food/nyama-choma.jpg',
            isPromo: true,
            promoText: 'Most Popular! -20% OFF',
            calories: '1200-1500',
            serves: '2-3 people',
            allergens: ['None'],
            preparationTime: '15-20 min',
            spiceLevel: 'Medium',
            tags: ['Popular', 'Best Seller', 'Shareable']
          },
          {
            id: 'bf-002',
            name: 'Carnivore Special',
            price: 'KES 4,200',
            description: 'Premium selection: ostrich, crocodile, beef, lamb with unlimited sides',
            category: 'Beast of a Feast',
            image: '/images/food/carnivore-special.jpg',
            isPromo: true,
            promoText: 'Chef\'s Choice',
            calories: '1500-2000',
            serves: '3-4 people',
            allergens: ['None'],
            preparationTime: '20-25 min',
            spiceLevel: 'Medium',
            tags: ['Premium', 'Exotic', 'Chef Special']
          }
        ],
        'Grilled Meats': [
          {
            id: 'gm-001',
            name: 'Beef Ribs',
            price: 'KES 2,800',
            description: 'Slow-cooked beef ribs with BBQ sauce',
            category: 'Grilled Meats',
            image: '/images/food/beef-ribs.jpg',
            calories: '800',
            serves: '1 person',
            allergens: ['None'],
            preparationTime: '10-15 min',
            spiceLevel: 'Mild',
            tags: ['BBQ', 'Slow Cooked', 'Tender']
          },
          {
            id: 'gm-002',
            name: 'Lamb Chops',
            price: 'KES 2,500',
            description: 'Grilled lamb chops with rosemary',
            category: 'Grilled Meats',
            image: '/images/food/lamb-chops.jpg',
            calories: '650',
            serves: '1 person',
            allergens: ['None'],
            preparationTime: '12-18 min',
            spiceLevel: 'Mild',
            tags: ['Herb Crusted', 'Premium', 'Tender']
          }
        ],
        'Game Meats': [
          {
            id: 'gm-003',
            name: 'Ostrich Fillet',
            price: 'KES 3,200',
            description: 'Lean ostrich meat grilled to perfection',
            category: 'Game Meats',
            image: '/images/food/ostrich-fillet.jpg',
            calories: '400',
            serves: '1 person',
            allergens: ['None'],
            preparationTime: '8-12 min',
            spiceLevel: 'Mild',
            tags: ['Exotic', 'Lean', 'Healthy']
          }
        ]
      },
      promotions: [
        {
          id: 'promo-001',
          title: 'Beast of a Feast Special',
          description: 'Get 20% off on all Beast of a Feast platters',
          discount: '20%',
          validUntil: '2024-12-31',
          code: 'BEAST20'
        },
        {
          id: 'promo-002',
          title: 'Weekday Lunch Special',
          description: '50% off on selected grilled meats (Mon-Fri, 12-3 PM)',
          discount: '50%',
          validUntil: '2024-12-31',
          code: 'LUNCH50'
        }
      ],
      deliveryInfo: {
        available: true,
        services: ['Jumia Food', 'Glovo', 'Uber Eats'],
        deliveryTime: '30-45 minutes',
        deliveryFee: 'KES 200',
        minimumOrder: 'KES 1,500'
      }
    };
  },

  // Helper functions
  findCarnivoreId(searchData) {
    // Logic to find Carnivore's ID in search results
    const carnivore = searchData.restaurants?.find(r => 
      r.name.toLowerCase().includes('carnivore')
    );
    return carnivore?.id;
  },

  // Get restaurant information
  getRestaurantInfo() {
    return CARNIVORE_CONFIG;
  },

  // Get current promotions
  async getPromotions() {
    // Return mock promotions directly since we're using Spoonacular for main menu
    return [
      'All-you-can-eat meat buffet every Friday',
      'Student discount: 20% off with valid ID',
      'Happy Hour: 2-for-1 on drinks (5-7 PM)',
      'Family package: 4 people for the price of 3'
    ];
  },

  // Check delivery availability
  async checkDeliveryAvailability() {
    // Return mock delivery info directly
    return {
      available: true,
      deliveryTime: '30-45 min',
      minimumOrder: 'KES 500',
      deliveryFee: 'KES 100',
      freeDeliveryThreshold: 'KES 2000'
    };
  },

  // Mock functions for new features (if not implemented in Spoonacular)
  getDeals() {
    return [
      { id: 'deal-001', title: 'Daily Special', description: 'Get a free side with any main dish', validUntil: '2024-12-31' },
      { id: 'deal-002', title: 'Lunch Combo', description: 'Half price on all lunch specials', validUntil: '2024-12-31' }
    ];
  },

  getRewards() {
    return [
      { id: 'reward-001', title: 'Loyalty Card', description: 'Earn points for every meal', validUntil: '2024-12-31' },
      { id: 'reward-002', title: 'Free Dessert', description: 'Get a free dessert with your 10th meal', validUntil: '2024-12-31' }
    ];
  },

  getCustomization() {
    return {
      meatTypes: ['Beef'],
      spiceLevels: ['Mild', 'Medium', 'Hot', 'Extra Hot'],
      cookingStyles: ['Grilled', 'BBQ', 'Roasted', 'Smoked', 'Braised', 'Slow Cooked'],
      sizes: ['Small', 'Medium', 'Large', 'Family Size']
    };
  },

  getLocations() {
    return [
      { id: 'loc-001', name: 'Main Branch', address: 'Langata Road, Nairobi', phone: '+254 20 600 5923' },
      { id: 'loc-002', name: 'Westlands Branch', address: 'Westlands, Nairobi', phone: '+254 20 600 5924' }
    ];
  },

  getMockSidesAndBeverages() {
    const mockSides = [
      {
        id: 'side-001',
        name: 'Ugali',
        price: 'KES 200',
        description: 'Traditional Kenyan maize meal',
        category: 'Sides',
        image: '/images/food/ugali.jpg',
        isPromo: false,
        calories: '150',
        serves: '1 person',
        allergens: ['Gluten'],
        preparationTime: '5 min',
        spiceLevel: 'None',
        tags: ['Traditional', 'Local'],
        vegetarian: true,
        signature: false
      },
      {
        id: 'side-002',
        name: 'Sukuma Wiki',
        price: 'KES 150',
        description: 'Collard greens with tomatoes and onions',
        category: 'Sides',
        image: '/images/food/sukuma-wiki.jpg',
        isPromo: false,
        calories: '80',
        serves: '1 person',
        allergens: ['None'],
        preparationTime: '8 min',
        spiceLevel: 'Mild',
        tags: ['Vegetables', 'Healthy'],
        vegetarian: true,
        signature: false
      }
    ];

    const mockBeverages = [
      {
        id: 'bev-001',
        name: 'Tusker Beer',
        price: 'KES 300',
        description: 'Local Kenyan beer',
        category: 'Beverages',
        image: '/images/food/tusker-beer.jpg',
        isPromo: false,
        calories: '150',
        serves: '1 person',
        allergens: ['Gluten'],
        preparationTime: '2 min',
        spiceLevel: 'None',
        tags: ['Local', 'Beer'],
        vegetarian: true,
        signature: false
      },
      {
        id: 'bev-002',
        name: 'Fresh Fruit Juice',
        price: 'KES 250',
        description: 'Seasonal fruit juice',
        category: 'Beverages',
        image: '/images/food/fruit-juice.jpg',
        isPromo: false,
        calories: '120',
        serves: '1 person',
        allergens: ['None'],
        preparationTime: '3 min',
        spiceLevel: 'None',
        tags: ['Fresh', 'Healthy'],
        vegetarian: true,
        signature: false
      }
    ];

    return [...mockSides, ...mockBeverages];
  }
};

export default carnivoreAPI;
