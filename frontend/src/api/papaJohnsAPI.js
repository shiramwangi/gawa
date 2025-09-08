// Papa John's API Service
class PapaJohnsAPI {
  constructor() {
    this.forkifyURL = 'https://forkify-api.herokuapp.com/api/v2';
  }

  // Get real pizza menu from Forkify API
  async getRealPizzaMenu() {
    try {
      console.log('🍕 Fetching real pizza data from Forkify API...');
      const response = await fetch(`${this.forkifyURL}/recipes?search=pizza`);
      
      if (!response.ok) {
        throw new Error(`Forkify API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Forkify API response:', data);
      
      if (!data || !data.data || !data.data.recipes || !Array.isArray(data.data.recipes)) {
        console.warn('⚠️ Forkify API returned invalid data structure');
        return null;
      }

      // Transform pizza data to menu items
      const transformedPizzas = data.data.recipes.map((pizza, index) => ({
        id: pizza.id || `pizza-${index}`,
        name: pizza.title,
        description: `Delicious ${pizza.title} - a premium pizza from ${pizza.publisher}`,
        price: this.generatePizzaPrice(),
        category: 'Pizza',
        image: pizza.image_url,
        publisher: pizza.publisher,
        customization: this.getPizzaCustomization(),
        isAvailable: true,
        preparationTime: '20-30 minutes',
        allergens: ['Gluten', 'Dairy', 'Eggs'],
        nutritionalInfo: {
          calories: Math.floor(Math.random() * 400) + 200,
          protein: Math.floor(Math.random() * 15) + 8,
          carbs: Math.floor(Math.random() * 60) + 25,
          fat: Math.floor(Math.random() * 25) + 12
        }
      }));

      return transformedPizzas;
    } catch (error) {
      console.error('❌ Error fetching real pizza data:', error);
      return null;
    }
  }

  // Get full menu combining real pizza API with mock data for other categories
  async getFullMenu() {
    try {
      console.log('🏪 Fetching Papa John\'s full menu...');
      
      // Fetch real pizza data from Forkify API
      const pizzaData = await this.getRealPizzaMenu();
      console.log('🍕 Pizza data received:', pizzaData);

      // Get mock data for other categories
      const mockSides = this.getMockSides();
      const mockBeverages = this.getMockBeverages();
      const mockDesserts = this.getMockDesserts();

      // Combine all data with validation
      const allMenuItems = [
        ...(pizzaData || []),
        ...mockSides,
        ...mockBeverages,
        ...mockDesserts
      ];

      // Validate each menu item
      const validatedMenuItems = allMenuItems.filter(item => {
        if (!item || !item.name || !item.description) {
          console.warn('⚠️ Invalid menu item found:', item);
          return false;
        }
        return true;
      });

      console.log('✅ Validated menu items:', validatedMenuItems.length);
      console.log('✅ Sample validated item:', validatedMenuItems[0]);

      const menuData = {
        restaurant: {
          name: 'Papa John\'s',
          location: 'Westlands, Nairobi',
          phone: '+254 20 123 4569',
          website: 'https://papajohns.co.ke',
          rating: 4.7,
          priceRange: '$$',
          cuisine: 'Pizza & Italian',
          hours: '11:00 AM - 11:00 PM',
          delivery: true,
          pickup: true,
          dineIn: true
        },
        menu: validatedMenuItems,
        categories: this.getCategories(validatedMenuItems),
        promotions: this.getPromotions(),
        deals: this.getDeals(),
        rewards: this.getRewards(),
        customization: this.getCustomization(),
        locations: this.getLocations()
      };

      console.log('✅ Papa John\'s menu data prepared:', menuData);
      
      // Ensure we have at least some valid data
      if (validatedMenuItems.length === 0) {
        console.warn('⚠️ No valid menu items found, using mock data fallback');
        return this.getMockMenu();
      }
      
      return menuData;
    } catch (error) {
      console.error('❌ Error preparing Papa John\'s menu:', error);
      // Return mock data as fallback
      return this.getMockMenu();
    }
  }

  // Helper methods for pricing
  generatePizzaPrice() {
    const basePrice = 1200;
    const variation = Math.floor(Math.random() * 400) - 200;
    return Math.max(800, basePrice + variation);
  }

  // Helper methods for customization
  getPizzaCustomization() {
    return {
      available: true,
      options: {
        size: ['Small', 'Medium', 'Large', 'Extra Large'],
        crust: ['Thin', 'Thick', 'Stuffed', 'Gluten-Free'],
        toppings: ['Pepperoni', 'Mushrooms', 'Bell Peppers', 'Onions', 'Olives', 'Sausage', 'Ham', 'Pineapple'],
        sauce: ['Tomato', 'BBQ', 'Alfredo', 'Pesto', 'Buffalo'],
        cheese: ['Mozzarella', 'Cheddar', 'Parmesan', 'Feta', 'Vegan Cheese']
      }
    };
  }

  // Mock data for other categories
  getMockSides() {
    return [
      {
        id: 'side-1',
        name: 'Garlic Bread',
        description: 'Fresh baked garlic bread with herbs and butter',
        price: 250,
        category: 'Sides',
        image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400',
        customization: { available: false },
        isAvailable: true,
        preparationTime: '5-8 minutes',
        allergens: ['Gluten', 'Dairy'],
        nutritionalInfo: { calories: 180, protein: 4, carbs: 20, fat: 10 }
      },
      {
        id: 'side-2',
        name: 'Chicken Wings',
        description: 'Crispy chicken wings with your choice of sauce',
        price: 450,
        category: 'Sides',
        image: 'https://images.unsplash.com/photo-1567620832904-9d5c8ca869a8?w=400',
        customization: { available: false },
        isAvailable: true,
        preparationTime: '15-20 minutes',
        allergens: ['Gluten', 'Eggs'],
        nutritionalInfo: { calories: 320, protein: 25, carbs: 8, fat: 22 }
      }
    ];
  }

  getMockBeverages() {
    return [
      {
        id: 'beverage-1',
        name: 'Soft Drinks',
        description: 'Coca-Cola, Sprite, Fanta, or Pepsi',
        price: 150,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400',
        customization: { available: false },
        isAvailable: true,
        preparationTime: '1-2 minutes',
        allergens: [],
        nutritionalInfo: { calories: 140, protein: 0, carbs: 39, fat: 0 }
      },
      {
        id: 'beverage-2',
        name: 'Fresh Juice',
        description: 'Orange, mango, or pineapple juice',
        price: 200,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
        customization: { available: false },
        isAvailable: true,
        preparationTime: '3-5 minutes',
        allergens: [],
        nutritionalInfo: { calories: 110, protein: 2, carbs: 26, fat: 0 }
      }
    ];
  }

  getMockDesserts() {
    return [
      {
        id: 'dessert-1',
        name: 'Chocolate Brownie',
        description: 'Warm chocolate brownie with vanilla ice cream',
        price: 300,
        category: 'Desserts',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
        customization: { available: false },
        isAvailable: true,
        preparationTime: '5-8 minutes',
        allergens: ['Gluten', 'Dairy', 'Eggs'],
        nutritionalInfo: { calories: 280, protein: 4, carbs: 35, fat: 15 }
      }
    ];
  }

  // Helper methods for other data
  getCategories(allMenuItems) {
    const categories = ['all'];
    allMenuItems.forEach(item => {
      if (!categories.includes(item.category)) {
        categories.push(item.category);
      }
    });
    return categories;
  }

  getPromotions() {
    return [
      'Buy 2 pizzas, get 1 free',
      '20% off all orders over KES 2000',
      'Student discount: 15% off with valid ID'
    ];
  }

  getDeals() {
    return [
      'Happy Hour: 2-for-1 on all pizzas (2-5 PM)',
      'Weekend Special: Free garlic bread with any pizza',
      'Family Bundle: 2 large pizzas + sides + drinks for KES 2500'
    ];
  }

  getRewards() {
    return {
      program: 'Papa Rewards',
      available: true,
      benefits: [
        'Earn 1 point per KES 10 spent',
        'Free pizza after 15 points',
        'Birthday month: 50% off any pizza',
        'Exclusive member-only promotions'
      ]
    };
  }

  getCustomization() {
    return {
      available: true,
      options: {
        pizza: ['Size', 'Crust type', 'Toppings', 'Sauce', 'Cheese'],
        sides: ['Sauce options', 'Portion size'],
        dietary: ['Gluten-free', 'Dairy-free', 'Vegan', 'Halal']
      }
    };
  }

  getLocations() {
    return [
      'Westlands, Nairobi',
      'Kilimani, Nairobi',
      'Lavington, Nairobi',
      'Karen, Nairobi',
      'Mombasa Road, Nairobi'
    ];
  }

  // Fallback mock menu
  getMockMenu() {
    return {
      restaurant: {
        name: 'Papa John\'s',
        location: 'Westlands, Nairobi',
        phone: '+254 20 123 4569',
        website: 'https://papajohns.co.ke',
        rating: 4.7,
        priceRange: '$$',
        cuisine: 'Pizza & Italian',
        hours: '11:00 AM - 11:00 PM',
        delivery: true,
        pickup: true,
        dineIn: true
      },
      menu: [
        {
          id: 'mock-1',
          name: 'Pepperoni Pizza',
          description: 'Classic pepperoni pizza with mozzarella cheese',
          price: 1200,
          category: 'Pizza',
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
          customization: { available: true },
          isAvailable: true,
          preparationTime: '20-30 minutes',
          allergens: ['Gluten', 'Dairy'],
          nutritionalInfo: { calories: 280, protein: 12, carbs: 35, fat: 12 }
        }
      ],
      categories: ['all', 'Pizza'],
      promotions: ['Buy 2 pizzas, get 1 free'],
      deals: ['Happy Hour: 2-for-1 on all pizzas (2-5 PM)'],
      rewards: { program: 'Papa Rewards', available: true, benefits: ['Earn points on every purchase'] },
      customization: { available: true, options: { pizza: ['Size', 'Crust type', 'Toppings'] } },
      locations: ['Westlands, Nairobi']
    };
  }
}

const papaJohnsAPI = new PapaJohnsAPI();
export default papaJohnsAPI;
