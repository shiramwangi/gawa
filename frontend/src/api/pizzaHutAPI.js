// Pizza Hut API Service
// Using TheMealDB (completely free, no CORS issues, working API)

const PIZZA_HUT_CONFIG = {
  restaurant: {
    name: "Pizza Hut",
    description: "World's largest pizza chain with delicious pizzas, wings, and sides",
    location: "Nairobi, Kenya",
    phone: "+254 700 000 000",
    website: "https://www.pizzahut.co.ke",
    founded: "1958",
    branches: "18,000+",
    specialties: ["Pan Pizza", "Stuffed Crust", "Wings", "Pasta"],
    rating: 4.5,
    deliveryTime: "25-35 min"
  }
};

// TheMealDB API (completely free, no CORS issues, working)
const THEMEALDB_API = {
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  endpoints: {
    search: '/search.php?s=',
    filter: '/filter.php?c=',
    random: '/random.php'
  }
};

export const pizzaHutAPI = {
  async getFullMenu() {
    try {
      console.log('🍕 Fetching Pizza Hut menu from TheMealDB...');
      
      // Try to get real pizza data first
      const realMenu = await this.getRealPizzaMenu();
      if (realMenu && realMenu.length > 0) {
        console.log('✅ Real pizza data loaded successfully');
        return {
          restaurant: PIZZA_HUT_CONFIG.restaurant,
          menu: realMenu,
          promotions: this.getPromotions(),
          deals: this.getDeals(),
          rewards: this.getRewards(),
          customization: this.getCustomization(),
          locations: this.getLocations()
        };
      }
      
      console.log('⚠️ Using enhanced mock data as fallback');
      return this.getEnhancedMockMenu();
    } catch (error) {
      console.error('❌ Error fetching Pizza Hut menu:', error);
      return this.getEnhancedMockMenu();
    }
  },

  async getRealPizzaMenu() {
    try {
      console.log('🔍 Fetching from Spoonacular API...');
      
      // Use the working Spoonacular API endpoint
      const pizzaResponse = await fetch('https://api.spoonacular.com/recipes/complexSearch?query=pizza&number=20&apiKey=0264506281e5448c81a956ff1f4f1d82');
      console.log('📡 Pizza API Response status:', pizzaResponse.status);
      
      if (!pizzaResponse.ok) {
        throw new Error(`Pizza API request failed: ${pizzaResponse.status}`);
      }
      
      const pizzaData = await pizzaResponse.json();
      console.log('✅ Successfully fetched pizza data from Spoonacular:', pizzaData);
      
      // Also get drinks
      const drinksResponse = await fetch('https://api.spoonacular.com/recipes/complexSearch?query=drink&number=10&apiKey=0264506281e5448c81a956ff1f4f1d82');
      console.log('📡 Drinks API Response status:', drinksResponse.status);
      
      let drinksData = null;
      if (drinksResponse.ok) {
        drinksData = await drinksResponse.json();
        console.log('✅ Successfully fetched drinks data from Spoonacular:', drinksData);
      }
      
      // Transform real data to our format
      const transformedMenu = [];
      
      // Add real pizzas from Spoonacular
      if (pizzaData.results && pizzaData.results.length > 0) {
        console.log(`🍕 Found ${pizzaData.results.length} pizzas from Spoonacular API`);
        
        // Show ALL pizzas from the API
        for (let i = 0; i < pizzaData.results.length; i++) {
          const pizza = pizzaData.results[i];
          console.log(`🍕 Processing pizza ${i + 1}:`, pizza.title);
          
          transformedMenu.push({
            id: `pizza-${pizza.id}`,
            name: pizza.title,
            description: 'Delicious pizza made with fresh ingredients and premium toppings',
            price: this.generatePizzaPrice(),
            category: 'Pizzas',
            image: pizza.image || '/images/food/placeholder-food.jpg',
            calories: Math.floor(Math.random() * 300) + 200,
            serves: '1 person',
            preparationTime: '20-25 min',
            isPromo: Math.random() > 0.7,
            promoText: 'Hot Deal!',
            signature: Math.random() > 0.8,
            size: ['Small', 'Medium', 'Large'][Math.floor(Math.random() * 3)],
            crust: ['Classic', 'Thin', 'Stuffed', 'Pan'][Math.floor(Math.random() * 4)],
            tags: ['Fresh', 'Cheese', 'Tomato'],
            allergens: ['Gluten', 'Dairy'],
            spiceLevel: 'None'
          });
        }
      } else {
        console.warn('⚠️ No pizza data found from Spoonacular API');
      }
      
      // Add real drinks if we have any
      if (drinksData && drinksData.results && drinksData.results.length > 0) {
        console.log(`🥤 Found ${drinksData.results.length} drinks from Spoonacular API`);
        
        // Show ALL drinks from the API
        for (let i = 0; i < drinksData.results.length; i++) {
          const drink = drinksData.results[i];
          console.log(`🥤 Processing drink ${i + 1}:`, drink.title);
          
          transformedMenu.push({
            id: `drink-${drink.id}`,
            name: drink.title,
            description: 'Refreshing beverage to complement your meal',
            price: this.generateDrinkPrice(),
            category: 'Beverages',
            image: drink.image || '/images/food/placeholder-food.jpg',
            calories: Math.floor(Math.random() * 150) + 50,
            serves: '1 person',
            preparationTime: '5 min',
            isPromo: Math.random() > 0.8,
            promoText: 'Happy Hour!',
            tags: ['Refreshing', 'Cold'],
            allergens: [],
            spiceLevel: 'None'
          });
        }
      } else {
        console.warn('⚠️ No drinks data found from Spoonacular API');
      }
      
      // Add some mock sides and desserts to complete the menu
      transformedMenu.push(...this.getMockSidesAndDesserts());
      
      console.log(`✅ Successfully transformed ${transformedMenu.length} menu items`);
      return transformedMenu;
      
    } catch (error) {
      console.error('❌ Error fetching real pizza data from Spoonacular:', error);
      console.log('🔄 Falling back to mock data...');
      return null;
    }
  },

  generatePizzaPrice() {
    const prices = ['KES 1,200', 'KES 1,500', 'KES 1,800', 'KES 2,200', 'KES 2,500'];
    return prices[Math.floor(Math.random() * prices.length)];
  },

  generateDrinkPrice() {
    const prices = ['KES 250', 'KES 300', 'KES 350', 'KES 400'];
    return prices[Math.floor(Math.random() * prices.length)];
  },

  getMockSidesAndDesserts() {
    return [
      {
        id: 'side-1',
        name: 'Garlic Bread',
        description: 'Fresh baked bread with garlic butter and herbs',
        price: 'KES 350',
        category: 'Sides',
        image: '/images/food/placeholder-food.jpg',
        calories: 180,
        serves: '1 person',
        preparationTime: '8 min',
        tags: ['Bread', 'Garlic', 'Herbs'],
        allergens: ['Gluten', 'Dairy']
      },
      {
        id: 'side-2',
        name: 'Chicken Wings',
        description: 'Crispy wings with your choice of sauce',
        price: 'KES 800',
        category: 'Sides',
        image: '/images/food/placeholder-food.jpg',
        calories: 320,
        serves: '1 person',
        preparationTime: '15 min',
        tags: ['Chicken', 'Crispy', 'Wings'],
        allergens: ['Gluten']
      },
      {
        id: 'dessert-1',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center',
        price: 'KES 450',
        category: 'Desserts',
        image: '/images/food/placeholder-food.jpg',
        calories: 280,
        serves: '1 person',
        preparationTime: '12 min',
        tags: ['Chocolate', 'Warm', 'Molten'],
        allergens: ['Gluten', 'Dairy', 'Eggs']
      }
    ];
  },

  getEnhancedMockMenu() {
    return {
      restaurant: PIZZA_HUT_CONFIG.restaurant,
      menu: [
        {
          id: 'pizza-1',
          name: 'Pepperoni Supreme',
          description: 'Classic pepperoni pizza with melted mozzarella and tomato sauce',
          price: 'KES 1,800',
          category: 'Pizzas',
          image: '/images/food/placeholder-food.jpg',
          calories: 280,
          serves: '1 person',
          preparationTime: '20-25 min',
          isPromo: true,
          promoText: 'Hot Deal!',
          signature: true,
          size: 'Large',
          crust: 'Classic',
          tags: ['Pepperoni', 'Cheese', 'Classic'],
          allergens: ['Gluten', 'Dairy'],
          spiceLevel: 'None'
        },
        {
          id: 'pizza-2',
          name: 'Margherita',
          description: 'Fresh mozzarella, tomato sauce, and basil',
          price: 'KES 1,500',
          category: 'Pizzas',
          image: '/images/food/placeholder-food.jpg',
          calories: 240,
          serves: '1 person',
          preparationTime: '18-22 min',
          signature: true,
          size: 'Medium',
          crust: 'Thin',
          tags: ['Fresh', 'Cheese', 'Basil'],
          allergens: ['Gluten', 'Dairy'],
          spiceLevel: 'None'
        },
        {
          id: 'drink-1',
          name: 'Coca Cola',
          description: 'Refreshing Coca Cola to complement your pizza',
          price: 'KES 250',
          category: 'Beverages',
          image: '/images/food/placeholder-food.jpg',
          calories: 140,
          serves: '1 person',
          preparationTime: '2 min',
          tags: ['Refreshing', 'Cold', 'Classic'],
          allergens: [],
          spiceLevel: 'None'
        }
      ],
      promotions: this.getPromotions(),
      deals: this.getDeals(),
      rewards: this.getRewards(),
      customization: this.getCustomization(),
      locations: this.getLocations()
    };
  },

  getPromotions() {
    return [
      {
        title: "2 for Tuesday",
        description: "Buy any 2 pizzas and get 50% off the second one",
        validUntil: "Every Tuesday",
        code: "2FOR50"
      },
      {
        title: "Family Bundle",
        description: "2 Large Pizzas + 2 Sides + 2 Drinks for KES 4,500",
        validUntil: "All week",
        code: "FAMILY"
      }
    ];
  },

  getDeals() {
    return [
      "Buy 1 Get 1 Free on Mondays",
      "Student Discount: 20% off with valid ID",
      "Lunch Special: Medium Pizza + Drink for KES 1,200"
    ];
  },

  getRewards() {
    return {
      available: true,
      program: "Pizza Hut Rewards",
      benefits: [
        "Earn 1 point per KES 100 spent",
        "Free pizza after 100 points",
        "Birthday month special offers",
        "Exclusive member-only deals"
      ]
    };
  },

  getCustomization() {
    return {
      available: true,
      options: {
        sizes: ["Small", "Medium", "Large", "Extra Large"],
        crusts: ["Classic", "Thin", "Stuffed", "Pan", "Gluten-Free"],
        toppings: ["Pepperoni", "Mushrooms", "Bell Peppers", "Onions", "Olives", "Pineapple", "Ham", "Bacon"],
        sauces: ["Tomato", "BBQ", "Alfredo", "Pesto", "Buffalo"]
      }
    };
  },

  getLocations() {
    return [
      "Westlands, Nairobi",
      "Kilimani, Nairobi", 
      "Lavington, Nairobi",
      "Karen, Nairobi",
      "Mombasa Road, Nairobi"
    ];
  }
};

export default pizzaHutAPI;
